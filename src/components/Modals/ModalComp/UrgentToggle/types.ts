/**
 * Интерфейс пропсов для компонента UrgentToggle
 * @param isUrgent - текущее состояние срочности
 * @param onToggle - функция переключения состояния
 * @param className - дополнительные CSS классы для кастомизации
 * @param disabled - флаг отключения компонента
 */
export interface UrgentToggleProps {
    isUrgent: boolean;
    onToggle: () => void;
    className?: string;
    disabled?: boolean;
  }