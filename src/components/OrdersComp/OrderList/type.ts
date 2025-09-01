import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler, OrderCardEditHandler } from '../type'

export interface OrderListProps {
    orders: ModelOrderOut[];
    handleAction: OrderCardClickHandler;
    isPrivate: boolean;
    handleInfo: OrderCardClickInfoHandler;  
    handleEdit: OrderCardEditHandler;
}