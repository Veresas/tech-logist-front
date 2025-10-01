import styles from './mobileMenu.module.css';
import { ICON_PURPLE_ALL_ORDERS, ICON_PURPLE_MY_ORDERS, ICON_PURPLE_MAP, ICON_PURPLE_STATISTICS, ICON_PURPLE_PROFILE, ICON_PURPLE_SETTINGS, ICON_PURPLE_SUPPORT } from '../../assets';

export interface MobileMenuProps {
    onAllOrdersClick?: () => void;
    onMyOrdersClick?: () => void;
    onMapClick?: () => void;
    onStatsClick?: () => void;
    onProfileClick?: () => void;
    onSettingsClick?: () => void;
    onSupportClick?: () => void;
}

export const MobileMenu = ({
    onAllOrdersClick,
    onMyOrdersClick,
    onMapClick,
    onStatsClick,
    onProfileClick,
    onSettingsClick,
    onSupportClick,
}: MobileMenuProps) => {
    return (
        <div className={styles.container}>

            <nav className={styles.menuList}>
                <MenuItem icon={ICON_PURPLE_ALL_ORDERS} text="Все заказы" onClick={onAllOrdersClick} />
                <MenuItem icon={ICON_PURPLE_MY_ORDERS} text="Мои заказы" onClick={onMyOrdersClick} />
                <MenuItem icon={ICON_PURPLE_MAP} text="Карта" onClick={onMapClick} />
                <MenuItem icon={ICON_PURPLE_STATISTICS} text="Моя статистика" onClick={onStatsClick} />
                <MenuItem icon={ICON_PURPLE_PROFILE} text="Личный кабинет" onClick={onProfileClick} divider />
                <MenuItem icon={ICON_PURPLE_SETTINGS} text="Настройки" onClick={onSettingsClick} />
                <MenuItem icon={ICON_PURPLE_SUPPORT} text="Поддержка" onClick={onSupportClick} />
            </nav>


        </div>
    );
};

interface MenuItemProps {
    icon: string;
    text: string;
    onClick?: () => void;
    divider?: boolean;
}

const MenuItem = ({ icon, text, onClick, divider }: MenuItemProps) => {
    return (
        <>
            <button className={styles.menuItem} onClick={onClick} aria-label={text}>
                <img className={styles.icon} src={icon} alt="" />
                <span className={styles.itemText}>{text}</span>
            </button>
            {divider && <div className={styles.divider} />}
        </>
    );
};
