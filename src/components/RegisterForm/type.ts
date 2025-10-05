// type.ts
import { type DtoRegisterRequest } from '../../api';

export interface RegisterFormProps {
    onSubmit: (data: DtoRegisterRequest) => void;
    setIsRegister: (isRegister: boolean) => void;
    validLoginReq: (login: string) => Promise<boolean>;
}