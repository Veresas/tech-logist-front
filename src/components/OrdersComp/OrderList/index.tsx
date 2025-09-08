import type { OrderListProps } from './type'
import { OrderCard } from '../OrderCard'
import styles from './OrderList.module.css'

export const OrderList = ({ orders, handleAction, isPrivate, handleInfo } : OrderListProps) => {
    // Сортируем заказы по времени: от ближайшего к самому позднему
    const sortedOrders = [...orders].sort((a, b) => {
        const aTime = a.time ? new Date(a.time).getTime() : Infinity
        const bTime = b.time ? new Date(b.time).getTime() : Infinity
        return aTime - bTime
    })

    return (
        <div className={styles.orderList}>
            {sortedOrders.map((order) => (
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
