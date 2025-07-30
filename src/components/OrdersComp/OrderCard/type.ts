import type { ModelOrder } from '../../../api' 
import type { OrderCardAction } from '../type'

export interface OrderCardProps {
    order: ModelOrder;
    onClick: (orderId : string, action : OrderCardAction) => void;
}