export interface SortModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    today: boolean | undefined;
    setToday: (today: boolean | undefined) => void;
    isUrgent: boolean | undefined;
    setIsUrgent: (isUrgent: boolean | undefined) => void;
    // Текущие выбранные значения
    departLoc: string | undefined;
    goalLoc: string | undefined;
    cargoType: string | undefined;
    // Сеттеры для установки значений при выборе из выпадающих списков
    setDepartLoc: (loc: string | undefined) => void;
    setGoalLoc: (loc: string | undefined) => void;
    setCargoType: (cargoType: string | undefined) => void;
}