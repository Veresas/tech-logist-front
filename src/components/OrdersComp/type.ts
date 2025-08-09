import { ordersApi } from "../../utils/ApiFactory";
export const OCActionList = {
    TAKE: (id: string) => ordersApi.secureOrderAcceptIdPut(id),
    REJECT: (id: string) => ordersApi.secureOrderRejectIdPut(id),
    COMPLITE: (id: string) => ordersApi.secureOrderCompleteIdPut(id),
    CANCEL: (id: string) => ordersApi.secureOrderCancelIdPut(id)
} as const;



export type OrderCardAction = typeof OCActionList[keyof typeof OCActionList];
export type OrderCardClickHandler = (orderId: string, action: OrderCardAction) => void;
export type OrderCardClickPhotoHandler = (photoId: string) => void;