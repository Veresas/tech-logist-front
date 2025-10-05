// hooks/useOrders.ts
import { ordersApi } from '../../utils/ApiFactory'
import { useCallback, useEffect, useState } from 'react'
import type { GithubComVeresusTlApiInternalModelOrderOut } from "../../api"


export function useOrders(isPrivate: boolean) {
  const [orders, setOrders] = useState<GithubComVeresusTlApiInternalModelOrderOut[] | undefined>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(undefined)
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

  return { orders, isLoading, error, fetchOrders }
}
