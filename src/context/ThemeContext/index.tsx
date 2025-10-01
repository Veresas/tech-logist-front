import { createContext, useState, type ReactNode, useRef, useEffect } from 'react';
import type { Theme, ThemeContextType } from './types';
import { ThemeList } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeContextProvider = ({children} : {children: ReactNode}) => {

    const fallbackValue = ThemeList.LIGHT;
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

      // Функция для определения начальной темы
    const getInitialTheme = (): Theme => {
        // 1. Проверяем localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === ThemeList.DARK || savedTheme === ThemeList.LIGHT) {
            return savedTheme;
        }

        // 2. Если в localStorage нет, проверяем системное предпочтение
        // Проверяем, поддерживает ли браузер matchMedia
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return ThemeList.DARK; // Если система предпочитает темную тему
        }
        // 3. Если система предпочитает светлую или matchMedia не поддерживается, возвращаем светлую по умолчанию
        return fallbackValue;
    };

    const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

    // useRef для хранения экземпляра observer, чтобы иметь возможность отписаться
    const observerRef = useRef<MutationObserver | null>(null);

    // Функция для синхронизации атрибута html с состоянием
    const syncThemeToHtml = (themeValue: Theme) => {
        if (themeValue !== ThemeList.LIGHT && themeValue !== ThemeList.DARK) {
            console.warn(`Invalid theme value '${themeValue}', falling back to '${fallbackValue}.`);
            themeValue = fallbackValue;
            setTheme(themeValue);
            localStorage.setItem('theme', themeValue);
        }
        // Применяем значение к атрибуту html

        setIsDarkMode(themeValue === ThemeList.DARK) 
        document.documentElement.setAttribute('data-theme', themeValue);
    };

    // useEffect для инициализации и очистки observer
    useEffect(() => {

    syncThemeToHtml(theme);

    // 2. Создаем MutationObserver
    observerRef.current = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        // Проверяем, изменился ли атрибут data-theme
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            const newAttributeValue = document.documentElement.getAttribute('data-theme');

            // Если атрибут был удален, сбрасываем на LIGHT
            if (newAttributeValue === null) {
                console.warn(`data-theme attribute removed, falling back to ${fallbackValue}.`);
                setTheme(fallbackValue);
                localStorage.setItem('theme', fallbackValue);
                document.documentElement.setAttribute('data-theme', fallbackValue);
                return;
            }

            // Если новое значение не соответствует нашим допустимым темам
            if (newAttributeValue !== ThemeList.LIGHT && newAttributeValue !== ThemeList.DARK) {
                console.warn(`Invalid data-theme attribute value '${newAttributeValue}', falling back to state value '${theme}'.`);
                // Возвращаем атрибут к значению из текущего состояния
                document.documentElement.setAttribute('data-theme', theme);
                return;
            }

            // Если новое значение атрибута отличается от текущего состояния
            if (newAttributeValue !== theme) {
                // Обновляем состояние и localStorage
                setTheme(newAttributeValue as Theme);
                localStorage.setItem('theme', newAttributeValue);
            }
        }
      }
    });

    // Начинаем наблюдение за атрибутами элемента html
        observerRef.current.observe(document.documentElement, {
            attributes: true, // Наблюдаем за изменениями атрибутов
            attributeFilter: ['data-theme'] // Наблюдаем только за атрибутом 'data-theme'
        });

        // Функция очистки при размонтировании компонента
        return () => {
        if (observerRef.current) {
            observerRef.current.disconnect(); // Отписываемся от наблюдения
        }
        };
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === ThemeList.LIGHT ? ThemeList.DARK : ThemeList.LIGHT;
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    const setThemeFromContext = (newTheme: Theme) => {
        // Проверяем, является ли значение темы допустимым
        if (newTheme !== ThemeList.LIGHT && newTheme !== ThemeList.DARK) {
            console.warn(`Invalid theme value passed to setTheme: '${newTheme}', ignoring.`);
            return; // Или можно сделать fallback
        }
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };


    const value: ThemeContextType  = {
        theme,
        toggleTheme,
        setTheme: setThemeFromContext,
        isDarkMode,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

