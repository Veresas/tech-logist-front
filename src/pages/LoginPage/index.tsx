import {useState} from 'react'
import { RegisterForm, LoginForm } from '../../components';
import { authApi} from '../../utils/ApiFactory'
import { type ModelLoginRequest, type ModelRegisterRequest } from '../../api'

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const handleLogin = async (data: ModelLoginRequest) => {
        try {
            await authApi.authLoginPost(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = async (data: ModelRegisterRequest) => {
        try {
            await authApi.authRegisterPost(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
        <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Войти" : "Регистрация"}
        </button>
        {isRegister ? <RegisterForm onSubmit={handleRegister} /> : <LoginForm onSubmit={handleLogin} />}

        </div>
    )
}