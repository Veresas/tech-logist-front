import {type ModelLoginRequest} from '../../api';


export interface LoginFormProps {
    onSubmit: (data: ModelLoginRequest) => void;
}
