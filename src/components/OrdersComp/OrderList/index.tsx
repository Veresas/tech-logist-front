import React from 'react'
import type { OrderListProps } from './type'
import { OrderCard } from '../OrderCard'

export const OrderList = ({ orders, handelAction, handelPhoto, isPrivate } : OrderListProps) => {
    return (
        <div>
            {orders.map((order) => (
                <OrderCard 
                    key={order.id} 
                    order={order} 
                    onClick={handelAction} 
                    onClickPhoto={handelPhoto} 
                    isPrivate={isPrivate} />
            ))}
        </div>
    )
}
