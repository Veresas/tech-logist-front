import styles from './UrgentToggle.module.css';
import type { UrgentToggleProps } from './types';


/**
 * Компонент переключателя срочности заказа
 * 
 * Представляет собой стилизованный toggle switch с анимацией
 * и поддержкой состояний актив/неактив
 * 
 * Использование:
 * <UrgentToggle 
 *   isUrgent={isUrgent} 
 *   onToggle={() => setIsUrgent(!isUrgent)} 
 * />
 */
export const UrgentToggle = ({ 
  isUrgent, 
  onToggle, 
  className = '', 
  disabled = false 
}: UrgentToggleProps) => {
  /**
   * Обработчик клика по переключателю
   * Вызывает onToggle только если компонент не отключен
   */
  const handleToggleClick = () => {
    if (!disabled) {
      onToggle();
    }
  };

  /**
   * Обработчик нажатия клавиши Enter или Space
   * Обеспечивает доступность с клавиатуры
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Предотвращаем стандартное поведение
      handleToggleClick();
    }
  };

  return (
    <div className={`${styles.urgentToggle} ${className}`}>
      {/* 
        Переключатель - основной интерактивный элемент
        Использует role="switch" для accessibility
        aria-checked для индикации текущего состояния
      */}
      <div 
        className={`${styles.toggleSwitch} ${isUrgent ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggleClick}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={isUrgent}
        aria-label="Переключатель срочности заказа"
        tabIndex={disabled ? -1 : 0} // Отключаем фокус если disabled
      >
        {/* 
          Ползунок переключателя
          Анимируется при изменении состояния
        */}
        <div className={styles.toggleHandle} />
      </div>
      
      {/* 
        Текстовая метка переключателя
        Помогает пользователю понять назначение
      */}
      <span className={styles.toggleLabel}>
        Срочный заказ
      </span>
    </div>
  );
};
