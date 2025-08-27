import {useState} from 'react'
import { RegisterForm, LoginForm } from '../../components';
import { identityApi} from '../../utils/ApiFactory'
import { type ModelLoginRequest, type ModelRegisterRequest } from '../../api'
import { useToast } from '../../hooks/utilsHooks/noti_hooks';
import { OrderCreateForm } from '../../components/OrderCreateForm';
export const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const { showSuccess, showError } = useToast();
    const handleLogin = async (data: ModelLoginRequest) => {
        try {
            await identityApi.apiPublicAuthLoginPost(data);
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
    const handleOrderCreate = async () => {
        console.log('order create');
        setShowOrderModal(false);
    }

    const handleOpenOrderModal = () => {
        setShowOrderModal(true);
    }

    const handleCloseOrderModal = () => {
        setShowOrderModal(false);
    }

    return (
        <div>
            {isRegister ? <RegisterForm onSubmit={handleRegister} setIsRegister={setIsRegister} /> : <LoginForm onSubmit={handleLogin} setIsRegister={setIsRegister} />}
            
            {/* Кнопка для открытия модального окна */}
            <button 
                onClick={handleOpenOrderModal}
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Создать заказ
            </button>

            {/* Модальное окно */}
            {showOrderModal && (
                <OrderCreateForm 
                    onSubmit={handleOrderCreate} 
                    onClose={handleCloseOrderModal} 
                />
            )}
        </div>
    )
}