import { useCallback } from 'react';
import type { OrdersApi, DtoOrderUpdate, DtoOrderCreate } from '../../../api';
import { useAcceptOrder, useRejectOrder, useCancelOrder, useCompleteOrder } from '../../orderHooks/useOrderMutations';

/**
 * Менеджер для обработки всех действий с заказами
 * Инкапсулирует API вызовы и бизнес-логику операций с заказами
 */
export const useOrderActions = (ordersApi: OrdersApi, onOrdersUpdate: () => void) => {
  const acceptMutation = useAcceptOrder();
  const rejectMutation = useRejectOrder();
  const cancelMutation = useCancelOrder();
  const completeMutation = useCompleteOrder();
  
  // Получение данных заказа для редактирования
  const handleGetOrderForEdit = useCallback(async (orderId: number) => {
    try {
      const res = await ordersApi.ordersUpdateIdGet(orderId);
      return res.data.order_for_update as DtoOrderCreate;
    } catch (error) {
      console.error('Ошибка получения данных для редактирования:', error);
      throw error;
    }
  }, [ordersApi]);

  // Обновление заказа
  const handleUpdateOrder = useCallback(async (orderId: number, order: DtoOrderUpdate) => {
    try {
      await ordersApi.ordersIdPatch(orderId, order);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка обновления заказа:', error);
      throw error;
    }
  }, [ordersApi, onOrdersUpdate]);

  // Взятие заказа
  const handleTakeOrder = useCallback(async (orderId: number) => {
    try {
      await acceptMutation.mutateAsync(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка взятия заказа:', error);
      throw error;
    }
  }, [acceptMutation, onOrdersUpdate]);

  // Удаление заказа
  const handleDeleteOrder = useCallback(async (orderId: number) => {
    try {
      await cancelMutation.mutateAsync(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка удаления заказа:', error);
      throw error;
    }
  }, [cancelMutation, onOrdersUpdate]);

  // Завершение заказа
  const handleCompleteOrder = useCallback(async (orderId: number) => {
    try {
      await completeMutation.mutateAsync(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка завершения заказа:', error);
      throw error;
    }
  }, [completeMutation, onOrdersUpdate]);

  // Отклонение заказа
  const handleRejectOrder = useCallback(async (orderId: number) => {
    try {
      await rejectMutation.mutateAsync(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка отклонения заказа:', error);
      throw error;
    }
  }, [rejectMutation, onOrdersUpdate]);

  // Создание заказа
  const handleCreateOrder = useCallback(async (order: DtoOrderCreate, idempotencyKey: string) => {
    try {
      await ordersApi.ordersCreatePost(order, { 
        headers: { 'Idempotency-Key': idempotencyKey } 
      });
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      throw error;
    }
  }, [ordersApi]);

  return {
    // Методы для работы с заказами
    handleGetOrderForEdit,
    handleUpdateOrder,
    handleTakeOrder,
    handleDeleteOrder,
    handleCompleteOrder,
    handleRejectOrder,
    handleCreateOrder,
  };
};
