import { customAxiosInstance } from "../CustomAxios";
import { AuthApi, OrdersApi, UsersApi} from '../../api';

export const authApi = new AuthApi(undefined, undefined, customAxiosInstance)
export const ordersApi = new OrdersApi(undefined, undefined, customAxiosInstance)
export const usersApi = new UsersApi(undefined, undefined, customAxiosInstance)