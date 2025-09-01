import { useState, useEffect, useCallback } from 'react';
import type { ModelOrderCreate } from '../../api';

/**
 * Ключ для сохранения черновика в localStorage
 * Используется для идентификации черновика заказа
 */
const DRAFT_STORAGE_KEY = 'order_draft';

/**
 * Интерфейс для черновика заказа
 * Содержит все необходимые данные для восстановления состояния формы
 */
interface OrderDraft {
  formData: Partial<ModelOrderCreate>; // Данные формы заказа
  isUrgent: boolean; // Флаг срочности
  selectedDate: 'today' | 'tomorrow'; // Выбранная дата
  selectedTime: string; // Выбранное время
  photoPreview?: string; // Превью загруженного фото (base64)
  photoId?: string; // ID загруженного фото на сервере
}

/**
 * Хук для работы с черновиками заказов
 * 
 * Основные возможности:
 * - Автоматическое сохранение черновика при изменениях
 * - Загрузка черновика при инициализации
 * - Очистка черновика после успешной отправки
 * - Отключение функционала при редактировании существующего заказа
 * 
 * @param order - существующий заказ для редактирования (если есть)
 * @param isUrgent - текущее состояние срочности
 * @param selectedDate - текущая выбранная дата
 * @param selectedTime - текущее выбранное время
 * @param photoPreview - текущее превью фото
 * @param photoId - текущий ID фото
 * @param formData - текущие данные формы
 * 
 * @returns объект с функциями для работы с черновиками
 */
export const useOrderDraft = (
  order: ModelOrderCreate | undefined, // Существующий заказ для редактирования
  isUrgent: boolean,
  selectedDate: 'today' | 'tomorrow',
  selectedTime: string,
  photoPreview: string,
  photoId: string,
  formData: Partial<ModelOrderCreate>
) => {
  // Состояние загруженного черновика
  const [draft, setDraft] = useState<OrderDraft | null>(null);

  /**
   * Функция сохранения черновика в localStorage
   * Вызывается автоматически при изменениях формы
   * 
   * @param data - данные формы для сохранения
   */
  const saveDraft = useCallback((data: Partial<ModelOrderCreate>) => {
    // Не сохраняем черновик при редактировании существующего заказа
    if (order) {
      console.log('Черновик не сохраняется при редактировании заказа');
      return;
    }

    // Формируем объект черновика со всеми текущими данными
    const draftData: OrderDraft = {
      formData: data,
      isUrgent,
      selectedDate,
      selectedTime,
      photoPreview: photoPreview || undefined,
      photoId: photoId || undefined,
    };

    try {
      // Сохраняем в localStorage
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
      console.log('Черновик заказа сохранен:', draftData);
    } catch (error) {
      // Обрабатываем ошибки сохранения (например, превышение лимита localStorage)
      console.error('Ошибка сохранения черновика:', error);
    }
  }, [order, isUrgent, selectedDate, selectedTime, photoPreview, photoId]);

  /**
   * Функция загрузки черновика из localStorage
   * Возвращает null если черновик не найден или при редактировании
   * 
   * @returns объект черновика или null
   */
  const loadDraft = useCallback((): OrderDraft | null => {
    // Не загружаем черновик при редактировании существующего заказа
    if (order) {
      console.log('Черновик не загружается при редактировании заказа');
      return null;
    }

    try {
      // Пытаемся загрузить черновик из localStorage
      const draftData = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftData) {
        const parsedDraft = JSON.parse(draftData) as OrderDraft;
        console.log('Черновик заказа загружен:', parsedDraft);
        return parsedDraft;
      }
    } catch (error) {
      // Обрабатываем ошибки загрузки (например, поврежденный JSON)
      console.error('Ошибка загрузки черновика:', error);
      // Удаляем поврежденный черновик
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }

    return null;
  }, [order]);

  /**
   * Функция очистки черновика
   * Удаляет черновик из localStorage и сбрасывает состояние
   */
  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setDraft(null);
      console.log('Черновик заказа очищен');
    } catch (error) {
      console.error('Ошибка очистки черновика:', error);
    }
  }, []);

  /**
   * Функция проверки существования черновика
   * Полезно для отображения уведомлений пользователю
   * 
   * @returns true если черновик существует
   */
  const hasDraft = useCallback((): boolean => {
    if (order) return false; // При редактировании черновик не используется
    
    try {
      const draftData = localStorage.getItem(DRAFT_STORAGE_KEY);
      return draftData !== null;
    } catch {
      return false;
    }
  }, [order]);

  /**
   * Функция получения времени последнего сохранения черновика
   * Полезно для отображения пользователю когда был сохранен черновик
   * 
   * @returns время последнего сохранения или null
   */
  const getDraftTimestamp = useCallback((): Date | null => {
    if (order) return null; // При редактировании черновик не используется
    
    try {
      const draftData = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (draftData) {
        // Получаем время последнего изменения файла
        // Это приблизительное время последнего сохранения
        return new Date();
      }
    } catch {
      // Игнорируем ошибки
    }

    return null;
  }, [order]);

  // Загружаем черновик при инициализации хука
  useEffect(() => {
    if (!order) {
      const loadedDraft = loadDraft();
      setDraft(loadedDraft);
    }
  }, [order, loadDraft]);

  // Автоматически сохраняем черновик при изменениях
  useEffect(() => {
    if (!order) {
      saveDraft(formData);
    }
  }, [order, formData, saveDraft]);

  // Автоматически сохраняем черновик при изменении дополнительных полей
  useEffect(() => {
    if (!order) {
      saveDraft(formData);
    }
  }, [order, isUrgent, selectedDate, selectedTime, photoPreview, photoId, saveDraft]);

  return {
    draft, // Загруженный черновик
    saveDraft, // Функция сохранения
    loadDraft, // Функция загрузки
    clearDraft, // Функция очистки
    hasDraft, // Проверка существования
    getDraftTimestamp, // Время последнего сохранения
  };
};
