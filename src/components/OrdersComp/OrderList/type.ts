import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler } from '../type'

export interface OrderListProps {
    orders: ModelOrderOut[];
    handleAction: OrderCardClickHandler;
    isPrivate: boolean;
    handleInfo: OrderCardClickInfoHandler;  

}