import type {OrderListContainerProps} from "./type"
import { useState } from 'react'
import { useOrders, useOrderCardHandlers } from '../../../hooks'
import { OrderList } from "../../../components/OrdersComp"
import { OrderDetailsModal } from "../../Modals/OrderDetailsModal"
import type { ModelOrderOut } from "../../../api"


export const OrderListContainer = ({ isPrivate }: OrderListContainerProps) => {
    const { orders, isLoading, error } = useOrders(isPrivate)
    const { handleSendRequest } = useOrderCardHandlers()
    const [selectedOrder, setSelectedOrder] = useState<ModelOrderOut | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    const handleInfo = (order: ModelOrderOut) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedOrder(null)
    }

    const handleEdit = (orderId: number) => {
        // TODO: Реализовать редактирование заказа
        console.log('Редактирование заказа:', orderId)
        handleCloseModal()
    }

    const handleDelete = (orderId: number) => {
        // TODO: Реализовать удаление заказа
        console.log('Удаление заказа:', orderId)
    }

    const handleComplete = (orderId: number) => {
        // TODO: Реализовать завершение заказа
        console.log('Завершение заказа:', orderId)
        handleCloseModal()
    }

    const handleReject = (orderId: number) => {
        // TODO: Реализовать отклонение заказа
        console.log('Отклонение заказа:', orderId)
        handleCloseModal()
    }
    
    return (
      <>
        <OrderList
          orders={orders!}
          handleAction={handleSendRequest}
          isPrivate={isPrivate}
          handleInfo={handleInfo}
        />
        
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onReject={handleReject}
          />
        )}
      </>
    )
  }