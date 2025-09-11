
import type { SearchProp } from "./types"
import styles from "./SearchPlase.module.css"
import { ICON_SEARCH } from "../../../../public"
export const SearchPlace = ({ setName} : SearchProp) => {
    return (
        <div>
            <div className={styles.searchBox}>
                <div className={styles.searchIcon}>
                    <img src={ICON_SEARCH} alt=""></img>
                </div>
                <input 
                type="text" 
                placeholder="Поиск по заказам" 
                className={styles.searchInput}
                id="search-orders"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
        </div>
    )
}