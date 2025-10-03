import {useState} from 'react'
import { RegisterForm, LoginForm } from '../../components';
import { identityApi} from '../../utils/ApiFactory'
import { type ModelLoginRequest, type ModelRegisterRequest } from '../../api'
import { useToast } from '../../hooks/utilsHooks/noti_hooks';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks';

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const { login } = useAuth();

    const handleLogin = async (data: ModelLoginRequest) => {
        try {
            await identityApi.publicAuthLoginPost(data);
            login(); 
            navigate('/');
        } catch (error) {
            showError('Неверный логин или пароль');
            console.error(error);
        }
    }

    const handleRegister = async (data: ModelRegisterRequest) => {
        try {
            await identityApi.publicAuthRegisterPost(data);
            showSuccess('Регистрация прошла успешно');
            setIsRegister(false);
        } catch (error) {
            showError('Ошибка входа: ' + error);
            console.error(error);
        }
    }

    const validLoginReq = async (login: string) => {
        try {
            const resp = await identityApi.publicAuthCheckLoginLoginGet(login)
            return resp.data;
        } catch (error) {
            showError('Ошибка валидации логина. Попробуйте позже');
            console.error(error);
            return false
        }
    }


    return (
        <div>
            {isRegister ? <RegisterForm onSubmit={handleRegister} setIsRegister={setIsRegister} validLoginReq={validLoginReq}/> : <LoginForm onSubmit={handleLogin} setIsRegister={setIsRegister} />}
            
        </div>
    )
}