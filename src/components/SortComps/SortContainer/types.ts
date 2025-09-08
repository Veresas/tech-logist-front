export interface SortContainerProp  {
    Today: boolean | undefined;
    Urgent: boolean | undefined;
    setName: (name: string | undefined) => void;
    setToday: (today: boolean | undefined) => void;
    setIsUrgent: (value: boolean | undefined) => void;
}
