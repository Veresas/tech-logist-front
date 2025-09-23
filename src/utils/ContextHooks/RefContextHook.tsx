import { useContext } from "react"
import { DropdownContext } from "../../context/DropdownContext"

export const useDropdown = () => {
    const context = useContext(DropdownContext)

    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    
    return context
}