import { createContext } from 'react';
import type { AuthContextType, AuthContextProps } from './type';
import { DtoRoleStatic } from '../../api';
import { useVerifyAuthQuery } from '../../hooks/api/useCheck';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const AuthProvider = ({children} : AuthContextProps) => {
    // true — чтобы сразу получить имя и роль
    const { data, isLoading, isError, refetch } = useVerifyAuthQuery(true);

    const isAuthenticated = !isLoading && !isError && Boolean(data?.role);
    const role = data?.role ?? DtoRoleStatic.DRIVER;
    const fullName = data?.name ?? "";

    const login = () => { /* при необходимости можно дернуть refetch */ };
    const logout = () => { /* при необходимости можно дернуть refetch/очистку */ };

    const verifyAuth = async (): Promise<void> => { await refetch(); };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, role, login, logout, verifyAuth, fullName }}>
            {children}
        </AuthContext.Provider>
    )
}


