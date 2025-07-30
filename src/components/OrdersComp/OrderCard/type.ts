import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler } from '../type'

export interface OrderCardProps {
    order: ModelOrderOut;
    onClick: OrderCardClickHandler;
}