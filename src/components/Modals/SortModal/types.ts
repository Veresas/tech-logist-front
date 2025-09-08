export interface SortModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    today: boolean | undefined;
    setToday: (today: boolean | undefined) => void;
    isUrgent: boolean | undefined;
    setIsUrgent: (isUrgent: boolean | undefined) => void;
}