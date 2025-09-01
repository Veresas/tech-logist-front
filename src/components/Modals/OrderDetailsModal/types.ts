import type { ModelOrderOut, ModelOrderUpdate } from "../../../api";

export interface OrderDetailsModalProps {
    order: ModelOrderOut;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (orderId: number, order: ModelOrderUpdate) => void;
    onDelete: (orderId: number) => void;
    onComplete: (orderId: number) => void;
    onReject: (orderId: number) => void;
    photoUrl: string | null;
  }
  