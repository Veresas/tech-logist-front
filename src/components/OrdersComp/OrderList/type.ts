import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler } from '../type'

export interface OrderListProps {
    orders: ModelOrderOut[];
    handelAction: OrderCardClickHandler;
}