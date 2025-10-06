import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersApi } from '../../utils/ApiFactory'

export const useAcceptOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await ordersApi.ordersIdAcceptPatch(id)
      return res.data
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['orders'] })
      await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
    },
  })
}

export const useRejectOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await ordersApi.ordersIdRejectPatch(id)
      return res.data
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['orders'] })
      await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
    },
  })
}

export const useCancelOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await ordersApi.ordersIdCancelPatch(id)
      return res.data
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['orders'] })
      await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
    },
  })
}

export const useCompleteOrder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await ordersApi.ordersIdCompletePatch(id)
      return res.data
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['orders'] })
      await qc.invalidateQueries({ queryKey: ['ordersPersonalCatalog'] })
    },
  })
}


