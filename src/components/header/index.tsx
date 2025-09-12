import React from "react";
import styles from "./header.module.css";
import {
  ICON_USER_PROFILE,
  ICON_ALL_ORDERS,
  ICON_MY_ORDERS,
  ICON_MAP,
  ICON_STATISTICS,
  ICON_SETTINGS,
  ICON_SUPPORT,
  ICON_BRAND_GLYPH,
} from "../../../public";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/ContextHooks/AuthContextHooks";

type SidebarHeaderProps = {
  fullName?: string;
  onProfileClick?: () => void;
  onAllOrdersClick?: () => void;
  onMyOrdersClick?: () => void;
  onMapClick?: () => void;
  onStatsClick?: () => void;
  onSettingsClick?: () => void;
  onSupportClick?: () => void;
};

export const SidebarHeader: React.FC<SidebarHeaderProps> = () => {
  const { fullName } = useAuth();
  const location = useLocation();

  const isActive = (paths: string | string[]) => {
    const pathList = Array.isArray(paths) ? paths : [paths];
    const current = location.pathname;
    return pathList.some((p) => current === p || current.startsWith(p));
  };

  const handleKeyDown = (action?: () => void) => (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (action) action();
    }
  };

  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate('/s/cabinet');
  }

  const onAllOrdersClick = () => {
    navigate('/s/main');
  }

  const onMyOrdersClick = () => {
    navigate('/s/private_order');
  }
  
  const onMapClick = () => {
    alert('Карта не доступна');
    //navigate('/s/map');
  }
  
  const onStatsClick = () => {
    alert('Статистика не доступна');
    //navigate('/s/statistics');
  }

  const onSettingsClick = () => {
    alert('Настройки не доступны');
    //navigate('/s/settings');
  }

  const onSupportClick = () => {
    alert('Поддержка не доступна');
    //navigate('/s/support');
  }

  const displayedNameParts = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2);

  return (
    <aside className={styles.container} aria-label="Боковое меню">
      <div
        className={styles.profileCard}
        role="button"
        tabIndex={0}
        aria-label="Личный кабинет"
        onClick={onProfileClick}
        onKeyDown={handleKeyDown(onProfileClick)}
      >
        <div className={styles.profileAvatar} aria-hidden>
          <img src={ICON_USER_PROFILE} alt="" width={24} height={24} />
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.profileName}>
            {displayedNameParts.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </div>
          <div className={styles.profileLink}>
            <span>Личный кабинет</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Основное меню">
        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/main') ? styles.navItemActive : ''}`}
          onClick={onAllOrdersClick}
          onKeyDown={handleKeyDown(onAllOrdersClick)}
          aria-label="Все заказы"
        >
          <img src={ICON_ALL_ORDERS} alt="" width={24} height={24} />
          <span>Все заказы</span>
        </button>

        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/private_order') ? styles.navItemActive : ''}`}
          onClick={onMyOrdersClick}
          onKeyDown={handleKeyDown(onMyOrdersClick)}
          aria-label="Мои заказы"
        >
          <img src={ICON_MY_ORDERS} alt="" width={24} height={24} />
          <span>Мои заказы</span>
        </button>

        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/map') ? styles.navItemActive : ''}`}
          onClick={onMapClick}
          onKeyDown={handleKeyDown(onMapClick)}
          aria-label="Карта"
        >
          <img src={ICON_MAP} alt="" width={24} height={24} />
          <span>Карта</span>
        </button>

        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/statistics') ? styles.navItemActive : ''}`}
          onClick={onStatsClick}
          onKeyDown={handleKeyDown(onStatsClick)}
          aria-label="Моя статистика"
        >
          <img src={ICON_STATISTICS} alt="" width={24} height={24} />
          <span>Моя статистика</span>
        </button>

        <hr className={styles.divider} />

        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/settings') ? styles.navItemActive : ''}`}
          onClick={onSettingsClick}
          onKeyDown={handleKeyDown(onSettingsClick)}
          aria-label="Настройки"
        >
          <img src={ICON_SETTINGS} alt="" width={24} height={24} />
          <span>Настройки</span>
        </button>

        <button
          type="button"
          className={`${styles.navItem} ${isActive('/s/support') ? styles.navItemActive : ''}`}
          onClick={onSupportClick}
          onKeyDown={handleKeyDown(onSupportClick)}
          aria-label="Поддержка"
        >
          <img src={ICON_SUPPORT} alt="" width={24} height={24} />
          <span>Поддержка</span>
        </button>
      </nav>

      <div className={styles.brandMark} aria-hidden>
        <span className={styles.brandGlyph}>
          <img src={ICON_BRAND_GLYPH} alt="" width={24} height={24} />
        </span>
      </div>
    </aside>
  );
};