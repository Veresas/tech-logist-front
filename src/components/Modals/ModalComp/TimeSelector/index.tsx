import React from 'react';
import { useState } from 'react';
import styles from './TimeSelector.module.css';

/**
 * Интерфейс для временного слота
 * @param time - время в формате HH:MM
 * @param label - отображаемая метка времени
 */
export interface TimeSlot {
  time: string;
  label: string;
}

/**
 * Интерфейс пропсов для компонента TimeSelector
 * @param selectedDate - выбранная дата (сегодня/завтра)
 * @param selectedTime - выбранное время
 * @param onDateChange - функция изменения даты
 * @param onTimeChange - функция изменения времени
 * @param className - дополнительные CSS классы для кастомизации
 * @param disabled - флаг отключения компонента
 */
interface TimeSelectorProps {
  selectedDate: 'today' | 'tomorrow';
  selectedTime: string;
  onDateChange: (date: 'today' | 'tomorrow') => void;
  onTimeChange: (time: string) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Генерация временных слотов каждые 15 минут
 * Временной диапазон: с 8:00 до 18:00
 * 
 * @returns массив временных слотов
 */
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  // Генерируем слоты с 8:00 до 18:00
  for (let hour = 8; hour < 18; hour++) {
    // Каждые 15 минут (0, 15, 30, 45)
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({ time, label: time });
    }
  }
  
  return slots;
};

/**
 * Компонент выбора времени доставки
 * 
 * Включает:
 * - Переключение между "сегодня" и "завтра"
 * - Сетку временных слотов с 15-минутными интервалами
 * - Визуальное отображение выбранного времени
 * - Поддержку клавиатурной навигации
 * 
 * Использование:
 * <TimeSelector
 *   selectedDate="today"
 *   selectedTime="14:30"
 *   onDateChange={(date) => setSelectedDate(date)}
 *   onTimeChange={(time) => setSelectedTime(time)}
 * />
 */
export const TimeSelector = ({ 
  selectedDate, 
  selectedTime, 
  onDateChange, 
  onTimeChange, 
  className = '',
  disabled = false
}: TimeSelectorProps) => {
  // Генерируем временные слоты один раз при инициализации
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());

  /**
   * Обработчик изменения даты
   * Вызывает onDateChange только если компонент не отключен
   */
  const handleDateChange = (date: 'today' | 'tomorrow') => {
    if (!disabled) {
      onDateChange(date);
    }
  };

  /**
   * Обработчик изменения времени
   * Вызывает onTimeChange только если компонент не отключен
   */
  const handleTimeChange = (time: string) => {
    if (!disabled) {
      onTimeChange(time);
    }
  };

  /**
   * Обработчик нажатия клавиши Enter или Space для табов даты
   * Обеспечивает доступность с клавиатуры
   */
  const handleDateKeyDown = (event: React.KeyboardEvent, date: 'today' | 'tomorrow') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDateChange(date);
    }
  };

  /**
   * Обработчик нажатия клавиши Enter или Space для временных слотов
   * Обеспечивает доступность с клавиатуры
   */
  const handleTimeKeyDown = (event: React.KeyboardEvent, time: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTimeChange(time);
    }
  };

  return (
    <div className={`${styles.timeSection} ${className}`}>
      {/* Заголовок секции времени */}
      <label className={styles.label}>Время доставки</label>
      
      {/* Табы для выбора даты (сегодня/завтра) */}
      <div className={styles.timeTabs}>
        {/* Таб "Сегодня" */}
        <button
          type="button"
          className={`${styles.timeTab} ${selectedDate === 'today' ? styles.active : ''}`}
          onClick={() => handleDateChange('today')}
          onKeyDown={(e) => handleDateKeyDown(e, 'today')}
          disabled={disabled}
          aria-label="Выбрать сегодняшнюю дату"
          aria-pressed={selectedDate === 'today'}
        >
          Сегодня
        </button>
        
        {/* Таб "Завтра" */}
        <button
          type="button"
          className={`${styles.timeTab} ${selectedDate === 'tomorrow' ? styles.active : ''}`}
          onClick={() => handleDateChange('tomorrow')}
          onKeyDown={(e) => handleDateKeyDown(e, 'tomorrow')}
          disabled={disabled}
          aria-label="Выбрать завтрашнюю дату"
          aria-pressed={selectedDate === 'tomorrow'}
        >
          Завтра
        </button>
      </div>

      {/* Сетка временных слотов */}
      <div className={styles.timeGrid}>
        {/* Заголовок сетки с выбранным временем и иконкой */}
        <div className={styles.timeGridHeader}>
          <span className={styles.selectedTime}>{selectedTime}</span>
          {/* Иконка стрелки вниз для визуального разделения */}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true" // Скрываем от screen readers
            color='#A8B5FB'
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </div>
        
        {/* Содержимое сетки - временные слоты */}
        <div className={styles.timeGridContent}>
          {/* 
            Отображаем первые 48 слотов (12 часов * 4 слота в час)
            Это покрывает весь рабочий день с 8:00 до 18:00
          */}
          {timeSlots.slice(0, 48).map((slot) => (
            <button
              key={slot.time}
              type="button"
              className={`${styles.timeSlot} ${selectedTime === slot.time ? styles.selected : ''}`}
              onClick={() => handleTimeChange(slot.time)}
              onKeyDown={(e) => handleTimeKeyDown(e, slot.time)}
              disabled={disabled}
              aria-label={`Выбрать время ${slot.label}`}
              aria-pressed={selectedTime === slot.time}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
