import type { ModelDropDownListInfoResponse, OrdersApi } from "../../../api";

export interface OrderListContainerProps {
    isPrivate: boolean,
    ordersApi: OrdersApi,
    locationOptions: ModelDropDownListInfoResponse['dep_builds'],
    cargoTypeOptions: ModelDropDownListInfoResponse['cargo_types']
}