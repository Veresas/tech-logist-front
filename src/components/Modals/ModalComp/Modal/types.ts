import { type ReactNode } from 'react';
/**
 * Интерфейс пропсов для Modal компонента
 * @param isOpen - флаг открытия/закрытия модального окна
 * @param onClose - функция закрытия модального окна
 * @param title - заголовок модального окна
 * @param titelElement - элемент заголовка модального окна
 * @param children - содержимое модального окна
 * @param footer - опциональный футер модального окна (кнопки действий)
 * @param className - дополнительные CSS классы для кастомизации
 */
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string | undefined;
    titelElement: ReactNode | undefined;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
  }