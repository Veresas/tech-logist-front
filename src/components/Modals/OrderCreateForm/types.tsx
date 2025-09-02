import { type ModelDropDownListInfoResponse, type ModelOrderCreate, type ModelOrderUpdate } from '../../../api';

export interface OrderCreateFormProps {
  onSubmitCreateOrder: ((data: ModelOrderCreate) => void) | undefined;
  onSubmitUpdateOrder: ((orderID: number, data: ModelOrderUpdate) => void) | undefined;
  locationOptions: ModelDropDownListInfoResponse['dep_builds'];
  cargoTypeOptions: ModelDropDownListInfoResponse['cargo_types'];
  onClose: () => void;
  initialData?: Partial<ModelOrderCreate>;
  order: ModelOrderCreate | undefined;
  orderID: number | undefined;
}

export interface InitialData {
  initialFormData: Partial<ModelOrderCreate>;
  initialIsUrgent: boolean;
  initialSelectedDate: 'today' | 'tomorrow';
  initialSelectedTime: string;
  initialPhotoId: string;
}