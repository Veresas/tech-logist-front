import type {OrderListContainerProps} from "./type"
import { useCallback } from 'react'
import { useOrders, useOrderCardHandlers, useSearche, useOrderModals, useOrderActions, useOrderPhoto, useOrderListState } from '../../../hooks'
import { OrderList, OrderDetailsModal, OrderCreateForm, SortContainer, NotiThemeModule } from "../../../components"
import { useUtils, useAuth , usePlatform} from "../../../utils/ContextHooks"
import { type GithubComVeresusTlApiInternalModelOrderOut, type DtoOrderUpdate, type DtoOrderCreate, DtoRoleStatic } from "../../../api"
import { useOrderDraft } from '../../../hooks/modalHooks/useOrderDraft';

import styles from './OrderListContainer.module.css'

export const OrderListContainer = ({ isPrivate, ordersApi, locationOptions, cargoTypeOptions }: OrderListContainerProps) => {
    // Основные хуки для работы с заказами
    const { orders, isLoading, error, fetchOrders } = useOrders(isPrivate)
    const { handleSendRequest } = useOrderCardHandlers()
    
    // Менеджеры для управления состоянием
    const modals = useOrderModals()
    const actions = useOrderActions(ordersApi, fetchOrders)
    const photo = useOrderPhoto(modals.selectedOrder, ordersApi)
    
    // Контекстные хуки
    const { newOrderMarker, triggerNewOrderMarker} = useUtils();
    useOrderListState(newOrderMarker, fetchOrders)
    const { role } = useAuth();
    const { isDesktop } = usePlatform();
    const { clearDraft } = useOrderDraft();

    // Фильтрация и поиск заказов
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

    // Обработчики для модальных окон
    const handleInfo = useCallback((order: GithubComVeresusTlApiInternalModelOrderOut) => {
        modals.openDetailsModal(order)
    }, [modals])

    const handleEdit = useCallback(async (orderId: number) => {
        try {
            const orderForEdit = await actions.handleGetOrderForEdit(orderId)
            modals.openEditModal(orderForEdit, orderId)
        } catch (error) {
            console.error('Ошибка получения данных для редактирования:', error)
        }
    }, [actions, modals])

    const handleUpdateOrder = useCallback(async (orderId: number, order: DtoOrderUpdate) => {
        try {
            await actions.handleUpdateOrder(orderId, order)
            modals.closeEditModal()
        } catch (error) {
            console.error('Ошибка обновления заказа:', error)
        }
    }, [actions, modals])

    const handleTake = useCallback(async (orderId: number) => {
        try {
            await actions.handleTakeOrder(orderId)
            modals.closeDetailsModal()
        } catch (error) {
            console.error('Ошибка взятия заказа:', error)
        }
    }, [actions, modals])

    const handleDelete = useCallback(async (orderId: number) => {
        try {
            await actions.handleDeleteOrder(orderId)
            modals.closeDetailsModal()
        } catch (error) {
            console.error('Ошибка удаления заказа:', error)
        }
    }, [actions, modals])

    const handleComplete = useCallback(async (orderId: number) => {
        try {
            await actions.handleCompleteOrder(orderId)
            modals.closeDetailsModal()
        } catch (error) {
            console.error('Ошибка завершения заказа:', error)
        }
    }, [actions, modals])

    const handleReject = useCallback(async (orderId: number) => {
        try {
            await actions.handleRejectOrder(orderId)
            modals.closeDetailsModal()
        } catch (error) {
            console.error('Ошибка отклонения заказа:', error)
        }
    }, [actions, modals])

    const handleOrderCreate = useCallback(async (order: DtoOrderCreate, idempotencyKey: string) => {
        try {
            await actions.handleCreateOrder(order, idempotencyKey)
            modals.closeCreateModal()
            triggerNewOrderMarker()
            clearDraft()
        } catch (error) {
            console.error('Ошибка создания заказа:', error)
            alert('Ошибка создания заказа. Попробуйте еще раз.')
        }
    }, [actions, modals, triggerNewOrderMarker, clearDraft])

    const handleCloseOrderModal = useCallback(() => {
        modals.closeCreateModal()
    }, [modals])
    
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
              { role !==  DtoRoleStatic.DRIVER &&
              <button
                className={styles.orderCreateModal}
                onClick={modals.openCreateModal}
              >Создать заказ  +</button>}
            </div>
          </div>
          {isDesktop &&  <NotiThemeModule/>}
        </div>
        
        <div className={styles.scrollArea}>
          <OrderList
            orders={filteredOrders!}
            handleAction={handleSendRequest}
            isPrivate={isPrivate}
            handleInfo={handleInfo}
          />
        </div>
        
        {modals.selectedOrder && (
          <OrderDetailsModal
            order={modals.selectedOrder}
            isOpen={modals.isModalDetailsOpen}
            onClose={modals.closeDetailsModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onReject={handleReject}
            onTake={handleTake}
            photoUrl={photo.photoUrl}
          />
        )}

        {modals.isModalEditOpen && modals.orderForEdit && modals.orderEditID && (
          <OrderCreateForm
            order={modals.orderForEdit}
            orderID={modals.orderEditID}
            locationOptions={locationOptions}
            cargoTypeOptions={cargoTypeOptions}
            onSubmitCreateOrder={undefined}
            onSubmitUpdateOrder={handleUpdateOrder}
            onClose={modals.closeEditModal}
          />
        )}

        {modals.isModalCreateOpen && (
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