import { createContext, useState} from 'react';
import { checkApi } from '../../utils/ApiFactory';
import type { AuthContextType, AuthContextProps } from './type';
import { DtoRoleStatic } from '../../api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({children} : AuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [role, setRole] = useState<DtoRoleStatic>(DtoRoleStatic.DRIVER)
    const [fullName, setFullName] = useState<string>("");
    const verifyAuth = async () => {
        try {
            let isGetName = false;
            if (fullName === "") {
                isGetName = true;
            }
            const response = await checkApi.checkGet(isGetName);
            if (response.status === 200) { // Предполагаем, что 200 OK означает успешную проверку
                setIsAuthenticated(true);
                if (response.data.role) {
                    setRole(response.data.role)
                    if (response.data.name) {
                        setFullName(response.data.name)
                        isGetName = false;
                    }
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
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout, verifyAuth, fullName }}>
            {children}
        </AuthContext.Provider>
    )
}


