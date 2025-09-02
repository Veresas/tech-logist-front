import type { OrderListProps } from './type'
import { OrderCard } from '../OrderCard'

export const OrderList = ({ orders, handleAction, isPrivate, handleInfo } : OrderListProps) => {
    return (
        <div>
            {orders.map((order) => (
                <OrderCard 
                    key={order.id} 
                    order={order} 
                    onClick={handleAction} 
                    isPrivate={isPrivate} 
                    onInfo={handleInfo}
                />
            ))}
        </div>
    )
}
