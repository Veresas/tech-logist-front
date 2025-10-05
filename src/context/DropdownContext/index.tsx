import { createContext, useState, type ReactNode } from "react"
import type { RefCotextTypes } from "./types"
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api';
import { referencyApi } from '../../utils/ApiFactory';
const DropdownContext = createContext<RefCotextTypes | undefined>(undefined);

export { DropdownContext };

export const DropdownContextProvider = ({children} : {children: ReactNode}) => {
    const [locs, setLocs] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds']>({})
    const [cargoTypes, setCergoTypes] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']>({})


    const trigerReloadRefs = async () => {
        try {
          const res = await referencyApi.refDropdownListInfoGet();
          setLocs(res.data.dep_builds);
          setCergoTypes(res.data.cargo_types);
        } catch (error) {
          console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
        }
    };

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