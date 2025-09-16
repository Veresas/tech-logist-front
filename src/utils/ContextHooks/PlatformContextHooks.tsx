import { useContext } from 'react';
import { PlatformContext } from '../../context/platform';

export const usePlatform = () => {
    const context = useContext(PlatformContext);
    if (context === undefined) {
        throw new Error('usePlatform должен использоваться внутри PlatformContextProvider');
    }
    return context;
}


