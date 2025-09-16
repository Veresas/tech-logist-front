import { createContext, useMemo, type ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { Platform, type PlatformContextType } from "./types"



const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export {PlatformContext}

export const PlatformContextProvider = ({ children }: { children: ReactNode }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isDesktop = !isMobile;

    const value = useMemo<PlatformContextType>(() => ({
        platform: isMobile ? Platform.MOBILE : Platform.DESKTOP,
        isMobile,
        isDesktop,
    }), [isMobile, isDesktop]);

    return (
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
}


