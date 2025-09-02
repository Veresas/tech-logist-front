import type { OrderCardProps } from './type';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { useTheme } from '../../../utils/ContextHooks/ThemeContextHooks';
import { ModelRoleEnum, ModelOrderStatusEnum } from "../../../api";
import { OCActionList } from '../type';
import styles from './OrderCard.module.css';
import { Clock, MapPin, Target } from 'lucide-react';


export const OrderCard = ({ order, onClick, isPrivate, onInfo }: OrderCardProps) => {
    const { role } = useAuth();
    const { theme } = useTheme();

    // Форматирование времени
    const formatTime = (timeString?: string) => {
        if (!timeString) return '';
        try {
            const date = new Date(timeString);
            const day = date.getDate();
            const month = date.toLocaleString('ru-RU', { month: 'long' });
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${day} ${month} ${Number(hours) - 3}:${minutes}`;
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
        <div className={`${styles.orderCard} ${theme === 'dark' ? styles.dark : ''}`}>
            {/* Заголовок карточки */}
            <div className={styles.cardHeader}>
                <span className={styles.orderNumber}>№{order.id?.toString().padStart(4, '0') || '0000'}</span>
                <div 
                    className={styles.urgentIndicator} 
                    data-urgent={order.is_urgent}
                ></div>
            </div>

            {/* Название заказа */}
            <h3 className={styles.orderTitle}>{order.cargo_name || 'Название заказа'}</h3>
            
            <div className={styles.cardSeparator}></div>

            {/* Детали заказа */}
            <div className={styles.orderDetails}>
                {/* Время */}
                <div className={styles.detailRow}>
                    <div className={styles.detailIcon}>
                        <Clock size={16} />
                    </div>
                    <span className={styles.detailText}>{formatTime(order.time)}</span>
                </div>

                {/* Маршрут */}
                <div className={styles.routeSection}>
                    {/* Точка отправления */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <MapPin size={16} />
                        </div>
                        <span className={styles.detailText}>{order.depart_loc_name || 'Точка отправления'}</span>
                    </div>

                    {/* Соединительная линия */}
                    <div className={styles.routeConnector}>
                        <svg width="16" height="50" viewBox="0 0 16 50" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="2" x2="8" y2="38"/>
                            <polyline points="2,36 8,42 14,36"/>
                        </svg>
                    </div>

                    {/* Точка назначения */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <Target size={16} />
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