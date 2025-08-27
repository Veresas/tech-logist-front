import { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import { type ModelOrderCreate } from '../../api/api';
import styles from './OrderCreateForm.module.css';
import type { OrderCreateFormProps, TimeSlot, Location, CargoType } from './types';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeList } from '../../context/ThemeContext/types';

// Генерация временных слотов (каждые 15 минут)
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({ time, label: time });
    }
  }
  return slots;
};

// Моковые данные для демонстрации
const mockLocations: Location[] = [
  { id: 1, name: 'Москва, ул. Тверская, 1' },
  { id: 2, name: 'Санкт-Петербург, Невский пр., 1' },
  { id: 3, name: 'Казань, ул. Баумана, 1' },
];

const mockCargoTypes: CargoType[] = [
  { id: 1, name: 'Товары народного потребления' },
  { id: 2, name: 'Строительные материалы' },
  { id: 3, name: 'Продукты питания' },
  { id: 4, name: 'Электроника' },
];

// Преобразование в формат для react-select
const locationOptions = mockLocations.map(location => ({
  value: location.id,
  label: location.name
}));

const cargoTypeOptions = mockCargoTypes.map(type => ({
  value: type.id,
  label: type.name
}));

export const OrderCreateForm = ({ onSubmit, onClose, initialData }: OrderCreateFormProps) => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext?.theme === ThemeList.DARK;
  
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ModelOrderCreate>({
    defaultValues: initialData || {
      cargo_name: 'Название заказа длинное. Возможно, даже настолько',
      cargo_description: 'Описание Описание Описание Описание Описание Описание Описание Описание',
    },
  });

  const [isUrgent, setIsUrgent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today');
  const [selectedTime, setSelectedTime] = useState<string>('00:00');
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [photoId, setPhotoId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit: SubmitHandler<ModelOrderCreate> = (data) => {
    // Проверяем, не идет ли загрузка фото
    if (isUploading) {
      alert('Дождитесь завершения загрузки фото');
      return;
    }

    // Добавляем флаг срочности, время и ID фото к данным
    const orderData = {
      ...data,
      time: `${selectedDate === 'today' ? new Date().toISOString().split('T')[0] : 
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T${selectedTime}:00`,
      photo_id: photoId || undefined,
    };
    onSubmit(orderData);
  };

  const handleToggleUrgent = () => {
    setIsUrgent(!isUrgent);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Валидация формата файла
  const validateFileFormat = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(file.type);
  };

  // Загрузка файла на сервер (заглушка)
  const uploadFileToServer = async (file: File): Promise<string> => {
    console.log(file);
    console.log(photoFile);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `photo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Обработка выбранного файла
  const handleFileSelect = async (file: File) => {
    if (!validateFileFormat(file)) {
      alert('Поддерживаются только файлы формата PNG и JPG');
      return;
    }

    setPhotoFile(file);
    setIsUploading(true);

    try {
      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Загружаем на сервер
      const uploadedPhotoId = await uploadFileToServer(file);
      setPhotoId(uploadedPhotoId);
      console.log('Фото загружено, ID:', uploadedPhotoId);
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
      alert('Ошибка загрузки фото');
    } finally {
      setIsUploading(false);
    }
  };

  // Обработка клика по области загрузки
  const handlePhotoAreaClick = () => {
    fileInputRef.current?.click();
  };

  // Обработка выбора файла через input
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Drag & Drop обработчики
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    } else {
      alert('Пожалуйста, перетащите изображение');
    }
  };

  // Управление фокусом и доступность
  useEffect(() => {
    // Сохраняем текущий фокус
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    // Переводим фокус в модальное окно
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Блокируем скролл на body
    document.body.style.overflow = 'hidden';

    // Обработчик клавиши Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Обработчик Tab для зацикливания фокуса
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    // Возвращаем фокус и разблокируем скролл при закрытии
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        ref={modalRef}
        className={`${styles.modal} ${isDarkTheme ? styles.dark : ''}`} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>Редактировать заказ</h2>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.urgentToggle}>
            <div 
              className={`${styles.toggleSwitch} ${isUrgent ? styles.active : ''}`}
              onClick={handleToggleUrgent}
            >
              <div className={styles.toggleHandle} />
            </div>
            <span className={styles.toggleLabel}>Срочный заказ</span>
          </div>

                      <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Название и описание в отдельных секциях */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Название</label>
                <input
                  {...register("cargo_name", { required: "Название обязательно" })}
                  type="text"
                  className={styles.input}
                />
                {errors.cargo_name && <div className={styles.error}>{errors.cargo_name.message}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Описание</label>
                <textarea
                  {...register("cargo_description")}
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>
              
              <div className={styles.formGrid}>
                {/* Левая колонка - локации */}
                <div className={styles.formSection}>
                  <div className={styles.locsSection}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Точка отправления</label>
                      <Controller
                        name="depart_loc"
                        control={control}
                        rules={{ required: "Точка отправления обязательна" }}
                        render={({ field }) => (
                          <Select
                            value={locationOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            options={locationOptions}
                            placeholder="Выберите точку отправления"
                            isClearable
                            isSearchable
                            className={styles.reactSelect}
                            classNamePrefix="react-select"
                            styles={{ option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                              color: isDarkTheme ? '#f9fafb' : '#374151',
                              '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                              }
                            }),
                          }}
                          />
                        )}
                      />
                      {errors.depart_loc && <div className={styles.error}>{errors.depart_loc.message}</div>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Точка доставки</label>
                      <Controller
                        name="goal_loc"
                        control={control}
                        rules={{ required: "Точка доставки обязательна" }}
                        render={({ field }) => (
                          <Select
                            value={locationOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            options={locationOptions}
                            placeholder="Выберите точку доставки"
                            isClearable
                            isSearchable
                            className={styles.reactSelect}
                            classNamePrefix="react-select"
                            styles={{ option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                              color: isDarkTheme ? '#f9fafb' : '#374151',
                              '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                              }
                            }),
                          }}
                          />
                        )}
                      />
                      {errors.goal_loc && <div className={styles.error}>{errors.goal_loc.message}</div>}
                    </div>
                  </div>
                  
                  {/* Секция времени доставки */}
                  <div className={styles.timeSection}>
                    <label className={styles.label}>Время доставки</label>
                    
                    <div className={styles.timeTabs}>
                      <button
                        type="button"
                        className={`${styles.timeTab} ${selectedDate === 'today' ? styles.active : ''}`}
                        onClick={() => setSelectedDate('today')}
                      >
                        Сегодня
                      </button>
                      <button
                        type="button"
                        className={`${styles.timeTab} ${selectedDate === 'tomorrow' ? styles.active : ''}`}
                        onClick={() => setSelectedDate('tomorrow')}
                      >
                        Завтра
                      </button>
                    </div>

                    <div className={styles.timeGrid}>
                      <div className={styles.timeGridHeader}>
                        <span>00:00</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m18 15-6-6-6 6"/>
                        </svg>
                      </div>
                      <div className={styles.timeGridContent}>
                        {timeSlots.slice(0, 48).map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            className={`${styles.timeSlot} ${selectedTime === slot.time ? styles.selected : ''}`}
                            onClick={() => handleTimeSelect(slot.time)}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              {/* Правая колонка */}
              <div className={styles.formSection}>
                <div className={styles.weightTypeSection}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Вес груза</label>
                    <input
                      {...register("cargo_weight", { 
                        required: "Вес груза обязателен",
                        min: { value: 0.1, message: "Вес должен быть больше 0" }
                      })}
                      type="number"
                      step="0.1"
                      className={styles.input}
                      placeholder="кг"
                    />
                    {errors.cargo_weight && <div className={styles.error}>{errors.cargo_weight.message}</div>}
                  </div>

                                     <div className={styles.inputGroup}>
                     <label className={styles.label}>Тип груза</label>
                     <Controller
                      name="cargo_type_id"
                      control={control}
                      rules={{ required: "Тип груза обязателен" }}
                                             render={({ field }) => (
                         <Select
                            value={cargoTypeOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            options={cargoTypeOptions}
                            placeholder="Выберите тип груза"
                            isClearable
                            isSearchable
                            className={styles.reactSelect}
                            classNamePrefix="react-select"
                            styles={{ option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused 
                                ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                                : 'transparent',
                              color: isDarkTheme ? '#f9fafb' : '#374151',
                              '&:hover': {
                                backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                              }
                            }),
                          }}
                         />
                       )}
                     />
                     {errors.cargo_type_id && <div className={styles.error}>{errors.cargo_type_id.message}</div>}
                   </div>
                </div>
                                 {/* Секция фотографии */}
                 <div className={styles.photoSection}>
                   <label className={styles.label}>Фотография</label>
                   <div 
                     className={`${styles.photoPlaceholder} ${isUploading ? styles.uploading : ''}`}
                     onClick={handlePhotoAreaClick}
                     onDragOver={handleDragOver}
                     onDragEnter={handleDragEnter}
                     onDragLeave={handleDragLeave}
                     onDrop={handleDrop}
                   >
                     {isUploading ? (
                       <div className={styles.uploadProgress}>
                         <div className={styles.spinner}></div>
                         <span>Загрузка...</span>
                       </div>
                     ) : photoPreview ? (
                       <img 
                         src={photoPreview} 
                         alt="Превью фото" 
                         className={styles.photoPreview}
                       />
                     ) : (
                       <div className={styles.uploadText}>
                         <span>Перетащите фото сюда или нажмите для выбора</span>
                         <span className={styles.uploadHint}>Поддерживаются PNG и JPG</span>
                       </div>
                     )}
                   </div>
                   <input
                     ref={fileInputRef}
                     type="file"
                     accept="image/png,image/jpeg,image/jpg"
                     onChange={handleFileInputChange}
                     style={{ display: 'none' }}
                   />
                 </div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.modalFooter}>
          <button
            type="submit"
            className={`${styles.saveButton} ${isUploading ? styles.disabled : ''}`}
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isUploading}
          >
            {isUploading ? 'Загрузка фото...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
