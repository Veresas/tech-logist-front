import React, { useState, useEffect } from 'react';
import type { OrderDetailsModalProps } from './types';
import { ModelRoleEnum, ModelOrderStatusEnum } from '../../../api';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { Modal } from '../ModalComp/Modal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal';
import styles from './OrderDetailsModal.module.css';
import { X, Expand } from 'lucide-react';
import { ICON_FINAL_POINT, ICON_START_POINT, ICON_TIMER} from "../../../assets"
import { usePlatform } from '../../../utils/ContextHooks';

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
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isMobile } = usePlatform();

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

  // Форматирование времени (две строки: дата и время)
  const formatTimeParts = (timeString?: string) => {
    if (!timeString) return { datePart: '', timePart: '' };
    try {
      const date = new Date(timeString);
      const day = date.getDate();
      const month = date.toLocaleString('ru-RU', { month: 'long' });
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return { datePart: `${day} ${month}` , timePart: `${hours}:${minutes}` };
    } catch {
      return { datePart: timeString, timePart: '' };
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
            style={{ backgroundColor: '#D10A00', color: 'white', fontSize: '20px'}} 
            onClick={() => onReject(order.id || 0)}
          >
            Отклонить
          </button>
        );
        buttons.push(
          <button
            key="complete"
            className={styles.actionButton}
            style={{ backgroundColor: '#3049CE', color: 'white', fontSize: '20px' }} 
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
            style={{ backgroundColor: '#3049CE', color: 'white', fontSize: '20px' }} 
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
          style={{ backgroundColor: '#D10A00', color: 'white', fontSize: '20px' }} 
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Удалить заказ
        </button>
      );
      buttons.push(
        <button
          key="edit"
          className={styles.actionButton}
          style={{ backgroundColor: '#3049CE', color: 'white', fontSize: '20px' }}
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

  const time = (
    <div className={styles.timeSection}>
      <div className={styles.timeBox}>
        <img width={24} height={24} src={ICON_TIMER} alt="" />
        <div className={styles.timeBoxText}>
          <div>{formatTimeParts(order.time).datePart}</div>
          <div>{formatTimeParts(order.time).timePart}</div>
        </div>
      </div>
    </div>
  );

  const route = (
    <div className={styles.routeSection}>
      {/* Точка отправления */}
      <div className={styles.locationPoint}>
        <img width={22} height={22} src={ICON_START_POINT} />
        <div className={styles.locationText}>
          {order.depart_loc_name || ''}
        </div>
      </div>
      <div className={styles.routeLine}></div>
      {/* Точка назначения */}
      <div className={styles.locationPoint}>
        <img width={22} height={22} src={ICON_FINAL_POINT} />
        <div className={styles.locationText}>
          {order.goal_loc_name || ''}
        </div>
      </div>
    </div>
  )

  const photo = (
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
  )

  const cargoInfo = (
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
  )

  const mobileInfo = (
    <div className={styles.mobileInfo}>
      <div className={styles.mobileInfoLabels}>
        <span className={styles.detailLabel}>Тип</span>
        <span className={styles.detailLabel}>Вес</span>
        <span className={styles.detailLabel}>Контакты</span>
      </div>

      <div className={styles.mobileInfoValues}> 
        <span className={styles.detailValue}>
          {order.cargo_type_name || ''}
        </span>

        <span className={styles.detailValue}>
          {`${order.cargo_weight} кг` }
        </span>

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
  )

  const contact = (
    <div className={styles.contactsSection}>
      <span className={styles.detailLabel}>Контакты</span>
      <div className={styles.contactInfo}>
        <div className={styles.contactDetail}>
          <span className={styles.detailValue}>{ role === ModelRoleEnum.DRIVER ?  order.dispatcher_name || '' : order.driver_name || ''}</span>
        </div>
        <div className={styles.contactDetail}>
          <span className={styles.detailValue}>{'Заглушка'}</span>
        </div>
      </div>
    </div>
  )

  const name = (
    <h2 className={styles.modalTitle}>{order.cargo_name || 'Название заказа'}</h2>
  )
  
  const description = (
    <div>
      <span className={styles.descriptionText}>Описание: {order.cargo_description}</span>
    </div>
  )

  const desktop = (
    <div className={styles.modalContent}>
      {/* Название и Описание */}
      <div className={styles.descriptionSection}>
        {name}
        {description}
      </div>

      <div className={styles.contentGrid}>
        {/* Левая колонка - время и маршрут */}
        <div className={styles.leftColumn}>
          {/* Время */}
          {time}

          {/* Маршрут */}
          {route}
        </div>

        {/* Правая колонка - груз и контакты */}
        <div className={styles.rightColumn}>
          {/* Фотография груза */}
          {photo}
          <div className={styles.rightColumnText}>
            {/* Информация о грузе */}
            {cargoInfo}

            {/* Контакты */}
            {contact}
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className={styles.actionButtons}>
        {getActionButtons()}
      </div>
    </div>
  )

  const mobile = (
    <div className={styles.modalContent}>
      {/* Название и Описание */}
      <div className={styles.descriptionSection}>
        {name}
        {description}
      </div>

      <div className={styles.mobileContetnCrid}>
          {/* Время */}
          {time}
          {/* Маршрут */}
          {route}
          {/* Фотография груза */}
          {/* Информация о грузе */}
          {mobileInfo}
      </div>

      {photo}

      {/* Кнопки действий */}
      <div className={styles.actionButtons}>
        {getActionButtons()}
      </div>
    </div>
  )

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={undefined}
        titelElement={getTitelElement()}
        className={styles.orderDetailsModal}
      >
        {isMobile ? mobile : desktop}
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
