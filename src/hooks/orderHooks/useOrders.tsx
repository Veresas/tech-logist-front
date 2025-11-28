// hooks/useOrders.ts
import { useGetOrdersActual, useGetOrdersPersonalCatalog } from '../../api/orders/orders'


export function useOrders(isPrivate: boolean) {
  const ordersQuery = useGetOrdersActual({ isPrivate }, {
    query: {
      queryKey: ['orders', { isPrivate }],
    }
  })

  const personalQuery = useGetOrdersPersonalCatalog({
    query: {
      enabled: isPrivate,
      queryKey: ['ordersPersonalCatalog'],
    }
  })

  return {
    orders: ordersQuery.data?.data?.orders || [],
    privateOrders: personalQuery.data?.data,
    isLoading: ordersQuery.isLoading || personalQuery.isLoading,
    error: (ordersQuery.error || personalQuery.error) as Error | undefined,
    fetchOrders: () => {
      void ordersQuery.refetch()
      if (isPrivate) void personalQuery.refetch()
    }
  }
}
