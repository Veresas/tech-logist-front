import type { ModelOrder } from '../../../api' 
import type { OrderCardAction } from '../type'

export interface OrderListProps {
    orders: ModelOrder[];
    handelAction: (orderId : string, action : OrderCardAction) => void;
}