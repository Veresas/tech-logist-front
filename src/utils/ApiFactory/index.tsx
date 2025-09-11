import { customAxiosInstance } from "../CustomAxios";
import { IdentityApi, OrdersApi, CheckApi, ReferencyApi, Configuration } from '../../api';

const runtimeBase = `${window.location.protocol}//${window.location.host}/api`;
const cfg = new Configuration({ basePath: runtimeBase });

export const identityApi = new IdentityApi(cfg, undefined, customAxiosInstance);
export const ordersApi = new OrdersApi(cfg, undefined, customAxiosInstance);
export const checkApi = new CheckApi(cfg, undefined, customAxiosInstance);
export const referencyApi = new ReferencyApi(cfg, undefined, customAxiosInstance);