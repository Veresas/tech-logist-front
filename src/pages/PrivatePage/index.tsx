//import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer'
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api';
import styles from "./PrivarePage.module.css"
import { useDropdownListInfoQuery } from '../../hooks/api/useReferency'
export const PrivatePage = () => {
    const [locationOptions, setLocationOptions] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds']>({});
    const [cargoTypeOptions, setCargoTypeOptions] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']>({});
    const { data } = useDropdownListInfoQuery();

    useEffect(() => {
        if (data) {
            setLocationOptions(data.dep_builds)
            setCargoTypeOptions(data.cargo_types)
        }
    }, [data]);
    return (
        <div className={styles.body}>
            <OrderListContainer 
            isPrivate={true} 
            locationOptions={locationOptions} 
            cargoTypeOptions={cargoTypeOptions} ></OrderListContainer>

        </div>
    )
}