import type {OrderListContainerProps} from "./type"

import { useOrders, useOrderCardHandlers } from '../../../hooks'
import { OrderList } from "../../../components/OrdersComp"
import type { ModelOrderOut } from "../../../api"


export const OrderListContainer = ({ isPrivate }: OrderListContainerProps) => {
    const { orders, isLoading, error } = useOrders(isPrivate)
    const { handleSendRequest, handleGetPhoto } = useOrderCardHandlers()
  
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    const handleInfo = (order: ModelOrderOut) => {
        console.log(order)
    }
    
    return (
      <OrderList
        orders={orders!}
        handleAction={handleSendRequest}
        handlePhoto={handleGetPhoto}
        isPrivate={isPrivate}
        handleInfo={handleInfo}
      />
    )
  }