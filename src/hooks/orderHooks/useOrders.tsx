// hooks/useOrders.ts
import { ordersApi } from '../../utils/ApiFactory'
import { useEffect, useState } from 'react'
import type { ModelOrderOut } from "../../api"


export function useOrders(isPrivate: boolean) {
  const [orders, setOrders] = useState<ModelOrderOut[] | undefined>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        setError(undefined)
        const res = await ordersApi.ordersActualGet(isPrivate)
        setOrders(res.data.orders || [])
      } catch (err) {
        console.error(err)
        setError("Ошибка загрузки заказов: " + (err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [isPrivate])

  return { orders, isLoading, error }
}
