import { MobileMenu, NotiThemeModule } from "../../components"
import styles from "./MobileMenuPage.module.css"
import { BIG_LOGO_COLOR, BIG_LOGO_WHITE } from '../../assets';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/ContextHooks";

export const MobileMenuPage = () => {
    const navigate = useNavigate();
    const {isDarkMode} = useTheme();

    const onAllOrdersClick = () => {
        navigate("/s/main")
    }

    const onMyOrdersClick = () => {
        navigate("/s/private_order")
    }

    const onProfileClick = () => {
        navigate("/s/cabinet")
    }

    return (
        <div className={styles.body}>
            <div className={styles.headerRow}>
                
                <div className={styles.headerActions}>
                    <NotiThemeModule/>
                </div>
            </div>
            <div className={styles.menuColumn}>
                
                <img className={styles.brand} src={isDarkMode ? BIG_LOGO_WHITE : BIG_LOGO_COLOR} alt="Логотип" />
                <MobileMenu
                onAllOrdersClick={onAllOrdersClick}
                onMyOrdersClick={onMyOrdersClick}
                onProfileClick={onProfileClick}
                >

                </MobileMenu>
            </div>
            


        </div>
    )
}
