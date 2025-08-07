import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks'
import { useEffect } from 'react';

export const AuthWrapper = () => {
    const { isAuthenticated, isLoading, verifyAuth } = useAuth();
    console.log('[AuthWrapper] triggered by path:', window.location.pathname);
    useEffect(() => {
        verifyAuth();
    }, [])
    if (isLoading) {
      return <div>Загрузка...</div>;
    }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };