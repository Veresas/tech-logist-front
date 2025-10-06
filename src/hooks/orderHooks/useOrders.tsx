// hooks/useOrders.ts
import { ordersApi } from '../../utils/ApiFactory'
import { useCallback, useEffect, useState } from 'react'
import type { GithubComVeresusTlApiInternalModelOrderOut, GithubComVeresusTlApiInternalClientsTlOrdersClientDtoPersonalCatalogResponse } from "../../api"


export function useOrders(isPrivate: boolean) {
  const [orders, setOrders] = useState<GithubComVeresusTlApiInternalModelOrderOut[] | undefined>(undefined)
  const [privateOrders, setPrivateOrders ] = useState<GithubComVeresusTlApiInternalClientsTlOrdersClientDtoPersonalCatalogResponse | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(undefined)
      if (isPrivate) {
        const res = await ordersApi.ordersPersonalCatalogGet()
        setPrivateOrders(res.data)
      }
      const res = await ordersApi.ordersActualGet(isPrivate)
      setOrders(res.data.orders || [])
    } catch (err) {
      console.error('Ошибка при запросе заказов:', err)
      setError("Ошибка загрузки заказов: " + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [isPrivate])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, privateOrders, isLoading, error, fetchOrders }
}
