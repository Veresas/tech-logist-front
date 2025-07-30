export const OCActionList = {
    TAKE: 'take',
    REJECT: 'reject',
    COMPLITE: 'complite',
    CANCEL: 'cancel'
} as const;

;

export type OrderCardAction = typeof OCActionList[keyof typeof OCActionList];

export type OrderCardClickHandler = (orderId: string, action: OrderCardAction) => void;