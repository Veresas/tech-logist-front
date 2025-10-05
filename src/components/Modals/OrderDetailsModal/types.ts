import type { GithubComVeresusTlApiInternalModelOrderOut } from "../../../api";

export interface OrderDetailsModalProps {
    order: GithubComVeresusTlApiInternalModelOrderOut;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (orderId: number) => void;
    onDelete: (orderId: number) => void;
    onComplete: (orderId: number) => void;
    onReject: (orderId: number) => void;
    onTake: (orderId: number) => void;
    photoUrl: string | null;
  }
  