import { createContext, useState} from 'react';
import { checksApi } from '../../utils/ApiFactory';
import type { AuthContextType, AuthContextProps } from './type';
import { ModelRoleStatic } from '../../api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({children} : AuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [role, setRole] = useState<ModelRoleStatic>(ModelRoleStatic.DISP)
    
    const verifyAuth = async () => {
        try {
            console.log('[AuthProvider] Verifying authentication');
            const response = await checksApi.secureCheckGet();
            if (response.status === 200) { // Предполагаем, что 200 OK означает успешную проверку
                setIsAuthenticated(true);
                if (response.data.role) {
                    setRole(response.data.role)
                }
                else {
                    throw new Error("не удалось получить роль пользователя");
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Провал проверки аутентификации:', error);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout, verifyAuth }}>
            {children}
        </AuthContext.Provider>
    )
}


