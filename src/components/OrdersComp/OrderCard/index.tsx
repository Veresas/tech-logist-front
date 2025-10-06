import type { OrderCardProps } from './type';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { DtoRoleStatic, GithubComVeresusTlApiInternalClientsTlOrdersClientDtoOrderOutStatus as orderStatus } from "../../../api";
import styles from './OrderCard.module.css';
import { ICON_FINAL_POINT, ICON_START_POINT, ICON_TIMER} from "../../../assets"
import { usePlatform } from '../../../utils/ContextHooks';

export const OrderCard = ({ order, onClick, isPrivate, onInfo, isExpand }: OrderCardProps) => {
    const { role } = useAuth();
    const { isMobile } = usePlatform();
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
        if (!isPrivate && order.order_status_name === orderStatus.NEW && role === DtoRoleStatic.DRIVER) {
            buttons.push(
                <button
                    key="take"
                    className={`${styles.cardButton} ${styles.cardButtonPrimary}`}
                    onClick={() => onClick(order.id || 0, 'TAKE')}
                >
                    Взять заказ
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className={styles.orderCard} data-expand={isExpand}>
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
                        <img src={ICON_TIMER} alt="" />
                    </div>
                    <span className={styles.detailText}>{formatTime(order.time)}</span>
                </div>

                {/* Маршрут */}
                <div className={styles.routeSection}>
                    {/* Точка отправления */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <img src={ICON_START_POINT} />
                        </div>
                        <span className={styles.detailText}>{order.depart_loc_name || 'Точка отправления'}</span>
                    </div>

                    {/* Соединительная линия */}
                    <div className={styles.routeConnector}>
                        {!isMobile &&
                            <svg width="16" height="50" viewBox="0 0 16 50" fill="none" stroke="currentColor" strokeWidth="2">
                                <line color='#A8B5FB' x1="8" y1="2" x2="8" y2="38"/>
                                <polyline color='#A8B5FB' points="2,36 8,42 14,36"/>
                            </svg>}
                        
                        {isMobile &&
                            <svg width="50" height="16" viewBox="0 0 50 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <line color='#A8B5FB' x1="2" y1="8" x2="38" y2="8"/>
                                <polyline color='#A8B5FB' points="36,2 42,8 36,14"/>
                            </svg>
                        }
                    </div>

                    {/* Точка назначения */}
                    <div className={styles.detailRow}>
                        <div className={styles.detailIcon}>
                            <img src={ICON_FINAL_POINT} />
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