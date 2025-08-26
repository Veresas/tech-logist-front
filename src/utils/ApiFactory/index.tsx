import { customAxiosInstance } from "../CustomAxios";
import { IdentityApi, OrdersApi, CheckApi } from '../../api';

export const identityApi = new IdentityApi(undefined, undefined, customAxiosInstance)
export const ordersApi = new OrdersApi(undefined, undefined, customAxiosInstance)
export const checkApi = new CheckApi(undefined, undefined, customAxiosInstance)