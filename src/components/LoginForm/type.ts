import {type DtoLoginRequest} from '../../api';


export interface LoginFormProps {
    onSubmit: (data: DtoLoginRequest) => void;
    setIsRegister: (isRegister: boolean) => void;
}
