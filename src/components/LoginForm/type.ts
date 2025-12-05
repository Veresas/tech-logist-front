import {type DtoLoginRequest} from '../../api/main';


export interface LoginFormProps {
    onSubmit: (data: DtoLoginRequest) => void;
    setIsRegister: (isRegister: boolean) => void;
}
