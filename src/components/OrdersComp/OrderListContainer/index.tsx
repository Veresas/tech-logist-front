import type {OrderListContainerProps} from "./type"
import { useState, useEffect, useCallback } from 'react'
import { useOrders, useOrderCardHandlers, useSearche} from '../../../hooks'
import { OrderList, OrderDetailsModal, OrderCreateForm, SortContainer, NotiThemeModule } from "../../../components"
import { useUtils } from "../../../utils/ContextHooks/UtilsContextHooks"
import { useAuth } from "../../../utils/ContextHooks/AuthContextHooks"
import { type ModelOrderOut, type ModelOrderUpdate, type ModelOrderCreate, ModelRoleEnum } from "../../../api"
import { useOrderDraft } from '../../../hooks/modalHooks/useOrderDraft';

import styles from './OrderListContainer.module.css'

export const OrderListContainer = ({ isPrivate, ordersApi, locationOptions, cargoTypeOptions }: OrderListContainerProps) => {
    const { orders, isLoading, error, fetchOrders } = useOrders(isPrivate)
    const { handleSendRequest } = useOrderCardHandlers()
    const [selectedOrder, setSelectedOrder] = useState<ModelOrderOut | null>(null)
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)
    const [orderForEdit, setOrderForEdit] = useState<ModelOrderCreate | null>(null)
    const [orderEditID, setOrderEditID] = useState<number | undefined>(undefined)
    const { newOrderMarker, triggerNewOrderMarker} = useUtils();
    const { role } = useAuth();
    const [firstRender, setFrirstRender] = useState<boolean>(false)
    const { clearDraft } = useOrderDraft();

    //Тригер обновления списка заказов с защитой от перовго рендера
    useEffect(() => {
      if (!firstRender){
        fetchOrders()
      } else {
        setFrirstRender(true)
      }
    }, [newOrderMarker])

    const { filteredOrders,
      today,
        isUrgent,
        departLoc,
        goalLoc,
        cargoType,
        setName,
        setIsUrgent,
        setToday,
        setDepartLoc,
        setGoalLoc,
        setCargoType, } = useSearche(orders)

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

    const handleOrderCreate = async (order: ModelOrderCreate, idempotencyKey: string) => {
      try {
          await ordersApi.ordersCreatePost(order, { headers: { 'Idempotency-Key': idempotencyKey } });
          setIsModalCreateOpen(false);
          triggerNewOrderMarker();
          clearDraft()
      } catch (error) {
          console.error('Ошибка создания заказа:', error);
          alert('Ошибка создания заказа. Попробуйте еще раз.');
      }
      setIsModalCreateOpen(false);
  }

    useEffect(() => {
      if (selectedOrder?.photo_id) {
        handleGetPhoto()
      } else {
        setPhotoUrl(null)
      }
    }, [selectedOrder])

    const handleCloseOrderModal = () => {
      setIsModalCreateOpen(false);
  }
    
    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    return (
      <div className={styles.orderListContainer}>
        <div className={styles.oLCHeaderWrapper}>
          <div className={styles.oLCHeader}>
            <SortContainer
              Today={today}
              Urgent={isUrgent}
              DepartLoc={departLoc}
              GoalLoc={goalLoc}
              CargoType={cargoType}
              setName={setName}
              setIsUrgent={setIsUrgent}
              setToday={setToday}
              setCargoType={setCargoType}
              setDepartLoc={setDepartLoc}
              setGoalLoc={setGoalLoc}
            />

            <div className={styles.orderCreateModalContainer}>
              { role !==  ModelRoleEnum.DRIVER &&
              <button
                className={styles.orderCreateModal}
                onClick={() => setIsModalCreateOpen(true)}
              >Создать заказ  +</button>}
            </div>
          </div>
          <NotiThemeModule/>
        </div>
        
        <div className={styles.scrollArea}>
          <OrderList
            orders={filteredOrders!}
            handleAction={handleSendRequest}
            isPrivate={isPrivate}
            handleInfo={handleInfo}
          />
        </div>
        
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

                {/* Модальное окно */}
        {isModalCreateOpen && (
            <OrderCreateForm 
                onSubmitCreateOrder={handleOrderCreate} 
                onSubmitUpdateOrder={undefined}
                onClose={handleCloseOrderModal} 
                order={undefined}
                orderID={undefined}
                locationOptions={locationOptions}
                cargoTypeOptions={cargoTypeOptions}
            />
        )}
      </div>
    )
  }