import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../type'

export interface OrderListProps {
    orders: ModelOrderOut[];
    handleAction: OrderCardClickHandler;
    handlePhoto: OrderCardClickPhotoHandler;
    isPrivate: boolean;
}