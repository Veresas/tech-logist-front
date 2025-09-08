export interface tag {
    id: string | number;
    name: string;
    onRemove: (id: string) => void;
}