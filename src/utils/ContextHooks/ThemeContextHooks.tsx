import { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext"


export const useTheme = () => {
    // 8. Получаем данные из контекста
    const context = useContext(ThemeContext);
    
    // 9. Проверка, что хук используется внутри провайдера
    if (!context) {
      throw new Error('useTheme must be used within ThemeProvider');
    }
    
    // 10. Возвращаем данные из контекста
    return context;
  };