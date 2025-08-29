import {useState} from 'react'
import { RegisterForm, LoginForm } from '../../components';
import { identityApi} from '../../utils/ApiFactory'
import { type ModelLoginRequest, type ModelRegisterRequest } from '../../api'
import { useToast } from '../../hooks/utilsHooks/noti_hooks';

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const { showSuccess, showError } = useToast();
    const handleLogin = async (data: ModelLoginRequest) => {
        try {
            await identityApi.publicAuthLoginPost(data);
        } catch (error) {
            showError('Неверный логин или пароль');
            console.error(error);
        }
    }

    const handleRegister = async (data: ModelRegisterRequest) => {
        try {
            await identityApi.apiPublicAuthRegisterPost(data);
            showSuccess('Регистрация прошла успешно');
            setIsRegister(false);
        } catch (error) {
            showError('Ошибка входа: ' + error);
            console.error(error);
        }
    }


    return (
        <div>
            {isRegister ? <RegisterForm onSubmit={handleRegister} setIsRegister={setIsRegister} /> : <LoginForm onSubmit={handleLogin} setIsRegister={setIsRegister} />}
            
        </div>
    )
}