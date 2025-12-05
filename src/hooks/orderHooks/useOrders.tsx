// hooks/useOrders.ts
import { useGetOrdersActual, useGetOrdersPersonalCatalog } from '../../api/main/orders/orders'


export function useOrders(isPrivate: boolean) {
  // Запрос актуальных заказов - только для публичной страницы
  const ordersQuery = useGetOrdersActual({
    query: {
      enabled: !isPrivate, // Выполняется только если isPrivate === false
      refetchOnMount: false, // Не перезапрашивать при монтировании
      refetchOnWindowFocus: false, // Не перезапрашивать при фокусе окна
      refetchOnReconnect: false, // Не перезапрашивать при восстановлении соединения
    }
  })

  // Запрос личного каталога - только для приватной страницы
  const personalQuery = useGetOrdersPersonalCatalog({
    query: {
      enabled: isPrivate, // Выполняется только если isPrivate === true
      refetchOnMount: false, // Не перезапрашивать при монтировании
      refetchOnWindowFocus: false, // Не перезапрашивать при фокусе окна
      refetchOnReconnect: false, // Не перезапрашивать при восстановлении соединения
      queryKey: ['ordersPersonalCatalog'],
    }
  })

  return {
    orders: ordersQuery.data?.data?.orders || [],
    privateOrders: personalQuery.data?.data,
    isLoading: ordersQuery.isLoading || personalQuery.isLoading,
    error: (ordersQuery.error || personalQuery.error) as Error | undefined,
    fetchOrders: () => {
      // Вызываем refetch только для активного запроса
      if (!isPrivate) {
        void ordersQuery.refetch()
      }
      if (isPrivate) {
        void personalQuery.refetch()
      }
    }
  }
}
