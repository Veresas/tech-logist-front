import type { ModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../type'

export interface OrderCardProps {
    order: ModelOrderOut;
    onClick: OrderCardClickHandler;
    onClickPhoto: OrderCardClickPhotoHandler;
    isPrivate: boolean;
}