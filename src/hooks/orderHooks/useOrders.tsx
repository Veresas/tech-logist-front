// hooks/useOrders.ts
import { useEffect, useState } from 'react'
import type { ModelOrderOut } from "../../api"
type FetchFn = () => Promise<{ data: ModelOrderOut[] }>

export function useOrders(fetchFn: FetchFn) {
  const [orders, setOrders] = useState<ModelOrderOut[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        setError(undefined)
        const res = await fetchFn()
        setOrders(res.data)
      } catch (err) {
        console.error(err)
        setError("Ошибка загрузки заказов: " + (err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [fetchFn])

  return { orders, isLoading, error }
}
