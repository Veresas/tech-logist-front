import type {OrderListContainerProps} from "./type"
import { useCallback, useMemo, useState } from 'react'
import { useOrders, useOrderCardHandlers, useSearche, useOrderModals, useOrderActions, useOrderPhoto, useOrderListState } from '../../../hooks'
import { OrderList, OrderDetailsModal, OrderCreateForm, SortContainer, NotiThemeModule } from "../../../components"
import { useUtils, useAuth , usePlatform} from "../../../utils/ContextHooks"
import { type GithubComVeresusTlApiInternalModelOrderOut, type DtoOrderUpdate, type DtoOrderCreate, DtoRoleStatic, GithubComVeresusTlApiInternalClientsTlOrdersClientDtoOrderOutStatus as OrderStatus } from "../../../api"
import { useOrderDraft } from '../../../hooks/modalHooks/useOrderDraft';

import styles from './OrderListContainer.module.css'

export const OrderListContainer = ({ isPrivate, ordersApi, locationOptions, cargoTypeOptions }: OrderListContainerProps) => {
    // Основные хуки для работы с заказами
    const { orders, privateOrders, isLoading, error, fetchOrders } = useOrders(isPrivate)
    const { handleSendRequest } = useOrderCardHandlers()
    
    // Менеджеры для управления состоянием
    const modals = useOrderModals()
    const actions = useOrderActions(ordersApi, fetchOrders)
    const photo = useOrderPhoto(modals.selectedOrder)
    
    // Контекстные хуки
    const { newOrderMarker, triggerNewOrderMarker} = useUtils();
    useOrderListState(newOrderMarker, fetchOrders)
    const { role } = useAuth();
    const { isDesktop } = usePlatform();
    const { clearDraft } = useOrderDraft();

    // Фильтрация и поиск заказов (используем общий список; группировка по статусам ниже)
    const { filteredOrders,
      name,
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

    // Единая функция фильтрации по текущим контролам сорт-модуля (применяем к каждому набору)
    const applyControlsFilter = useCallback((list: GithubComVeresusTlApiInternalModelOrderOut[] | undefined) => {
      if (!list || list.length === 0) return [] as GithubComVeresusTlApiInternalModelOrderOut[];
      let result = list;

      if (name && name !== "") {
        result = result.filter(o => o.cargo_name?.toLowerCase().includes(name.toLowerCase()));
      }

      if (today !== undefined) {
        const now = new Date();
        const todayString = now.toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        result = result.filter(o => today ? o.time?.startsWith(todayString) : o.time?.startsWith(tomorrowString));
      }

      if (isUrgent !== undefined) {
        result = result.filter(o => o.is_urgent === isUrgent);
      }

      if (departLoc !== undefined) {
        result = result.filter(o => o.depart_loc_name === departLoc);
      }

      if (goalLoc !== undefined) {
        result = result.filter(o => o.goal_loc_name === goalLoc);
      }

      if (cargoType !== undefined) {
        result = result.filter(o => o.cargo_type_name === cargoType);
      }

      return result;
    }, [name, today, isUrgent, departLoc, goalLoc, cargoType])

    // Базовые наборы
    const baseCreated = useMemo(() => privateOrders?.new?.orders ?? (orders ?? []).filter(o => o.order_status_name === OrderStatus.NEW), [privateOrders, orders])
    const baseInWork = useMemo(() => privateOrders?.in_work?.orders ?? (orders ?? []).filter(o => o.order_status_name === OrderStatus.ACCEPT), [privateOrders, orders])
    const baseCompleted = useMemo(() => privateOrders?.completed?.orders ?? (orders ?? []).filter(o => o.order_status_name === OrderStatus.COMPLETE), [privateOrders, orders])

    // Отфильтрованные наборы согласно текущим контролам
    const createdOrders = useMemo(() => applyControlsFilter(baseCreated as unknown as GithubComVeresusTlApiInternalModelOrderOut[]), [applyControlsFilter, baseCreated])
    const inWorkOrders = useMemo(() => applyControlsFilter(baseInWork as unknown as GithubComVeresusTlApiInternalModelOrderOut[]), [applyControlsFilter, baseInWork])
    const completedOrders = useMemo(() => applyControlsFilter(baseCompleted as unknown as GithubComVeresusTlApiInternalModelOrderOut[]), [applyControlsFilter, baseCompleted])

    // Управление разворачиванием секций «Посмотреть все»
    const COLLAPSED_COUNT = 2; // по умолчанию показываем первые два элемента
    const [expandCreated, setExpandCreated] = useState(false)
    const [expandInWork, setExpandInWork] = useState(false)
    const [expandCompleted, setExpandCompleted] = useState(false)

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
            // После взятия заказа обновляем списки (аналогично созданию заказа)
            triggerNewOrderMarker()
        } catch (error) {
            console.error('Ошибка взятия заказа:', error)
        }
    }, [actions, modals, triggerNewOrderMarker])

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
    if (error) return <div>{error.message || String(error)}</div>
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
          {!isPrivate && (
            <OrderList
              orders={filteredOrders!}
              handleAction={handleSendRequest}
              isPrivate={isPrivate}
              handleInfo={handleInfo}
              isExpand={true}
            />
          )}

          {isPrivate && (
            <div className={styles.sections}>
              {/* Заказы в работе */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>{role !==  DtoRoleStatic.DRIVER ? "Заказы в работе" : "Активные"} </div>
                  {inWorkOrders.length > COLLAPSED_COUNT && (
                    <button className={styles.expandBtn} onClick={() => setExpandInWork(v => !v)}>
                      {expandInWork ? 'Скрыть' : 'Посмотреть все'}
                    </button>
                  )}
                </div>
                {inWorkOrders.length === 0 ? <span>Заказов нет</span> :
                <OrderList
                  orders={expandInWork ? inWorkOrders : inWorkOrders.slice(0, COLLAPSED_COUNT)}
                  handleAction={handleSendRequest}
                  isPrivate={isPrivate}
                  handleInfo={handleInfo}
                  isExpand={expandInWork}
                />}
              </div>

              {/* Созданные заказы */}
              {role !==  DtoRoleStatic.DRIVER &&
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>Созданные заказы</div>
                  {createdOrders.length > COLLAPSED_COUNT && (
                    <button className={styles.expandBtn} onClick={() => setExpandCreated(v => !v)}>
                      {expandCreated ? 'Скрыть' : 'Посмотреть все'}
                    </button>
                  )}
                </div>
                {createdOrders.length === 0 ? <span>Заказов нет</span> : 
                <OrderList
                  orders={expandCreated ? createdOrders : createdOrders.slice(0, COLLAPSED_COUNT)}
                  handleAction={handleSendRequest}
                  isPrivate={isPrivate}
                  handleInfo={handleInfo}
                  isExpand={expandCreated}
                />}
              </div>}

              {/* Завершённые заказы */}
              <div className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionTitle}>Завершенные заказы</div>
                  {completedOrders.length > COLLAPSED_COUNT && (
                    <button className={styles.expandBtn} onClick={() => setExpandCompleted(v => !v)}>
                      {expandCompleted ? 'Скрыть' : 'Посмотреть все'}
                    </button>
                  )}
                </div>
                {completedOrders.length === 0 ? <span>Заказов нет</span> : 
                <OrderList
                  orders={expandCompleted ? completedOrders : completedOrders.slice(0, COLLAPSED_COUNT)}
                  handleAction={handleSendRequest}
                  isPrivate={isPrivate}
                  handleInfo={handleInfo}
                  isExpand={expandCompleted}
                />}
              </div>
            </div>
          )}
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