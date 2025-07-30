import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks'

export const AuthWrapper = () => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <div>Загрузка...</div>;
    }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };