import type { OrderListProps } from './type'
import { OrderCard } from '../OrderCard'
import styles from './OrderList.module.css'

export const OrderList = ({ orders, handleAction, isPrivate, handleInfo } : OrderListProps) => {
    return (
        <div className={styles.orderList}>
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
