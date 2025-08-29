import { customAxiosInstance } from "../CustomAxios";
import { IdentityApi, OrdersApi, CheckApi, ReferencyApi } from '../../api';

export const identityApi = new IdentityApi(undefined, undefined, customAxiosInstance)
export const ordersApi = new OrdersApi(undefined, undefined, customAxiosInstance)
export const checkApi = new CheckApi(undefined, undefined, customAxiosInstance)
export const referencyApi = new ReferencyApi(undefined, undefined, customAxiosInstance)