import { ordersApi } from "../../utils/ApiFactory";
export const OCActionList = {
    TAKE: (id: string) => ordersApi.ordersIdAcceptPost(id),
    REJECT: (id: string) => ordersApi.ordersIdRejectPost(id),
    COMPLITE: (id: string) => ordersApi.ordersIdCompletePost(id),
    CANCEL: (id: string) => ordersApi.ordersIdCancelPost(id)
} as const;



export type OrderCardAction = typeof OCActionList[keyof typeof OCActionList];
export type OrderCardClickHandler = (orderId: string, action: OrderCardAction) => void;
export type OrderCardClickPhotoHandler = (photoId: string) => void;