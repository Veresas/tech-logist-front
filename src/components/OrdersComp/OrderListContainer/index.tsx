import type {OrderListContainerProps} from "./type"
import { useState, useEffect, useCallback } from 'react'
import { useOrders, useOrderCardHandlers } from '../../../hooks'
import { OrderList } from "../../../components/OrdersComp"
import { OrderDetailsModal } from "../../Modals/OrderDetailsModal"
import type { ModelOrderOut, ModelOrderUpdate, ModelOrderCreate } from "../../../api"
import { OrderCreateForm } from "../../Modals/OrderCreateForm"

export const OrderListContainer = ({ isPrivate, ordersApi, locationOptions, cargoTypeOptions }: OrderListContainerProps) => {
    const { orders, isLoading, error } = useOrders(isPrivate)
    const { handleSendRequest } = useOrderCardHandlers()
    const [selectedOrder, setSelectedOrder] = useState<ModelOrderOut | null>(null)
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)
    const [orderForEdit, setOrderForEdit] = useState<ModelOrderCreate | null>(null)
    const [orderEditID, setOrderEditID] = useState<number | undefined>(undefined)

    const handleInfo = useCallback((order: ModelOrderOut) => {
        setSelectedOrder(order)
        setIsModalDetailsOpen(true)
    }, [])

    const handleGetPhoto = useCallback(async () => {
        if (selectedOrder?.photo_id) {
            try {
                const res = await ordersApi.ordersPhotoIdGet(selectedOrder.photo_id)
                setPhotoUrl(URL.createObjectURL(res.data))
            } catch (error) {
                console.error('Ошибка получения фотографии:', error)
                setPhotoUrl(null)
            }
        }
    }, [selectedOrder?.photo_id, ordersApi])

    const handleCloseModalDetails = useCallback(() => {
        setIsModalDetailsOpen(false)
        setOrderForEdit(null)
        setOrderEditID(undefined)
    }, [])

    const handleCloseModalEdit = useCallback(() => {
      setIsModalEditOpen(false)
      setSelectedOrder(null)
  }, [])

    const handleEdit = async (orderId: number) => {
      const res = await ordersApi.ordersUpdateIdGet(orderId)
      setOrderForEdit(res.data.order_for_update as ModelOrderCreate || null)
      setOrderEditID(orderId)
      setIsModalEditOpen(true)
    }

    const handleUpdateOrder = (orderId: number, order: ModelOrderUpdate) => {
      try {
        ordersApi.ordersIdPatch(orderId, order)
        handleCloseModalEdit()
        setIsModalEditOpen(false)
      } catch (error) {
        console.error('Ошибка обновления заказа:', error)
      }
    }

    const handleDelete = (orderId: number) => {
        // TODO: Реализовать удаление заказа
        console.log('Удаление заказа:', orderId)
    }

    const handleComplete = (orderId: number) => {
        // TODO: Реализовать завершение заказа
        console.log('Завершение заказа:', orderId)
        handleCloseModalDetails()
    }

    const handleReject = (orderId: number) => {
        // TODO: Реализовать отклонение заказа
        console.log('Отклонение заказа:', orderId)
        handleCloseModalDetails()
    }

    useEffect(() => {
      if (selectedOrder?.photo_id) {
        handleGetPhoto()
      } else {
        setPhotoUrl(null)
      }
    }, [selectedOrder])
    
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
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
            isOpen={isModalDetailsOpen}
            onClose={handleCloseModalDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onReject={handleReject}
            photoUrl={photoUrl}
          />
        )}

        {isModalEditOpen && orderForEdit && orderEditID && (
          <OrderCreateForm
            order={orderForEdit}
            orderID={orderEditID}
            locationOptions={locationOptions}
            cargoTypeOptions={cargoTypeOptions}
            onSubmitCreateOrder={undefined}
            onSubmitUpdateOrder={handleUpdateOrder}
            onClose={handleCloseModalEdit}
          />
        )}
      </>
    )
  }