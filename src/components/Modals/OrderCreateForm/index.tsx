import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import Select from 'react-select';
import type { ModelOrderCreate, ModelOrderUpdate } from '../../../api';
import styles from './OrderCreateForm.module.css';
import type { OrderCreateFormProps } from './types';
import { ThemeContext } from '../../../context/ThemeContext';
import { ThemeList } from '../../../context/ThemeContext/types';

// Импортируем модульные компоненты
import { Modal } from '../ModalComp/Modal';
import { UrgentToggle } from '../ModalComp/UrgentToggle';
import { TimeSelector } from '../ModalComp/TimeSelector';

// Импортируем хуки
import { useOrderDraft } from '../../../hooks/modalHooks/useOrderDraft';
import { usePhotoUpload } from '../../../hooks/modalHooks/usePhotoUpload';

import { v4 as uuidv4 } from 'uuid';
// Импортируем утилиты
import { 
  transformLocationOptions, 
  transformCargoTypeOptions, 
  formatTimeForAPI,
  parseTimeFromAPIUTC,
  getModalTitle,
  formatCargoWeight
} from '../../../utils/orderUtils';

// Интерфейс для начальных данных формы
interface InitialData {
  initialFormData: Partial<ModelOrderCreate>;
  initialIsUrgent: boolean;
  initialSelectedDate: 'today' | 'tomorrow';
  initialSelectedTime: string;
  initialPhotoId: string;
}

