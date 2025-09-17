import React from 'react';
import styles from './mobileBottomNav.module.css';
import { useNavigate } from 'react-router-dom';
import { ICON_ALL_ORDERS, ICON_MY_ORDERS, ICON_MAP, ICON_MENU } from '../../../public';

// Нижняя панель навигации для мобильной платформы (фиксированная, высота 55px)
// Комментарии и логи — на русском языке
export const MobileBottomNav: React.FC = () => {
    const navigate = useNavigate();

    const handleAllOrdersClick = () => {
        navigate('/s/main');
    };

    const handleMyOrdersClick = () => {
        navigate('/s/private_order');
    };

    const handleMapClick = () => {
        alert('Карта не доступна');
        // navigate('/s/map');
    };

    const handleMenuClick = () => {
        navigate('/s/menu');
    };

    const handleKeyDown = (action?: () => void) => (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (action) action();
        }
    };

    return (
        <nav className={styles.container} aria-label="Нижняя навигация">
            <button
                type="button"
                className={styles.item}
                onClick={handleAllOrdersClick}
                onKeyDown={handleKeyDown(handleAllOrdersClick)}
                aria-label="Все заказы"
            >
                <img src={ICON_ALL_ORDERS} alt="" width={24} height={24} aria-hidden />
                <span className={styles.label}>Все заказы</span>
            </button>

            <button
                type="button"
                className={styles.item}
                onClick={handleMyOrdersClick}
                onKeyDown={handleKeyDown(handleMyOrdersClick)}
                aria-label="Мои заказы"
            >
                <img src={ICON_MY_ORDERS} alt="" width={24} height={24} aria-hidden />
                <span className={styles.label}>Мои заказы</span>
            </button>

            <button
                type="button"
                className={styles.item}
                onClick={handleMapClick}
                onKeyDown={handleKeyDown(handleMapClick)}
                aria-label="Карта"
            >
                <img src={ICON_MAP} alt="" width={24} height={24} aria-hidden />
                <span className={styles.label}>Карта</span>
            </button>

            <button
                type="button"
                className={styles.item}
                onClick={handleMenuClick}
                onKeyDown={handleKeyDown(handleMenuClick)}
                aria-label="Меню"
            >
                {/* Заглушка без иконки */}
                <img src={ICON_MENU} alt="" width={34} height={34} aria-hidden />
            </button>
        </nav>
    );
};


