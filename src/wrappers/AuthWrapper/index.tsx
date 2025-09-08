import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks'
import { useEffect } from 'react';
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
  
    return isAuthenticated ? <>
    <SidebarHeader />
    <Outlet /></> : <Navigate to="/login" replace />;
  };