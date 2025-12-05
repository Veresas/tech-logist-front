import type { GithubComVeresusTlApiInternalModelOrderOut } from '../../../api/main' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler } from '../type'

export interface OrderListProps {
    orders: GithubComVeresusTlApiInternalModelOrderOut[];
    handleAction: OrderCardClickHandler;
    isPrivate: boolean;
    handleInfo: OrderCardClickInfoHandler;  
    // Пробрасываем, раскрыта ли секция
    isExpand?: boolean;

}