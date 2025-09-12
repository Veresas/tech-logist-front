import { useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContext';

export const useUtils = () => {
    const context = useContext(UtilsContext);
    
    if (context === undefined) {
      throw new Error('useUtils must be used within an UtilsProvider');
    }
    return context;
  };