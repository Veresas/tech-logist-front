import { useState, useEffect, useCallback } from 'react';

/**
 * Менеджер для управления общим состоянием списка заказов
 * Инкапсулирует логику обновления и защиты от первого рендера
 */
export const useOrderListState = (newOrderMarker: number, fetchOrders: () => void) => {
  const [firstRender, setFirstRender] = useState<boolean>(false);

  // Обработка обновления списка заказов с защитой от первого рендера
  useEffect(() => {
    if (!firstRender) {
      fetchOrders();
    } else {
      setFirstRender(true);
    }
  }, [newOrderMarker, fetchOrders, firstRender]);

  // Принудительное обновление списка
  const handleRefreshOrders = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Сброс состояния первого рендера (для тестирования или особых случаев)
  const resetFirstRender = useCallback(() => {
    setFirstRender(false);
  }, []);

  return {
    // Состояние
    firstRender,
    
    // Методы управления состоянием
    handleRefreshOrders,
    resetFirstRender,
  };
};
