import { useState, useRef, useCallback } from 'react';
import { usePostOrdersPhotoUpload } from '../../api/orders/orders';

/**
 * Хук для загрузки фотографий
 * 
 * Основные возможности:
 * - Загрузка фото через клик по области
 * - Drag & Drop загрузка
 * - Валидация форматов файлов
 * - Создание превью
 * - Отображение прогресса загрузки
 * - Обработка ошибок
 * 
 * @returns объект с состоянием и функциями для загрузки фото
 */
export const usePhotoUpload = () => {
  // Состояние превью загруженного фото (base64 строка)
  const [photoPreview, setPhotoPreview] = useState<string>('');
  
  // Флаг процесса загрузки
  const [isUploading, setIsUploading] = useState(false);
  
  // ID загруженного фото на сервере
  const [photoId, setPhotoId] = useState<string>('');
  
  // Ссылка на скрытый input для выбора файла
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Валидация формата файла
   * Проверяет, что файл является изображением поддерживаемого формата
   * 
   * @param file - файл для валидации
   * @returns true если файл валиден
   */
  const validateFileFormat = useCallback((file: File): boolean => {
    // Поддерживаемые форматы изображений
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    // Проверяем MIME тип файла
    const isValidType = allowedTypes.includes(file.type);
    
    // Дополнительная проверка по расширению файла
    const fileName = file.name.toLowerCase();
    const hasValidExtension = fileName.endsWith('.jpg') || 
                             fileName.endsWith('.jpeg') || 
                             fileName.endsWith('.png');
    
    return isValidType && hasValidExtension;
  }, []);

  /**
   * Валидация размера файла
   * Проверяет, что файл не превышает максимально допустимый размер
   * 
   * @param file - файл для валидации
   * @param maxSizeMB - максимальный размер в мегабайтах (по умолчанию 5MB)
   * @returns true если размер файла допустим
   */
  const validateFileSize = useCallback((file: File, maxSizeMB: number = 10): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // Конвертируем в байты
    return file.size <= maxSizeBytes;
  }, []);

  /**
   * Создание превью изображения
   * Конвертирует файл в base64 строку для отображения
   * 
   * @param file - файл изображения
   * @returns Promise с base64 строкой
   */
  const createPreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Не удалось создать превью'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Ошибка чтения файла'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const uploadMutation = usePostOrdersPhotoUpload();

  /**
   * Обработка выбранного файла
   * Основная функция для загрузки фото
   * 
   * @param file - выбранный файл
   */
  const handleFileSelect = useCallback(async (file: File) => {
    // Валидируем формат файла
    if (!validateFileFormat(file)) {
      alert('Поддерживаются только файлы формата PNG и JPG');
      return;
    }

    // Валидируем размер файла
    if (!validateFileSize(file, 5)) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    // Устанавливаем флаг загрузки
    setIsUploading(true);

    try {
      // Создаем превью изображения
      const preview = await createPreview(file);
      setPhotoPreview(preview);

      // Загружаем файл на сервер
      const uploadResponse = await uploadMutation.mutateAsync({ 
        data: { photo: file } 
      });

      // Сохраняем ID загруженного фото
      // Примечание: photo_id может быть в заголовках ответа или в message
      // Если API возвращает photo_id в другом формате, нужно будет обновить эту логику
      const uploadedPhotoId = (uploadResponse.data)?.photo_id || '';
      if (uploadedPhotoId) {
        setPhotoId(uploadedPhotoId);
      }
      
      
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
      
      // Сбрасываем превью при ошибке
      setPhotoPreview('');
      
      // Показываем пользователю сообщение об ошибке
      if (error instanceof Error) {
        alert(`Ошибка загрузки фото: ${error.message}`);
      } else {
        alert('Ошибка загрузки фото. Попробуйте еще раз.');
      }
    } finally {
      // Сбрасываем флаг загрузки
      setIsUploading(false);
    }
  }, [validateFileFormat, validateFileSize, createPreview, uploadMutation]);

  /**
   * Обработчик клика по области загрузки
   * Открывает диалог выбора файла
   */
  const handlePhotoAreaClick = useCallback(() => {
    if (!isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [isUploading]);

  /**
   * Обработчик изменения файла через input
   * Вызывается при выборе файла через диалог
   * 
   * @param event - событие изменения input
   */
  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    
    // Сбрасываем значение input для возможности повторного выбора того же файла
    event.target.value = '';
  }, [handleFileSelect]);

  /**
   * Обработчик Drag & Drop событий
   * Обрабатывает перетаскивание файлов на область загрузки
   */

  // Предотвращаем стандартное поведение браузера при перетаскивании
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  /**
   * Обработчик сброса файла (Drop)
   * Обрабатывает сброшенный файл
   * 
   * @param e - событие сброса файла
   */
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Получаем список сброшенных файлов
    const files = Array.from(e.dataTransfer.files);
    
    // Ищем первый файл изображения
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    } else {
      alert('Пожалуйста, перетащите изображение');
    }
  }, [handleFileSelect]);

  /**
   * Сброс состояния фото
   * Очищает превью, ID и сбрасывает флаг загрузки
   */
  const resetPhoto = useCallback(() => {
    setPhotoPreview('');
    setPhotoId('');
    setIsUploading(false);
    
    // Очищаем input файла
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  /**
   * Установка фото из внешнего источника
   * Полезно для редактирования существующих заказов
   * 
   * @param photoId - ID существующего фото
   * @param preview - опциональное превью
   */
  const setExistingPhoto = useCallback((photoId: string, preview?: string) => {
    setPhotoId(photoId);
    if (preview) {
      setPhotoPreview(preview);
    }
  }, []);

  const restorePhotoId = useCallback((photoId: string) => {
    setPhotoId(photoId);
  }, []);

  return {
    // Состояние
    photoPreview,
    isUploading,
    photoId,
    
    // Ссылки
    fileInputRef,
    
    // Функции обработки
    handlePhotoAreaClick,
    handleFileInputChange,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    
    // Утилиты
    resetPhoto,
    setExistingPhoto,
    restorePhotoId,
    validateFileFormat,
    validateFileSize,
  };
};
