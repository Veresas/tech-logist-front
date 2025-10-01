import { useContext } from "react"
import { DropdownContext } from "../../context/DropdownContext"

export const useDropdown = () => {
    const context = useContext(DropdownContext)

    if (!context) {
        throw new Error('useDropdown must be used within DropdownProvider');
    }
    
    return context
}