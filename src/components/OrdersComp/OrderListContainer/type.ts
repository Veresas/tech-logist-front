import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse, OrdersApi } from "../../../api";

export interface OrderListContainerProps {
    isPrivate: boolean,
    ordersApi: OrdersApi,
    locationOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['dep_builds'],
    cargoTypeOptions: GithubComVeresusTlApiInternalModelDropDownListInfoResponse['cargo_types']
}