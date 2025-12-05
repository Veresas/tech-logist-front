import type{ GithubComVeresusTlApiInternalModelDropDownListInfoResponse, DtoOrderCreate, DtoOrderUpdate } from '../../../api/main';

export interface OrderCreateFormProps {
  onSubmitCreateOrder: ((data: DtoOrderCreate, idempotencyKey: string) => void) | undefined;
  onSubmitUpdateOrder: ((orderID: number, data: DtoOrderUpdate) => void) | undefined;
  locationOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds'];
  cargoTypeOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types'];
  onClose: () => void;
  initialData?: Partial<DtoOrderCreate>;
  order: DtoOrderCreate | undefined;
  orderID: number | undefined;
}

export interface InitialData {
  initialFormData: Partial<DtoOrderCreate>;
  initialIsUrgent: boolean;
  initialSelectedDate: 'today' | 'tomorrow';
  initialSelectedTime: string;
  initialPhotoId: string; 
}