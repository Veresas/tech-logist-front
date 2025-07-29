// type.ts
import { type ModelRegisterRequest } from '../../api';

export interface RegisterFormProps {
    onSubmit: (data: ModelRegisterRequest) => void;
}