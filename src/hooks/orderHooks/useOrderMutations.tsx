import { useQueryClient } from '@tanstack/react-query'
import { 
  usePatchOrdersIdAccept, 
  usePatchOrdersIdReject, 
  usePatchOrdersIdCancel, 
  usePatchOrdersIdComplete 
} from '../../api/orders/orders'

export const useAcceptOrder = () => {
  const qc = useQueryClient()
  const mutation = usePatchOrdersIdAccept({
    mutation: {
      onSuccess: async () => {
        // Инвалидируем все запросы orders/actual (независимо от params)
        await qc.invalidateQueries({ queryKey: ['/orders/actual'] })
        await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
      },
    }
  })
  return {
    ...mutation,
    mutate: (id: number) => mutation.mutate({ id }),
    mutateAsync: async (id: number) => {
      const res = await mutation.mutateAsync({ id })
      return res.data
    }
  }
}

export const useRejectOrder = () => {
  const qc = useQueryClient()
  const mutation = usePatchOrdersIdReject({
    mutation: {
      onSuccess: async () => {
        // Инвалидируем все запросы orders/actual (независимо от params)
        await qc.invalidateQueries({ queryKey: ['/orders/actual'] })
        await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
      },
    }
  })
  return {
    ...mutation,
    mutate: (id: number) => mutation.mutate({ id }),
    mutateAsync: async (id: number) => {
      const res = await mutation.mutateAsync({ id })
      return res.data
    }
  }
}

export const useCancelOrder = () => {
  const qc = useQueryClient()
  const mutation = usePatchOrdersIdCancel({
    mutation: {
      onSuccess: async () => {
        // Инвалидируем все запросы orders/actual (независимо от params)
        await qc.invalidateQueries({ queryKey: ['/orders/actual'] })
        await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
      },
    }
  })
  return {
    ...mutation,
    mutate: (id: number) => mutation.mutate({ id }),
    mutateAsync: async (id: number) => {
      const res = await mutation.mutateAsync({ id })
      return res.data
    }
  }
}

export const useCompleteOrder = () => {
  const qc = useQueryClient()
  const mutation = usePatchOrdersIdComplete({
    mutation: {
      onSuccess: async () => {
        // Инвалидируем все запросы orders/actual (независимо от params)
        await qc.invalidateQueries({ queryKey: ['/orders/actual'] })
        await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
      },
    }
  })
  return {
    ...mutation,
    mutate: (id: number) => mutation.mutate({ id }),
    mutateAsync: async (id: number) => {
      const res = await mutation.mutateAsync({ id })
      return res.data
    }
  }
}


