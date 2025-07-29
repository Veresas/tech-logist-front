import { createContext, useState, type ReactNode } from 'react';
import type { Theme, ThemeContextType } from './types';
import { ThemeList } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeContextProvider = ({children} : {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedThem = localStorage.getItem("theme")
        return savedThem === ThemeList.DARK || savedThem === ThemeList.LIGHT ? savedThem : ThemeList.LIGHT
    })

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === ThemeList.LIGHT ? ThemeList.DARK : ThemeList.LIGHT
            localStorage.setItem('theme', newTheme)
            return newTheme
        })
    }

    const value = {
        theme,
        toggleTheme,
        setTheme: (newTheme: Theme) => {  // функция установки
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

