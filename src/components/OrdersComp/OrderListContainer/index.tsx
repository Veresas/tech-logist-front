import type {OrderListContainerProps} from "./type"
import { useState, useEffect, useCallback } from 'react'
import { useOrders, useOrderCardHandlers } from '../../../hooks'
import { OrderList } from "../../../components/OrdersComp"
import { OrderDetailsModal } from "../../Modals/OrderDetailsModal"
import type { ModelOrderOut, ModelOrderUpdate, ModelOrderCreate } from "../../../api"
import { OrderCreateForm } from "../../Modals/OrderCreateForm"

export const OrderListContainer = ({ isPrivate, ordersApi, locationOptions, cargoTypeOptions }: OrderListContainerProps) => {
    const { orders, isLoading, error, fetchOrders } = useOrders(isPrivate)
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
                const res = await ordersApi.ordersPhotoIdGet(selectedOrder.photo_id, { responseType: 'blob' })
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

    const handleUpdateOrder = async (orderId: number, order: ModelOrderUpdate) => {
      try {
        await ordersApi.ordersIdPatch(orderId, order)
        fetchOrders()
        handleCloseModalEdit()
        setIsModalEditOpen(false)
      } catch (error) {
        console.error('Ошибка обновления заказа:', error)
      }
    }

    const handleTake = async (orderId: number) => {
      try {
        await ordersApi.ordersIdAcceptPatch(orderId)
        fetchOrders()
        handleCloseModalDetails()
        setIsModalDetailsOpen(false)
      } catch (error) {
        console.error('Ошибка взятия заказа:', error)
      }
    }

    const handleDelete = async (orderId: number) => {
        try {
            await ordersApi.ordersIdCancelPatch(orderId)
            fetchOrders()
            handleCloseModalDetails()
            setIsModalDetailsOpen(false)
        } catch (error) {
            console.error('Ошибка удаления заказа:', error)
        }
    }

    const handleComplete = async (orderId: number) => {
        try {
            await ordersApi.ordersIdCompletePatch(orderId)
            fetchOrders()
            handleCloseModalDetails()
            setIsModalDetailsOpen(false)
        } catch (error) {
            console.error('Ошибка завершения заказа:', error)
        }
    }

    const handleReject = async (orderId: number) => {
        try {
            await ordersApi.ordersIdRejectPatch(orderId)
            fetchOrders()
            handleCloseModalDetails()
            setIsModalDetailsOpen(false)
        } catch (error) {
            console.error('Ошибка отклонения заказа:', error)
        }
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
            onTake={handleTake}
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