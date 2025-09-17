import { useContext } from "react"
import { RefContext } from "../../context/RefContext"

export const useRef = () => {
    const context = useContext(RefContext)

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    
    return context
}