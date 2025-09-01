import React, { useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import type { ModalProps } from './types';



/**
 * Базовый переиспользуемый Modal компонент
 * 
 * Основные возможности:
 * - Управление фокусом и доступностью (accessibility)
 * - Обработка клавиатурных событий (Escape, Tab)
 * - Блокировка скролла на body при открытии
 * - Автоматическое возвращение фокуса при закрытии
 * - Поддержка порталов для корректного рендеринга
 * 
 * Использование:
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Заголовок">
 *   <div>Содержимое модального окна</div>
 * </Modal>
 */
export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  className = '' 
}: ModalProps) => {
  // Ссылка на DOM элемент модального окна для управления фокусом
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Ссылка на элемент, который был в фокусе до открытия модального окна
  // Нужен для возвращения фокуса при закрытии
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /**
   * useEffect для управления фокусом и доступностью модального окна
   * Выполняется при каждом изменении isOpen или onClose
   */
  useEffect(() => {
    // Если модальное окно не открыто, ничего не делаем
    if (!isOpen) return;

    // Сохраняем текущий активный элемент для последующего возвращения фокуса
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    // Переводим фокус в модальное окно для корректной работы accessibility
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Блокируем скролл на body, чтобы пользователь не мог прокручивать страницу
    // под модальным окном
    document.body.style.overflow = 'hidden';

    /**
     * Обработчик клавиши Escape для закрытия модального окна
     * Это стандартное поведение для модальных окон
     */
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    /**
     * Обработчик клавиши Tab для зацикливания фокуса внутри модального окна
     * Это важная часть accessibility - пользователь не должен "выпадать" из модального окна
     */
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Находим все элементы, которые могут получить фокус
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            // Shift + Tab - движение назад по фокусируемым элементам
            if (document.activeElement === firstElement) {
              e.preventDefault(); // Предотвращаем стандартное поведение
              lastElement.focus(); // Переводим фокус на последний элемент
            }
          } else {
            // Tab - движение вперед по фокусируемым элементам
            if (document.activeElement === lastElement) {
              e.preventDefault(); // Предотвращаем стандартное поведение
              firstElement.focus(); // Переводим фокус на первый элемент
            }
          }
        }
      }
    };

    // Добавляем обработчики клавиатурных событий
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    /**
     * Функция очистки, которая выполняется при размонтировании компонента
     * или изменении зависимостей useEffect
     */
    return () => {
      // Возвращаем фокус на элемент, который был активен до открытия модального окна
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      
      // Разблокируем скролл на body
      document.body.style.overflow = 'unset';
      
      // Удаляем обработчики клавиатурных событий
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]); // Зависимости useEffect

  // Если модальное окно не открыто, ничего не рендерим
  if (!isOpen) return null;

  /**
   * Используем createPortal для рендеринга модального окна
   * Это гарантирует, что модальное окно будет отрендерено в корне DOM,
   * а не внутри родительского компонента, что важно для корректного
   * позиционирования и z-index
   */
  return createPortal(
    // Оверлей - полупрозрачный фон, клик по которому закрывает модальное окно
    <div className={styles.modalOverlay} onClick={onClose}>
      {/* 
        Основной контейнер модального окна
        stopPropagation предотвращает закрытие при клике на содержимое
      */}
      <div 
        ref={modalRef}
        className={`${styles.modal} ${className}`} 
        onClick={(e) => e.stopPropagation()}
        role="dialog" // ARIA атрибут для screen readers
        aria-modal="true" // Указывает, что это модальное окно
        aria-labelledby="modal-title" // Связывает с заголовком для accessibility
        tabIndex={-1} // Позволяет получить фокус программно
      >
        {/* Заголовок модального окна */}
        <div className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
          {/* Кнопка закрытия */}
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Закрыть модальное окно" // Описание для screen readers
          >
            ×
          </button>
        </div>

        {/* Основное содержимое модального окна */}
        <div className={styles.modalContent}>
          {children}
        </div>

        {/* 
          Опциональный футер для кнопок действий
          Рендерится только если передан
        */}
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body // Рендерим в body для корректного позиционирования
  );
};
