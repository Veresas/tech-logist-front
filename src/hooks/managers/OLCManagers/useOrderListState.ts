import { useEffect, useCallback, useRef } from 'react';

/**
 * Менеджер для управления общим состоянием списка заказов
 * Инкапсулирует логику обновления и защиты от первого рендера
 */
export const useOrderListState = (newOrderMarker: number, fetchOrders: () => void) => {
  const isFirstRenderRef = useRef<boolean>(true);

  // Обновлять список только после первого реального изменения маркера
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    fetchOrders();
  }, [newOrderMarker, fetchOrders]);

  // Принудительное обновление списка
  const handleRefreshOrders = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Сброс флага первого рендера (на случай спец-сценариев)
  const resetFirstRender = useCallback(() => {
    isFirstRenderRef.current = true;
  }, []);

  return {
    handleRefreshOrders,
    resetFirstRender,
  };
};
