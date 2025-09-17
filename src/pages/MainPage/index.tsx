//import React, { useEffect, useState } from 'react'
import { useEffect, useState } from 'react';
import { OrderListContainer} from '../../components/'
import type { ModelDropDownListInfoResponse } from '../../api';
import { ordersApi, referencyApi } from '../../utils/ApiFactory';
import styles from './MainPage.module.css';

export const MainPage = () => {
    const [locationOptions, setLocationOptions] = useState<ModelDropDownListInfoResponse['dep_builds']>({});
    const [cargoTypeOptions, setCargoTypeOptions] = useState<ModelDropDownListInfoResponse['cargo_types']>({});

    useEffect(() => {
        getDropDownListInfo();
    }, []);


    const getDropDownListInfo = async () => {
        try {
          const res = await referencyApi.refDropdownListInfoGet();
          setLocationOptions(res.data.dep_builds);
          setCargoTypeOptions(res.data.cargo_types);
        } catch (error) {
          console.error('Ошибка получения списка типов грузов и связей подразделений и зданий:', error);
        }
      };

    return (
        <div className={styles.body}>
            <OrderListContainer isPrivate={false} ordersApi={ordersApi} locationOptions={locationOptions} cargoTypeOptions={cargoTypeOptions} ></OrderListContainer>


            </div>
    )
}
