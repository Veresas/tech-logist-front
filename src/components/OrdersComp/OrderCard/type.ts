import type { GithubComVeresusTlApiInternalModelOrderOut } from '../../../api' 
import type { OrderCardClickHandler, OrderCardClickInfoHandler } from '../type'

export interface OrderCardProps {
    order: GithubComVeresusTlApiInternalModelOrderOut;
    onClick: OrderCardClickHandler;
    isPrivate: boolean;
    onInfo: OrderCardClickInfoHandler;  
    // Флаг раскрытия секции, для стилизации через data-атрибут
    isExpand?: boolean;
}