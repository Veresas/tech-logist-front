import type { GithubComVeresusTlApiInternalModelOrderOut } from "../../api/main";

// Определяем набор действий для карточки без прямых вызовов API
export type OrderCardAction = 'TAKE' | 'REJECT' | 'COMPLITE' | 'CANCEL';



export type OrderCardClickHandler = (orderId: number, action: OrderCardAction) => void;
export type OrderCardClickPhotoHandler = (photoId: string) => void;
export type OrderCardClickInfoHandler = (order: GithubComVeresusTlApiInternalModelOrderOut) => void;
export type OrderCardEditHandler = (id: number) => void;