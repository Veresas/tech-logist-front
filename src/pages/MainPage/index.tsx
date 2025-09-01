//import React, { useEffect, useState } from 'react'
import { useState } from 'react';
import { OrderCreateForm } from '../../components/OrderCreateForm'
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer';

export const MainPage = () => {
    const [showOrderModal, setShowOrderModal] = useState(false);
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
                onSubmit={handleOrderCreate} 
                onClose={handleCloseOrderModal} 
            />
        )}
        </div>
    )
}