export const OrderCreateForm = ({ onSubmitCreateOrder, onSubmitUpdateOrder, 
  onClose, initialData: initialDataProp, 
  order, orderID,
  locationOptions,
  cargoTypeOptions
 }: OrderCreateFormProps) => {

  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext?.theme === ThemeList.DARK;
  
  // Состояние для отслеживания измененных полей при редактировании
  const [originalValues, setOriginalValues] = useState<Partial<ModelOrderCreate>>({});

  // Используем созданные хуки
  const { draft, clearDraft, saveDraft } = useOrderDraft();

  const { 
    photoPreview, 
    isUploading, 
    photoId, 
    fileInputRef,
    handlePhotoAreaClick,
    handleFileInputChange,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    resetPhoto,
    restorePhotoId
  } = usePhotoUpload();
  
  const idempotencyKey = useRef<string>(uuidv4());

  const {
    initialFormData,
    initialIsUrgent,
    initialSelectedDate,
    initialSelectedTime,
    initialPhotoId,
  } : InitialData = useMemo(() => {
    
    let initialFormData: Partial<ModelOrderCreate>;
    let initialIsUrgent: boolean;
    let initialSelectedDate: 'today' | 'tomorrow';
    let initialSelectedTime: string;
    let initialPhotoId: string;
  
    if (order) {
      // Если редактируем существующий заказ
      initialFormData = {
        cargo_name: order.cargo_name || '',
        cargo_description: order.cargo_description || '',
        depart_loc: order.depart_loc,
        goal_loc: order.goal_loc,
        cargo_weight: order.cargo_weight,
        cargo_type_id: order.cargo_type_id,
      };
      
      // Парсим время из существующего заказа
      const timeData = order.time ? parseTimeFromAPIUTC(order.time) : { selectedDate: 'today' as const, selectedTime: '08:00' };
      initialSelectedDate = timeData.selectedDate;
      initialSelectedTime = timeData.selectedTime;
      initialIsUrgent = order.is_urgent || false;
      initialPhotoId = order.photo_id || '';
      
    } else {
  
      if (draft) {
        initialFormData = draft.formData;
        initialIsUrgent = draft.isUrgent;
        initialSelectedDate = draft.selectedDate;
        initialSelectedTime = draft.selectedTime;
        initialPhotoId = draft.photoId || '';
      } else {
        // Если создаем новый заказ
        initialFormData = initialDataProp || {
          cargo_name: '',
          cargo_description: '',
        };
        initialIsUrgent = false;
        initialSelectedDate = 'today';
        initialSelectedTime = '08:00';
        initialPhotoId = '';
      }
    }
  
    // Возвращаем объект со всеми вычисленными значениями
    return {
      initialFormData,
      initialIsUrgent,
      initialSelectedDate,
      initialSelectedTime,
      initialPhotoId
    };
    // Массив зависимостей: пересчитывается, если изменится order, draft или initialData
  }, [order, draft, initialDataProp]);

  useEffect(() => {
    if (order) {
      setOriginalValues(initialFormData);
    }
  }, []); 

  useEffect(() => {
    if (!order && initialPhotoId) {
      // Восстанавливаем photoId из черновика или существующего заказа
      restorePhotoId(initialPhotoId);
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ModelOrderCreate>({
    defaultValues: initialFormData,
  });

  const [isUrgent, setIsUrgent] = useState(initialIsUrgent);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>(initialSelectedDate);
  const [selectedTime, setSelectedTime] = useState<string>(initialSelectedTime);
  
  // Следим за изменениями формы
  const formValues = watch();

  // Восстанавливаем черновик при инициализации
  useEffect(() => {
    if (!order && draft) {
      // Восстанавливаем данные формы
      reset(draft.formData);
      
      // Восстанавливаем дополнительные состояния
      setIsUrgent(draft.isUrgent);
      setSelectedDate(draft.selectedDate);
      setSelectedTime(draft.selectedTime);
      
    }
  }, []);

  // Обработчик отправки формы
  const handleFormSubmit: SubmitHandler<ModelOrderCreate> = async (data) => {
    if (isUploading) {
      alert('Дождитесь завершения загрузки фото');
      return;
    }
    if (isSubmitting) {
      return;
    }
    try {
      if (order) {
        // Редактируем существующий заказ
        const updateData: ModelOrderUpdate = {};
        
        updateData.id = orderID;

        const changedFields = new Set<string>();
      
        Object.keys(formValues).forEach(key => {
          const fieldKey = key as keyof ModelOrderCreate;
          if (formValues[fieldKey] !== originalValues[fieldKey]) {
            changedFields.add(key);
          }
        });
        
        // Проверяем дополнительные поля
        if (isUrgent !== (order.is_urgent || false)) {
          changedFields.add('is_urgent');
        }
        if (selectedDate !== initialSelectedDate || selectedTime !== initialSelectedTime) {
          changedFields.add('time');
        }
        if (photoId !== (order.photo_id || '')) {
          changedFields.add('photo_id');
        }

        // Добавляем только измененные поля
        if (changedFields.has('cargo_name')) {
          updateData.cargo_name = data.cargo_name;
        }
        if (changedFields.has('cargo_description')) {
          updateData.cargo_description = data.cargo_description;
        }
        if (changedFields.has('depart_loc')) {
          updateData.depart_loc = data.depart_loc;
        }
        if (changedFields.has('goal_loc')) {
          updateData.goal_loc = data.goal_loc;
        }
        if (changedFields.has('cargo_weight')) {
          updateData.cargo_weight = formatCargoWeight(data.cargo_weight);
        }
        if (changedFields.has('cargo_type_id')) {
          updateData.cargo_type_id = data.cargo_type_id;
        }
        if (changedFields.has('is_urgent')) {
          updateData.is_urgent = isUrgent;
        }
        if (changedFields.has('time')) {
          updateData.time = formatTimeForAPI(selectedDate, selectedTime);
        }
        if (changedFields.has('photo_id')) {
          updateData.photo_id = photoId || undefined;
        }

        // Отправляем обновление заказа
        if (orderID) {
          if (onSubmitUpdateOrder) {
          onSubmitUpdateOrder(orderID, updateData);
          }
        }
      } else {
        // Создаем новый заказ
        const orderData = {
          ...data,
          cargo_weight: formatCargoWeight(data.cargo_weight),
          time: formatTimeForAPI(selectedDate, selectedTime),
          photo_id: photoId || undefined,
          is_urgent: isUrgent,
        };

        // Очищаем черновик после успешной отправки
        clearDraft();

        if (onSubmitCreateOrder) {
          onSubmitCreateOrder(orderData, idempotencyKey.current);
        }
      }
    } catch (error) {
      console.error('Ошибка обработки заказа:', error);
      alert('Ошибка обработки заказа. Попробуйте еще раз.');
    }
  };

  // Обработчик очистки формы
  const handleClearForm = () => {
    setIsUrgent(false);
    setSelectedDate('today');
    setSelectedTime('08:00');
    resetPhoto();
    
    if (!order) {
      clearDraft();
    }
    
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
  const handleFieldBlur = () => {
    if (!order) {
      saveDraft(formValues, isUrgent, selectedDate, selectedTime, photoId); // Принудительно сохраняем черновик при потере фокуса
    }
  };

  // Футер модального окна
  const modalFooter = (
    <button
      type="submit"
      className={`${styles.saveButton} ${(isUploading || isSubmitting) ? styles.disabled : ''}`}
      onClick={handleSubmit(handleFormSubmit)}
      disabled={isUploading || isSubmitting}
      aria-disabled={isUploading || isSubmitting}
      aria-busy={isSubmitting}
    >
      {isUploading ? 'Загрузка фото...' : isSubmitting ? 'Сохранение...' : 'Сохранить'}
    </button>
  );

  return (
    <Modal 
      isOpen={true} 
      onClose={onClose} 
      title={getModalTitle(!!order)}
      titelElement={undefined}
      footer={modalFooter}
      className={isDarkTheme ? styles.dark : ''}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Переключатель срочности */}
        <UrgentToggle 
          isUrgent={isUrgent} 
          onToggle={() => setIsUrgent(!isUrgent)} 
        />

        {/* Название и описание */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Название</label>
          <input
            {...register("cargo_name", { required: "Название обязательно" })}
            type="text"
            className={styles.input}
            onBlur={handleFieldBlur}
          />
          {errors.cargo_name && <div className={styles.error}>{errors.cargo_name.message}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Описание</label>
          <textarea
            {...register("cargo_description")}
            className={`${styles.input} ${styles.textarea}`}
            onBlur={handleFieldBlur}
          />
        </div>
        
        <div className={styles.formGrid}>
          {/* Левая колонка - локации и время */}
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
                      options={transformLocationOptions(locationOptions)}
                      placeholder="Выберите точку отправления"
                      isClearable
                      isSearchable
                      className={styles.reactSelect}
                      classNamePrefix="react-select"
                      onBlur={handleFieldBlur}
                      styles={{ option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused 
                          ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                          : 'transparent',
                        color: isDarkTheme ? '#f9fafb' : '#374151',
                        '&:hover': {
                          backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                        }
                      })}}
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
                      options={transformLocationOptions(locationOptions)}
                      placeholder="Выберите точку доставки"
                      isClearable
                      isSearchable
                      className={styles.reactSelect}
                      classNamePrefix="react-select"
                      onBlur={handleFieldBlur}
                      styles={{ option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused 
                          ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                          : 'transparent',
                        color: isDarkTheme ? '#f9fafb' : '#374151',
                        '&:hover': {
                          backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                        }
                      })}}
                    />
                  )}
                />
                {errors.goal_loc && <div className={styles.error}>{errors.goal_loc.message}</div>}
              </div>
            </div>
            
            {/* Компонент выбора времени */}
            <TimeSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Правая колонка - вес, тип груза и фото */}
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
                  onBlur={handleFieldBlur}
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
                      options={transformCargoTypeOptions(cargoTypeOptions)}
                      placeholder="Выберите тип груза"
                      isClearable
                      isSearchable
                      className={styles.reactSelect}
                      classNamePrefix="react-select"
                      onBlur={handleFieldBlur}
                      styles={{ option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused 
                          ? (isDarkTheme ? '#4b5563' : '#f3f4f6')
                          : 'transparent',
                        color: isDarkTheme ? '#f9fafb' : '#374151',
                        '&:hover': {
                          backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6'
                        }
                      })}}
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

        {/* Кнопка очистки формы */}
        <div className={styles.clearButtonContainer}>
          <button 
            type="button"
            className={styles.clearButton} 
            onClick={handleClearForm}
            aria-label="Очистить форму"
          >
            Очистить
          </button>
        </div>
      </form>
    </Modal>
  );
};
