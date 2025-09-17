import { createContext, useEffect, useState, type ReactNode } from "react"
import type { RefCotextTypes } from "./types"
import type { ModelDropDownListInfoResponse } from '../../api';
import { referencyApi } from '../../utils/ApiFactory';
const RefContext = createContext<RefCotextTypes | undefined>(undefined);

export { RefContext };

export const RefContextProvider = ({children} : {children: ReactNode}) => {
    const [locs, setLocs] = useState<ModelDropDownListInfoResponse['dep_builds']>({})
    const [cargoTypes, setCergoTypes] = useState<ModelDropDownListInfoResponse['cargo_types']>({})


    const trigerReloadRefs = async () => {
        try {
          const res = await referencyApi.refDropdownListInfoGet();
          setLocs(res.data.dep_builds);
          setCergoTypes(res.data.cargo_types);
        } catch (error) {
          console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
        }
    };

    useEffect(() => {
        trigerReloadRefs()
    }, [])

    const value = {
        locs,
        cargoTypes,
        trigerReloadRefs
    }

    return (
        <RefContext.Provider value={value}>
            {children}
        </RefContext.Provider>
    )
}