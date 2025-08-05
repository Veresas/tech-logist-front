import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../type'

export interface OrderListProps {
    orders: ModelOrderOut[];
    handelAction: OrderCardClickHandler;
    handelPhoto: OrderCardClickPhotoHandler;
    isPrivate: boolean;
}