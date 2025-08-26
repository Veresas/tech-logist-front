import { ordersApi } from "../../utils/ApiFactory";
export const OCActionList = {
    TAKE: (id: number) => ordersApi.apiOrdersIdAcceptPatch(id, {}),
    REJECT: (id: number) => ordersApi.apiOrdersIdRejectPatch(id, {}),
    COMPLITE: (id: number) => ordersApi.apiOrdersIdCompletePatch(id, {}),
    CANCEL: (id: number) => ordersApi.apiOrdersIdCancelPatch(id, {})
} as const;



export type OrderCardAction = typeof OCActionList[keyof typeof OCActionList];
export type OrderCardClickHandler = (orderId: number, action: OrderCardAction) => void;
export type OrderCardClickPhotoHandler = (photoId: string) => void;