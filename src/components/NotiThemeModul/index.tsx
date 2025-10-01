import styles from "./NotiThemeModul.module.css"
import { ICON_PURPLE_THEME, ICON_DARK_THEME, ICON_DARK_NOTIFICATIONS, ICON_PURPLE_NOTIFICATIONS } from "../../assets"
import { useTheme } from "../../utils/ContextHooks"
export const NotiThemeModule = () => {
    const { isDarkMode, toggleTheme } = useTheme()

    const handelClickNoti = () => {

    }
    return (
        <div className={styles.NotiThemeContainer}>
            <div className={styles.IconWrapper} 
                role="button" 
                tabIndex={0}
                onClick={handelClickNoti}
            >
                <img src={isDarkMode ? ICON_DARK_NOTIFICATIONS : ICON_PURPLE_NOTIFICATIONS} alt="Уведомления"/>
            </div>

            <div className={styles.IconWrapper} 
                role="button" 
                tabIndex={0}
                onClick={toggleTheme}
            >
                <img src={isDarkMode ? ICON_DARK_THEME : ICON_PURPLE_THEME} alt="Световая схема"/>        
            </div>
            

        </div>
    )
}