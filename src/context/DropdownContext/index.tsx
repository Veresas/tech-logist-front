import { createContext, useState, type ReactNode, useEffect } from "react"
import type { RefCotextTypes } from "./types"
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api';
import { useDropdownListInfoQuery } from '../../hooks/api/useReferency';
const DropdownContext = createContext<RefCotextTypes | undefined>(undefined);

export { DropdownContext };

export const DropdownContextProvider = ({children} : {children: ReactNode}) => {
    const [locs, setLocs] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds']>({})
    const [cargoTypes, setCergoTypes] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']>({})


    const { data, refetch } = useDropdownListInfoQuery()

    useEffect(() => {
      if (data) {
        setLocs(data.dep_builds)
        setCergoTypes(data.cargo_types)
      }
    }, [data])

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