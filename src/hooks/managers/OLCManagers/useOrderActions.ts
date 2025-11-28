import { useCallback } from 'react';
import type { DtoOrderUpdate, DtoOrderCreate } from '../../../api';
import { useAcceptOrder, useRejectOrder, useCancelOrder, useCompleteOrder } from '../../orderHooks/useOrderMutations';
import { 
  getOrdersUpdateId, 
  patchOrdersId
} from '../../../api/orders/orders';
import { postOrdersCreate } from '../../../api/orders/orders.manual';

/**
 * Менеджер для обработки всех действий с заказами
 * Инкапсулирует API вызовы и бизнес-логику операций с заказами
 */
export const useOrderActions = (onOrdersUpdate: () => void) => {
  const acceptMutation = useAcceptOrder();
  const rejectMutation = useRejectOrder();
  const cancelMutation = useCancelOrder();
  const completeMutation = useCompleteOrder();
  
  // Получение данных заказа для редактирования
  const handleGetOrderForEdit = useCallback(async (orderId: number) => {
    try {
      const res = await getOrdersUpdateId(orderId);
      return res.data.order_for_update as DtoOrderCreate;
    } catch (error) {
      console.error('Ошибка получения данных для редактирования:', error);
      throw error;
    }
  }, []);

  // Обновление заказа
  const handleUpdateOrder = useCallback(async (orderId: number, order: DtoOrderUpdate) => {
    try {
      await patchOrdersId(orderId, order);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка обновления заказа:', error);
      throw error;
    }
  }, [onOrdersUpdate]);

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
      await postOrdersCreate(order, idempotencyKey);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
      throw error;
    }
  }, [onOrdersUpdate]);

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
