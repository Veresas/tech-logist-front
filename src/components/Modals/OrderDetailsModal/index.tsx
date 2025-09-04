import React, { useState, useEffect } from 'react';
import type { OrderDetailsModalProps } from './types';
import { ModelRoleEnum, ModelOrderStatusEnum } from '../../../api';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { useTheme } from '../../../utils/ContextHooks/ThemeContextHooks';
import { Modal } from '../ModalComp/Modal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import styles from './OrderDetailsModal.module.css';
import { Clock, X, Expand } from 'lucide-react';


export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onComplete,
  onReject,
  onTake,
  photoUrl
}) => {
  const { role } = useAuth();
  const { theme } = useTheme();
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Обработчик нажатия ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isPhotoExpanded) {
          setIsPhotoExpanded(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, isPhotoExpanded, onClose]);

  // Форматирование времени
  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    try {
      const date = new Date(timeString);
      const day = date.getDate();
      const month = date.toLocaleString('ru-RU', { month: 'long' });
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day} ${month} ${hours}:${minutes}`;
    } catch {
      return timeString;
    }
  };

  // Получение кнопок действий в зависимости от роли и статуса
  const getActionButtons = () => {
    const buttons: React.ReactNode[] = [];

    if (role === ModelRoleEnum.DRIVER) {
      // Для водителя
      if (order.order_status_name === ModelOrderStatusEnum.ACCEPT) {
        buttons.push(
          <button
            key="reject"
            className={styles.actionButton}
            style={{ backgroundColor: '#D10A00', color: 'white' }} 
            onClick={() => onReject(order.id || 0)}
          >
            Отклонить
          </button>
        );
        buttons.push(
          <button
            key="complete"
            className={styles.actionButton}
            style={{ backgroundColor: '#3049CE', color: 'white' }} 
            onClick={() => onComplete(order.id || 0)}
          >
            Завершить
          </button>
        );
      }

      if (order.order_status_name === ModelOrderStatusEnum.NEW) {
        buttons.push(
          <button
            key="take"
            className={styles.actionButton}
            style={{ backgroundColor: '#3049CE', color: 'white' }} 
            onClick={() => onTake(order.id || 0)}
          >
            Взять заказ
          </button>
        );
      }
    } else {
      // Для не водителя
      buttons.push(
        <button
          key="delete"
          className={styles.actionButton}
          style={{ backgroundColor: '#D10A00', color: 'white' }} 
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Удалить заказ
        </button>
      );
      buttons.push(
        <button
          key="edit"
          className={styles.actionButton}
          style={{ backgroundColor: '#3049CE', color: 'white' }}
          onClick={() => onEdit(order.id || 0, order)}
        >
          Редактировать
        </button>
      );
    }

    return buttons;
  };

  // Обработчик клика по фотографии
  const handlePhotoClick = () => {
    if (photoUrl) {
      setIsPhotoExpanded(!isPhotoExpanded);
    }
  };

  // Обработчик подтверждения удаления
  const handleDeleteConfirm = () => {
    onDelete(order.id || 0);
    setShowDeleteConfirmation(false);
    onClose();
  };

  // Обработчик отмены удаления
  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  // Если фотография развернута, показываем только её
  if (isPhotoExpanded && photoUrl) {
    return (
      <div className={styles.photoOverlay} onClick={handlePhotoClick}>
        <div className={styles.photoContainer}>
          <button 
            className={styles.closePhotoButton}
            onClick={handlePhotoClick}
            aria-label="Свернуть фотографию"
          >
            <X size={24} />
          </button>
          <img 
            src={photoUrl} 
            alt="Фотография груза" 
            className={styles.expandedPhoto}
          />
        </div>
      </div>
    );
  }

  const getTitelElement = () => {
    if (order.is_urgent) {
      return (
        <div className={styles.urgentIndicator} data-urgent={order.is_urgent}></div>
      );
    } else {
      return (
        <div></div>
      );
    }
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={undefined}
        titelElement={getTitelElement()}
        className={`${styles.orderDetailsModal} ${theme === 'dark' ? styles.dark : ''}`}
      >
        <div className={styles.modalContent}>



          {/* Название и Описание */}
          <div className={styles.descriptionSection}>
          <h2 className={styles.modalTitle}>{order.cargo_name || 'Название заказа'}</h2>
            <h4 className={styles.sectionTitle}>Описание:</h4>
            <p className={styles.descriptionText}>
              {order.cargo_description || 'Рыбный текст'}
            </p>
          </div>

          <div className={styles.contentGrid}>
            {/* Левая колонка - время и маршрут */}
            <div className={styles.leftColumn}>
              {/* Время */}
              <div className={styles.timeSection}>
                <div className={styles.timeBox}>
                  <Clock size={16} />
                  <span>{formatTime(order.time)}</span>
                </div>
              </div>

              {/* Маршрут */}
              <div className={styles.routeSection}>
                {/* Точка отправления */}
                <div className={styles.locationPoint}>
                  <div className={styles.locationIcon}></div>
                  <div className={styles.locationText}>
                    {order.depart_loc_name || ''}
                  </div>
                </div>
                <div className={styles.routeLine}></div>
                {/* Точка назначения */}
                <div className={styles.locationPoint}>
                  <div className={styles.locationIcon}></div>
                  <div className={styles.locationText}>
                    {order.goal_loc_name || ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Правая колонка - груз и контакты */}
            <div className={styles.rightColumn}>
              {/* Фотография груза */}
              <div className={styles.photoSection}>
                <div 
                  className={styles.photoPlaceholder}
                  onClick={handlePhotoClick}
                >
                  {photoUrl ? (
                    <>
                      <img 
                        src={photoUrl} 
                        alt="Фотография груза" 
                        className={styles.cargoPhoto}
                      />
                      <div className={styles.expandIcon}>
                        <Expand size={20} />
                      </div>
                    </>
                  ) : (
                    <span>Нет фото</span>
                  )}
                </div>
              </div>

              {/* Информация о грузе */}
              <div className={styles.cargoInfo}>
                <div className={styles.cargoDetail}>
                  <span className={styles.detailLabel}>Тип</span>
                  <span className={styles.detailValue}>
                    {order.cargo_type_name || ''}
                  </span>
                </div>
                <div className={styles.cargoDetail}>
                  <span className={styles.detailLabel}>Вес</span>
                  <span className={styles.detailValue}>
                    {`${order.cargo_weight} кг` }
                  </span>
                </div>
              </div>

              {/* Контакты */}
              <div className={styles.contactsSection}>
                <h4 className={styles.sectionTitle}>Контакты</h4>
                <div className={styles.contactInfo}>
                  <div className={styles.contactDetail}>
                    <span className={styles.detailValue}>{ role === ModelRoleEnum.DRIVER ?  order.dispatcher_name || '' : order.driver_name || ''}</span>
                  </div>
                  <div className={styles.contactDetail}>
                    <span className={styles.detailValue}>{'Заглушка'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className={styles.actionButtons}>
            {getActionButtons()}
          </div>
        </div>
      </Modal>

      {/* Модальное окно подтверждения удаления */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

    </>
  );
};
