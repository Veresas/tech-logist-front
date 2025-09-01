import { type ModelOrderCreate } from '../../api';

export interface OrderCreateFormProps {
  onSubmit: (data: ModelOrderCreate) => void;
  onClose: () => void;
  initialData?: Partial<ModelOrderCreate>;
  order: ModelOrderCreate | undefined;
}

export interface TimeSlot {
  time: string;
  label: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface CargoType {
  id: number;
  name: string;
}
