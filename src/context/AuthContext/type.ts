import type { ReactNode } from "react";
import { ModelRoleStatic } from "../../api"

export interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    role: ModelRoleStatic;
    login: () => void; // Функция для установки isAuthenticated в true после успешного входа
    logout: () => void; // Функция для сброса isAuthenticated в false после выхода
    verifyAuth: () => Promise<void>; // Функция для проверки аутентификации
}

export interface AuthContextProps {
    children: ReactNode;
}