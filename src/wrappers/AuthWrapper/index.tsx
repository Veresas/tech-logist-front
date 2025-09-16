import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks'
import { useEffect } from 'react';
import styles from './AuthWrapper.module.css';
import { SidebarHeader, MobileBottomNav } from '../../components';
import { usePlatform } from '../../utils/ContextHooks';

export const AuthWrapper = () => {
    const { isAuthenticated, isLoading, verifyAuth } = useAuth();
    const { isMobile } = usePlatform();
    console.log('[AuthWrapper] triggered by path:', window.location.pathname);
    useEffect(() => {
        verifyAuth();
    }, [])
    if (isLoading) {
      return <div>Загрузка...</div>;
    }
  
    return isAuthenticated ? (
      <div className={styles.authWrapper}>
          {!isMobile && <SidebarHeader />}
          <div className={styles.mainContent}>
              <Outlet />
          </div>
          {isMobile && <MobileBottomNav />}
      </div>
  ) : <Navigate to="/login" replace />;
  };