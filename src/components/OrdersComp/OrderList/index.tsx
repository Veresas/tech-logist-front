import type { OrderListProps } from './type'
import { OrderCard } from '../OrderCard'

export const OrderList = ({ orders, handleAction, handlePhoto, isPrivate } : OrderListProps) => {
    return (
        <div>
            {orders.map((order) => (
                <OrderCard 
                    key={order.id} 
                    order={order} 
                    onClick={handleAction} 
                    onClickPhoto={handlePhoto} 
                    isPrivate={isPrivate} />
            ))}
        </div>
    )
}
