import { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import type { ModelOrderCreate, ModelDropDownListInfoResponse, } from '../../api';
import styles from './OrderCreateForm.module.css';
import type { OrderCreateFormProps, TimeSlot } from './types';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeList } from '../../context/ThemeContext/types';
import { ordersApi, referencyApi } from '../../utils/ApiFactory';

// Ключ для localStorage
const DRAFT_STORAGE_KEY = 'order_draft';

// Интерфейс для черновика
interface OrderDraft {
  formData: Partial<ModelOrderCreate>;
  isUrgent: boolean;
  selectedDate: 'today' | 'tomorrow';
  selectedTime: string;
  photoPreview?: string;
  photoId?: string;
}

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

// Преобразование данных с сервера в формат для react-select
const transformLocationOptions = (depBuilds: ModelDropDownListInfoResponse['dep_builds']) => {
  if (!depBuilds) return [];
  return Object.entries(depBuilds).map(([id, name]) => ({
    value: parseInt(id),
    label: name
  }));
};

const transformCargoTypeOptions = (cargoTypes: ModelDropDownListInfoResponse['cargo_types']) => {
  if (!cargoTypes) return [];
  return Object.entries(cargoTypes).map(([id, name]) => ({
    value: parseInt(id),
    label: name
  }));
};

export const OrderCreateForm = ({ onSubmit, onClose, initialData, order }: OrderCreateFormProps) => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext?.theme === ThemeList.DARK;
  console.log(order);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Функция сохранения черновика
  const saveDraft = (formData: Partial<ModelOrderCreate>) => {
    const draft: OrderDraft = {
      formData,
      isUrgent,
      selectedDate,
      selectedTime,
      photoPreview: photoPreview || undefined,
      photoId: photoId || undefined,
    };
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  };

  // Функция загрузки черновика
  const loadDraft = (): OrderDraft | null => {
    const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
    return draft ? JSON.parse(draft) : null;
  };

  // Функция очистки черновика
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  // Загружаем черновик при открытии формы
  const draft = loadDraft();
  const initialFormData = draft?.formData || initialData || {
    cargo_name: '',
    cargo_description: '',
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ModelOrderCreate>({
    defaultValues: initialFormData,
  });

  const [isUrgent, setIsUrgent] = useState(draft?.isUrgent || false);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>(draft?.selectedDate || 'today');
  const [selectedTime, setSelectedTime] = useState<string>(draft?.selectedTime || '00:00');
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [photoPreview, setPhotoPreview] = useState<string>(draft?.photoPreview || '');
  const [isUploading, setIsUploading] = useState(false);
  const [photoId, setPhotoId] = useState<string>(draft?.photoId || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [locationOptions, setLocationOptions] = useState<ModelDropDownListInfoResponse['dep_builds']>({});
  const [cargoTypeOptions, setCargoTypeOptions] = useState<ModelDropDownListInfoResponse['cargo_types']>({});
  // Следим за изменениями формы и сохраняем черновик
  const formValues = watch();
  
  // Получаем список типов грузов и связей подразделений и зданий
  useEffect(() => {
    const getDropDownListInfo = async () => {
      try {
        const res = await referencyApi.refDropdownListInfoGet();
        setLocationOptions(res.data.dep_builds);
        setCargoTypeOptions(res.data.cargo_types);
      } catch (error) {
        console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
      }
    };
    getDropDownListInfo();
  }, []);

  // Сохраняем черновик при изменении состояния
  useEffect(() => {
    saveDraft(formValues);
  }, [isUrgent, selectedDate, selectedTime, photoPreview, photoId]);

  // Сохраняем черновик при изменении полей формы (с задержкой)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDraft(formValues);
    }, 500); // Задержка 500мс

    return () => clearTimeout(timeoutId);
  }, [formValues]);

  // Обработчик отправки формы
  const handleFormSubmit: SubmitHandler<ModelOrderCreate> = async (data) => {
    // Проверяем, не идет ли загрузка фото
    if (isUploading) {
      alert('Дождитесь завершения загрузки фото');
      return;
    }

    // Добавляем флаг срочности, время и ID фото к данным
    const orderData = {
      ...data,
      cargo_weight: data.cargo_weight ? parseFloat(data.cargo_weight.toString()) : undefined, // Преобразуем в число
      time: `${selectedDate === 'today' ? new Date().toISOString().split('T')[0] : 
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T${selectedTime}:00+03:00`,
      photo_id: photoId || undefined,
    };
    
    try {
      // Отправляем заказ на сервер
      const orderCreateResponse = await ordersApi.ordersCreatePost(orderData);
      console.log('Заказ успешно создан:', orderCreateResponse.data);
      
      //await ordersApi.ordersIdPatch();
      // Очищаем черновик после успешной отправки
      clearDraft();
      onSubmit(orderData);
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      alert('Ошибка создания заказа. Попробуйте еще раз.');
    }
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

  // Обработка выбранного файла
  const handleFileSelect = async (file: File) => {
    if (!validateFileFormat(file)) {
      alert('Поддерживаются только файлы формата PNG и JPG');
      return;
    }

    setIsUploading(true);

    try {
      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Загружаем на сервер
      const uploadedPhotoId = await ordersApi.ordersPhotoUploadPost(file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPhotoId(uploadedPhotoId.data.photo_id);
      console.log('Фото загружено, ID:', uploadedPhotoId.data.photo_id);
      
      // Сохраняем черновик после получения ID фото
      saveDraft(formValues);
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

  // Обработчик очистки формы
  const handleClearForm = () => {
    // Сбрасываем состояние
    setIsUrgent(false);
    setSelectedDate('today');
    setSelectedTime('00:00');
    setPhotoPreview('');
    setPhotoId('');
    
    // Очищаем черновик
    clearDraft();
    
    // Сбрасываем форму к начальным значениям через react-hook-form
    reset({
      cargo_name: '',
      cargo_description: '',
      depart_loc: undefined,
      goal_loc: undefined,
      cargo_weight: undefined,
      cargo_type_id: undefined,
    });
  };

  // Обработчик потери фокуса для сохранения черновика
  const handleBlur = () => {
    saveDraft(formValues);
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
          <div className={styles.headerButtons}>
            <button 
              type="button"
              className={styles.clearButton} 
              onClick={handleClearForm}
              aria-label="Очистить форму"
            >
              Очистить
            </button>
            <button 
              className={styles.closeButton} 
              onClick={onClose}
              aria-label="Закрыть модальное окно"
            >
              ×
            </button>
          </div>
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
                  onBlur={handleBlur}
                />
                {errors.cargo_name && <div className={styles.error}>{errors.cargo_name.message}</div>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Описание</label>
                <textarea
                  {...register("cargo_description")}
                  className={`${styles.input} ${styles.textarea}`}
                  onBlur={handleBlur}
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
                            value={transformLocationOptions(locationOptions).find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            onBlur={handleBlur}
                            options={transformLocationOptions(locationOptions)}
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
                            value={transformLocationOptions(locationOptions).find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            onBlur={handleBlur}
                            options={transformLocationOptions(locationOptions)}
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
                        <span>{selectedTime}</span>
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
                      onBlur={handleBlur}
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
                            value={transformCargoTypeOptions(cargoTypeOptions).find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            onBlur={handleBlur}
                            options={transformCargoTypeOptions(cargoTypeOptions)}
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
