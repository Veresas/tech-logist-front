
import { OrderListContainer} from '../../components/'
import { ordersApi } from '../../utils/ApiFactory';
import styles from './MainPage.module.css';
import { useRef } from "../../utils/ContextHooks/RefContextHook"
export const MainPage = () => {
    const { locs, cargoTypes } = useRef()

    return (
        <div className={styles.body}>
            <OrderListContainer isPrivate={false} ordersApi={ordersApi} locationOptions={locs} cargoTypeOptions={cargoTypes} ></OrderListContainer>


            </div>
    )
}
