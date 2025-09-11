import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks'
import { useEffect } from 'react';
import styles from './AuthWrapper.module.css';
import { SidebarHeader } from '../../components';
export const AuthWrapper = () => {
    const { isAuthenticated, isLoading, verifyAuth } = useAuth();
    console.log('[AuthWrapper] triggered by path:', window.location.pathname);
    useEffect(() => {
        verifyAuth();
    }, [])
    if (isLoading) {
      return <div>Загрузка...</div>;
    }
  
    return isAuthenticated ? (
      <div className={styles.authWrapper}>
          <SidebarHeader />
          <div className={styles.mainContent}>
              <Outlet />
          </div>
      </div>
  ) : <Navigate to="/login" replace />;
  };