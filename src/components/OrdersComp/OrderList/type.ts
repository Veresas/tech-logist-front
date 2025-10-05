import type { GithubComVeresusTlApiInternalModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler } from '../type'

export interface OrderListProps {
    orders: GithubComVeresusTlApiInternalModelOrderOut[];
    handleAction: OrderCardClickHandler;
    isPrivate: boolean;
    handleInfo: OrderCardClickInfoHandler;  

}