import { ordersApi } from "../../utils/ApiFactory";
import type { GithubComVeresusTlApiInternalModelOrderOut } from "../../api";
export const OCActionList = {
    TAKE: (id: number) => ordersApi.ordersIdAcceptPatch(id, {}),
    REJECT: (id: number) => ordersApi.ordersIdRejectPatch(id, {}),
    COMPLITE: (id: number) => ordersApi.ordersIdCompletePatch(id, {}),
    CANCEL: (id: number) => ordersApi.ordersIdCancelPatch(id, {})
} as const;



export type OrderCardAction = typeof OCActionList[keyof typeof OCActionList];
export type OrderCardClickHandler = (orderId: number, action: OrderCardAction) => void;
export type OrderCardClickPhotoHandler = (photoId: string) => void;
export type OrderCardClickInfoHandler = (order: GithubComVeresusTlApiInternalModelOrderOut) => void;
export type OrderCardEditHandler = (id: number) => void;