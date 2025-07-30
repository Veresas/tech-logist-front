import React, { createContext, useState, useEffect} from 'react';
import { checksApi } from '../../utils/ApiFactory';
import type { AuthContextType, AuthContextProps } from './type';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({children} : AuthContextProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect (() => {
        const verifyAuth = async () => {
            try {
                const response = await checksApi.secureCheckGet();
                if (response.status === 200) { // Предполагаем, что 200 OK означает успешную проверку
                    setIsAuthenticated(true);
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

        verifyAuth()
    })

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


