import { MobileMenu } from "../../components"
import styles from "./MobileMenuPage.module.css"
import { ICON_PURPLE_NOTIFICATIONS, ICON_PURPLE_THEME, ICON_BRAND_GLYPH } from '../../../public';
import { useNavigate } from "react-router-dom";
export const MobileMenuPage = () => {
    const navigate = useNavigate();
    const onBellClick = () => {
        
    }

    const onThemeClick = () => {

    }

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
                    <div className={styles.actionsHolder}>
                        <span aria-label="Уведомления" className={styles.circleBtn} onClick={onBellClick}>
                            <img src={ICON_PURPLE_NOTIFICATIONS} alt="" />
                        </span>
                        <span aria-label="Сменить тему" className={styles.circleBtn} onClick={onThemeClick}>
                            <img src={ICON_PURPLE_THEME} alt="" />
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.menuColumn}>
                <img className={styles.brand} src={ICON_BRAND_GLYPH} alt="Логотип" />
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
