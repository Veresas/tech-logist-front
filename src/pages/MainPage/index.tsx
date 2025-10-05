
import { OrderListContainer} from '../../components/'
import { ordersApi } from '../../utils/ApiFactory';
import styles from './MainPage.module.css';
import { useDropdown } from "../../utils/ContextHooks/RefContextHook"
import { useEffect } from 'react';
export const MainPage = () => {
    const { locs, cargoTypes, trigerReloadRefs } = useDropdown()

    useEffect(() => {
        trigerReloadRefs()
    }, [])
    
    return (
        <div className={styles.body}>
            <OrderListContainer isPrivate={false} ordersApi={ordersApi} locationOptions={locs} cargoTypeOptions={cargoTypes} ></OrderListContainer>
        </div>
    )
}
