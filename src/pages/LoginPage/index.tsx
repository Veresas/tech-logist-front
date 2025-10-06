import {useState} from 'react'
import { RegisterForm, LoginForm } from '../../components';
import type { DtoLoginRequest, DtoRegisterRequest } from '../../api'
import { useToast } from '../../hooks/utilsHooks/noti_hooks';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks';
import { useLoginMutation, useRegisterMutation } from '../../hooks/api/useIdentity';
import { useQueryClient } from '@tanstack/react-query';

export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const { login } = useAuth();

    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();
    const qc = useQueryClient();

    const handleLogin = async (data: DtoLoginRequest) => {
        try {
            await loginMutation.mutateAsync(data);
            login(); 
            navigate('/');
        } catch (error) {
            showError('Неверный логин или пароль');
            console.error(error);
        }
    }

    const handleRegister = async (data: DtoRegisterRequest) => {
        try {
            await registerMutation.mutateAsync(data);
            showSuccess('Регистрация прошла успешно');
            setIsRegister(false);
        } catch (error) {
            showError('Ошибка входа: ' + error);
            console.error(error);
        }
    }

    const validLoginReq = async (login: string) => {
        try {
            const data = await qc.fetchQuery({
              queryKey: ['auth', 'check-login', login],
              queryFn: async () => {
                const res = await fetch(`/api/public/auth/check-login/${encodeURIComponent(login)}`, { credentials: 'include' })
                if (!res.ok) throw new Error('check-login failed')
                return (await res.json()) as boolean
              },
              staleTime: 60_000,
            })
            return data
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