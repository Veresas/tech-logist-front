import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler } from '../type'

export interface OrderCardProps {
    order: ModelOrderOut;
    onClick: OrderCardClickHandler;
    isPrivate: boolean;
    onInfo: OrderCardClickInfoHandler;  
}