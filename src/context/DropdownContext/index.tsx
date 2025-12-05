import { createContext, useState, type ReactNode, useEffect } from "react"
import type { RefCotextTypes } from "./types"
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api/main';
import { useDropdownListInfoQuery } from '../../hooks/api/useReference';
import { useAuth } from "../../utils/ContextHooks"; 
const DropdownContext = createContext<RefCotextTypes | undefined>(undefined);

export { DropdownContext };

export const DropdownContextProvider = ({children} : {children: ReactNode}) => {
    const [locs, setLocs] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds']>({})
    const [cargoTypes, setCergoTypes] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']>({})
    const { isAuthenticated } = useAuth();

    
    const { data, refetch } = useDropdownListInfoQuery({
        enabled: isAuthenticated,
    })

    useEffect(() => {
      if (data) {
        setLocs(data.dep_builds)
        setCergoTypes(data.cargo_types)
      }
    }, [data])

    // Убрать refetch из зависимостей - он стабилен
    useEffect(() => {
        if (isAuthenticated) {
            refetch();
        }
        console.log("isAuthenticated = ", isAuthenticated, "Делаем refetch")
    }, [isAuthenticated])

    const trigerReloadRefs = async () => { await refetch() };

    const value = {
        locs,
        cargoTypes,
        trigerReloadRefs
    }

    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    )
}