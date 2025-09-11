import { identityApi } from "../../utils/ApiFactory"
import { useAuth } from '../../utils/ContextHooks/AuthContextHooks';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {

    const { logout } = useAuth()
    const navigate = useNavigate();

    const handelLogout = async () => {
        try {
            await identityApi.publicAuthLogoutPost()
            logout()
            navigate('/login'); 
        }
        catch (error) {
            console.error(error)
        }

    }
    return (
        <div>
            <button
                onClick={handelLogout}
            >
                выйти из аккаунта
            </button>
        </div>
    )
}