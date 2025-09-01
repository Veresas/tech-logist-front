import type { OrderCardProps } from './type';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { ModelRoleEnum, ModelOrderStatusEnum } from "../../../api";
import { OCActionList } from '../type';
import styles from '../../OrderCreateForm/OrderCreateForm.module.css';

export const OrderCard = ({ order, onClick, isPrivate, onEdit, onInfo }: OrderCardProps) => {
    const { role } = useAuth();

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


    // Определение кнопок в зависимости от условий
    const getActionButtons = () => {
        const buttons = [];

        // Кнопка "Подробнее" всегда показывается
        buttons.push(
            <button
                key="details"
                className={styles.cardButton}
                onClick={() => onInfo(order)}
            >
                Подробнее
            </button>
        );

        // Кнопка "Взять заказ" - только в публичном списке, статус новый, роль водитель
        if (!isPrivate && order.order_status_name === ModelOrderStatusEnum.NEW && role === ModelRoleEnum.DRIVER) {
            buttons.push(
                <button
                    key="take"
                    className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
                    onClick={() => onClick(order.id || 0, OCActionList.TAKE)}
                >
                    Взять заказ
                </button>
            );
        }

        // Кнопка "Редактировать" - только в приватном списке, не водитель, статус взят
        if (isPrivate && role !== ModelRoleEnum.DRIVER && order.order_status_name === ModelOrderStatusEnum.ACCEPT && onEdit) {
            buttons.push(
                <button
                    key="edit"
                    className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
                    onClick={() => onEdit(order.id || 0)}
                >
                    Редактировать
                </button>
            );
        }

        // Кнопки "Выполнить" и "Отклонить" - только в приватном списке, роль водитель, статус взят
        if (isPrivate && role === ModelRoleEnum.DRIVER && order.order_status_name === ModelOrderStatusEnum.ACCEPT) {
            buttons.push(
                <button
                    key="complete"
                    className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
                    onClick={() => onClick(order.id || 0, OCActionList.COMPLITE)}
                >
                    Выполнить
                </button>
            );
            buttons.push(
                <button
                    key="reject"
                    className={styles.cardButton}
                    onClick={() => onClick(order.id || 0, OCActionList.REJECT)}
                >
                    Отклонить
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className={styles.orderCard}>
            {/* Заголовок карточки */}
            <div className={styles.cardHeader}>
                <span className={styles.orderNumber}>№{order.id?.toString().padStart(4, '0') || '0000'}</span>
                {order.is_urgent && <div className={styles.urgentIndicator}></div>}
            </div>

            {/* Название заказа */}
            <h3 className={styles.orderTitle}>{order.cargo_name || 'Название заказа'}</h3>
            
            <div className={styles.cardSeparator}></div>

            {/* Детали заказа */}
            <div className={styles.orderDetails}>
                {/* Время */}
                <div className={styles.detailRow}>
                    <div className={styles.detailIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                    </div>
                    <span className={styles.detailText}>{formatTime(order.time)}</span>
                </div>

                {/* Маршрут */}
                <div className={styles.routeSection}>
                    {/* Точка отправления */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M12 1v6m0 6v6"/>
                                <path d="M1 12h6m6 0h6"/>
                            </svg>
                        </div>
                        <span className={styles.detailText}>{order.depart_loc_name || 'Точка отправления'}</span>
                    </div>

                    {/* Соединительная линия */}
                    <div className={styles.routeConnector}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m18 15-6-6-6 6"/>
                        </svg>
                    </div>

                    {/* Точка назначения */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <span className={styles.detailText}>{order.goal_loc_name || 'Точка назначения'}</span>
                    </div>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className={styles.cardSeparator}></div>
            <div className={styles.cardActions}>
                {getActionButtons()}
            </div>
        </div>
    );
};