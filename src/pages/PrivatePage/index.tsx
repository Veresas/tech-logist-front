//import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer'
import { ordersApi, referencyApi } from '../../utils/ApiFactory'
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api';
import styles from "./PrivarePage.module.css"
export const PrivatePage = () => {
    const [locationOptions, setLocationOptions] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds']>({});
    const [cargoTypeOptions, setCargoTypeOptions] = useState<GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']>({});
    
    const getDropDownListInfo = async () => {
        try {
          const res = await referencyApi.refDropdownListInfoGet();
          setLocationOptions(res.data.dep_builds);
          setCargoTypeOptions(res.data.cargo_types);
        } catch (error) {
          console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
        }
      };
    useEffect(() => {
        getDropDownListInfo();
    }, []);
    return (
        <div className={styles.body}>
            <OrderListContainer 
            isPrivate={true} 
            ordersApi={ordersApi} 
            locationOptions={locationOptions} 
            cargoTypeOptions={cargoTypeOptions} ></OrderListContainer>

        </div>
    )
}