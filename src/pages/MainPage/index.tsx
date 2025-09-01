//import React, { useEffect, useState } from 'react'
import { useState } from 'react';
import { OrderCreateForm } from '../../components/OrderCreateForm'
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer';
import type { ModelDropDownListInfoResponse, ModelOrderCreate, ModelOrderUpdate } from '../../api';
import { ordersApi, referencyApi } from '../../utils/ApiFactory';

export const MainPage = () => {
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [locationOptions, setLocationOptions] = useState<ModelDropDownListInfoResponse['dep_builds']>({});
    const [cargoTypeOptions, setCargoTypeOptions] = useState<ModelDropDownListInfoResponse['cargo_types']>({});
    
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
      getDropDownListInfo();

    const handleOrderUpdate = async (orderID: number, order: ModelOrderUpdate) => {
        try {
            await ordersApi.ordersIdPatch(orderID, order);
            setShowOrderModal(false);
        } catch (error) {
            console.error('Ошибка обновления заказа:', error);
            alert('Ошибка обновления заказа. Попробуйте еще раз.');
        }
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
            <OrderListContainer isPrivate={false} ></OrderListContainer>

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
                onSubmitUpdateOrder={handleOrderUpdate}
                onClose={handleCloseOrderModal} 
                order={undefined}
                orderID={undefined}
                locationOptions={locationOptions}
                cargoTypeOptions={cargoTypeOptions}
            />
        )}
        </div>
    )
}
