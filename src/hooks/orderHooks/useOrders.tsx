// hooks/useOrders.ts
import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../../utils/ApiFactory'
import type { GithubComVeresusTlApiInternalModelOrderOut, GithubComVeresusTlApiInternalClientsTlOrdersClientDtoPersonalCatalogResponse } from "../../api"


export function useOrders(isPrivate: boolean) {
  const ordersQuery = useQuery<GithubComVeresusTlApiInternalModelOrderOut[]>({
    queryKey: ['orders', { isPrivate }],
    queryFn: async () => {
      const res = await ordersApi.ordersActualGet(isPrivate)
      return res.data.orders || []
    },
  })

  const personalQuery = useQuery<GithubComVeresusTlApiInternalClientsTlOrdersClientDtoPersonalCatalogResponse>({
    enabled: isPrivate,
    queryKey: ['ordersPersonalCatalog'],
    queryFn: async () => {
      const res = await ordersApi.ordersPersonalCatalogGet()
      return res.data
    },
  })

  return {
    orders: ordersQuery.data,
    privateOrders: personalQuery.data,
    isLoading: ordersQuery.isLoading || personalQuery.isLoading,
    error: (ordersQuery.error || personalQuery.error) as Error | undefined,
    fetchOrders: () => {
      void ordersQuery.refetch()
      if (isPrivate) void personalQuery.refetch()
    }
  }
}
