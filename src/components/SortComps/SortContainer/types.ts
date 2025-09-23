export interface SortContainerProp  {
    Today: boolean | undefined;
    Urgent: boolean | undefined;
    DepartLoc: string | undefined;
    GoalLoc: string | undefined;
    CargoType: string | undefined;
    setName: (name: string | undefined) => void;
    setToday: (today: boolean | undefined) => void;
    setIsUrgent: (value: boolean | undefined) => void;
    setDepartLoc: (departLoc: string | undefined) => void;
    setGoalLoc: (goalLoc: string | undefined) => void;
    setCargoType: (cargoType: string | undefined) => void;
}
