import type { ModelDropDownListInfoResponse, ModelOrder } from '../api';

/**
 * Утилиты для работы с заказами
 * Содержит вспомогательные функции для трансформации данных
 */

/**
 * Преобразование данных с сервера в формат для react-select
 * Конвертирует объект с ID и названиями в массив опций
 * 
 * @param depBuilds - объект с ID и названиями подразделений/зданий
 * @returns массив опций для react-select
 */
export const transformLocationOptions = (depBuilds: ModelDropDownListInfoResponse['dep_builds']) => {
  if (!depBuilds) return [];
  
  return Object.entries(depBuilds).map(([id, name]) => ({
    value: parseInt(id), // ID как число
    label: name // Название как строка
  }));
};

/**
 * Преобразование типов грузов в формат для react-select
 * Конвертирует объект с ID и названиями типов грузов в массив опций
 * 
 * @param cargoTypes - объект с ID и названиями типов грузов
 * @returns массив опций для react-select
 */
export const transformCargoTypeOptions = (cargoTypes: ModelDropDownListInfoResponse['cargo_types']) => {
  if (!cargoTypes) return [];
  
  return Object.entries(cargoTypes).map(([id, name]) => ({
    value: parseInt(id), // ID как число
    label: name // Название как строка
  }));
};

/**
 * Форматирование времени для отправки на сервер
 * Создает ISO строку времени на основе выбранной даты и времени
 * 
 * @param selectedDate - выбранная дата ('today' | 'tomorrow')
 * @param selectedTime - выбранное время в формате 'HH:MM'
 * @returns отформатированная строка времени для API
 */
export const formatTimeForAPI = (selectedDate: 'today' | 'tomorrow', selectedTime: string): string => {
  let targetDate: Date;
  
  if (selectedDate === 'today') {
    // Используем текущую дату
    targetDate = new Date();
  } else {
    // Используем завтрашнюю дату
    targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
  
  // Получаем дату в формате YYYY-MM-DD
  const dateString = targetDate.toISOString().split('T')[0];
  
  // Формируем полную строку времени с часовым поясом
  return `${dateString}T${selectedTime}:00+03:00`;
};

/**
 * Парсинг времени из API ответа
 * Извлекает дату и время из строки времени сервера
 * 
 * @param timeString - строка времени с сервера
 * @returns объект с датой и временем
 */
export const parseTimeFromAPI = (timeString: string) => {
  try {
    const date = new Date(timeString);
    
    // Определяем, сегодня это или завтра
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    let selectedDate: 'today' | 'tomorrow';
    if (date.toDateString() === now.toDateString()) {
      selectedDate = 'today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      selectedDate = 'tomorrow';
    } else {
      selectedDate = 'today'; // По умолчанию сегодня
    }
    
    // Извлекаем время в формате HH:MM
    const selectedTime = date.toTimeString().slice(0, 5);
    
    return {
      selectedDate,
      selectedTime
    };
  } catch (error) {
    console.error('Ошибка парсинга времени:', error);
    // Возвращаем значения по умолчанию при ошибке
    return {
      selectedDate: 'today' as const,
      selectedTime: '08:00'
    };
  }
};

/**
 * Валидация веса груза
 * Проверяет, что вес является положительным числом
 * 
 * @param weight - вес для валидации
 * @returns true если вес валиден
 */
export const validateCargoWeight = (weight: number | string | undefined): boolean => {
  if (weight === undefined || weight === '') return false;
  
  const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
  return !isNaN(numWeight) && numWeight > 0;
};

/**
 * Форматирование веса груза
 * Преобразует вес в число для отправки на сервер
 * 
 * @param weight - вес для форматирования
 * @returns число или undefined
 */
export const formatCargoWeight = (weight: number | string | undefined): number | undefined => {
  if (weight === undefined || weight === '') return undefined;
  
  const numWeight = typeof weight === 'string' ? parseFloat(weight) : weight;
  return isNaN(numWeight) ? undefined : numWeight;
};

/**
 * Создание заголовка модального окна
 * Возвращает соответствующий заголовок в зависимости от режима
 * 
 * @param isEditing - флаг редактирования существующего заказа
 * @returns заголовок для модального окна
 */
export const getModalTitle = (isEditing: boolean): string => {
  return isEditing ? 'Редактировать заказ' : 'Создать заказ';
};

/**
 * Проверка, является ли заказ срочным
 * Учитывает как флаг is_urgent, так и другие факторы
 * 
 * @param order - объект заказа
 * @returns true если заказ срочный
 */
export const isOrderUrgent = (order: ModelOrder): boolean => {
  return order?.is_urgent === true;
};

/**
 * Форматирование даты для отображения
 * Конвертирует дату в читаемый формат
 * 
 * @param dateString - строка даты
 * @returns отформатированная дата
 */
export const formatDateForDisplay = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return 'Неизвестная дата';
  }
};
