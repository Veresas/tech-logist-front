//import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import { OrderCreateForm } from '../../components/Modals/OrderCreateForm'
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer';
import type { ModelDropDownListInfoResponse, ModelOrderCreate } from '../../api';
import { identityApi, ordersApi, referencyApi } from '../../utils/ApiFactory';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [locationOptions, setLocationOptions] = useState<ModelDropDownListInfoResponse['dep_builds']>({});
    const [cargoTypeOptions, setCargoTypeOptions] = useState<ModelDropDownListInfoResponse['cargo_types']>({});
    

    useEffect(() => {
        getDropDownListInfo();
    }, []);

    const handleLogout = async() => {
        try {
            await identityApi.publicAuthLogoutPost();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Ошибка выхода из системы:', error);
        }
    }

    const handleOrderCreate = async (order: ModelOrderCreate) => {
        try {
            await ordersApi.ordersCreatePost(order);
            setShowOrderModal(false);
        } catch (error) {
            console.error('Ошибка создания заказа:', error);
            alert('Ошибка создания заказа. Попробуйте еще раз.');
        }
        setShowOrderModal(false);
    }

    const getDropDownListInfo = async () => {
        try {
          const res = await referencyApi.refDropdownListInfoGet();
          setLocationOptions(res.data.dep_builds);
          setCargoTypeOptions(res.data.cargo_types);
        } catch (error) {
          console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
        }
      };

    const handleOpenOrderModal = () => {
        setShowOrderModal(true);
    }

    const handleCloseOrderModal = () => {
        setShowOrderModal(false);
    }

    const handelPrivetPage = () => {
        navigate('/s/cabinet');
    }

    return (
        <div>
            <OrderListContainer isPrivate={false} ordersApi={ordersApi} locationOptions={locationOptions} cargoTypeOptions={cargoTypeOptions} ></OrderListContainer>

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
                onSubmitCreateOrder={handleOrderCreate} 
                onSubmitUpdateOrder={undefined}
                onClose={handleCloseOrderModal} 
                order={undefined}
                orderID={undefined}
                locationOptions={locationOptions}
                cargoTypeOptions={cargoTypeOptions}
            />
        )}

        {isAuthenticated && (
            <button onClick={handleLogout}>Выйти</button>
        )}

        <button onClick={handelPrivetPage}>Перейти на страницу личного кабинета</button>


        </div>
    )
}
