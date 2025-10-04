import { useCallback } from 'react';
import type { OrdersApi, ModelOrderUpdate, ModelOrderCreate } from '../../../api';

/**
 * Менеджер для обработки всех действий с заказами
 * Инкапсулирует API вызовы и бизнес-логику операций с заказами
 */
export const useOrderActions = (ordersApi: OrdersApi, onOrdersUpdate: () => void) => {
  
  // Получение данных заказа для редактирования
  const handleGetOrderForEdit = useCallback(async (orderId: number) => {
    try {
      const res = await ordersApi.ordersUpdateIdGet(orderId);
      return res.data.order_for_update as ModelOrderCreate;
    } catch (error) {
      console.error('Ошибка получения данных для редактирования:', error);
      throw error;
    }
  }, [ordersApi]);

  // Обновление заказа
  const handleUpdateOrder = useCallback(async (orderId: number, order: ModelOrderUpdate) => {
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
      await ordersApi.ordersIdAcceptPatch(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка взятия заказа:', error);
      throw error;
    }
  }, [ordersApi, onOrdersUpdate]);

  // Удаление заказа
  const handleDeleteOrder = useCallback(async (orderId: number) => {
    try {
      await ordersApi.ordersIdCancelPatch(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка удаления заказа:', error);
      throw error;
    }
  }, [ordersApi, onOrdersUpdate]);

  // Завершение заказа
  const handleCompleteOrder = useCallback(async (orderId: number) => {
    try {
      await ordersApi.ordersIdCompletePatch(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка завершения заказа:', error);
      throw error;
    }
  }, [ordersApi, onOrdersUpdate]);

  // Отклонение заказа
  const handleRejectOrder = useCallback(async (orderId: number) => {
    try {
      await ordersApi.ordersIdRejectPatch(orderId);
      onOrdersUpdate();
    } catch (error) {
      console.error('Ошибка отклонения заказа:', error);
      throw error;
    }
  }, [ordersApi, onOrdersUpdate]);

  // Создание заказа
  const handleCreateOrder = useCallback(async (order: ModelOrderCreate, idempotencyKey: string) => {
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
