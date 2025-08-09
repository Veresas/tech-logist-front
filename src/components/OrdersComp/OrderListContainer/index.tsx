import type {OrderListContainerProps} from "./type"
import { ordersApi } from '../../../utils/ApiFactory'
import { useOrders, useOrderCardHandlers } from '../../../hooks'
import { OrderList } from "../../../components/OrdersComp"


export const OrderListContainer = ({ isPrivate }: OrderListContainerProps) => {
    const fetchFn = () => isPrivate
    ? ordersApi.secureOrderActualPrivateGet()
    : ordersApi.secureOrderActualGet()
    const { orders, isLoading, error } = useOrders(fetchFn)
    const { handleSendRequest, handleGetPhoto } = useOrderCardHandlers()
  
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
  
    return (
      <OrderList
        orders={orders!}
        handleAction={handleSendRequest}
        handlePhoto={handleGetPhoto}
        isPrivate={isPrivate}
      />
    )
  }