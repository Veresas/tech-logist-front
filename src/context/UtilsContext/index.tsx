import { createContext, useState, type ReactNode } from "react";
import type { UtilsContextType } from "./types";

const UtilsContext = createContext<UtilsContextType | undefined>(undefined);

export { UtilsContext };

export const UtilsProvider = ({ children }: { children: ReactNode }) => {
    const [newOrderMarker, setNewOrderMarker] = useState(0);

    const triggerNewOrderMarker = () => {
        setNewOrderMarker(newOrderMarker + 1);
    }

    const value = {
        newOrderMarker,
        triggerNewOrderMarker
    }

    return (
        <UtilsContext.Provider value={value}>
            {children}
        </UtilsContext.Provider>
    )
}   