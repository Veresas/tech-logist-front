import React from 'react';
import { Modal } from '../ModalComp/Modal';
import styles from './DeleteConfirmationModal.module.css';
import type { DeleteConfirmationModalProps } from './types';


export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title="Удалить заказ?"
      className={styles.deleteConfirmationModal}
    >
      <div className={styles.deleteModalContent}>
        <div className={styles.deleteModalActions}>
          <button
            className={styles.deleteButton}
            onClick={onConfirm}
          >
            Удалить
          </button>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Отменить
          </button>
        </div>
      </div>
    </Modal>
  );
};
