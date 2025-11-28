
import { OrderListContainer} from '../../components/'
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
            <OrderListContainer isPrivate={false} locationOptions={locs} cargoTypeOptions={cargoTypes} ></OrderListContainer>
        </div>
    )
}
