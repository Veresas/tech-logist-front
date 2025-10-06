import { useMutation, useQuery } from '@tanstack/react-query'
import { identityApi } from '../../utils/ApiFactory'
import type { DtoLoginRequest, DtoRegisterRequest } from '../../api'

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (payload: DtoLoginRequest) => {
      const res = await identityApi.publicAuthLoginPost(payload)
      return res.data
    },
  })

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (payload: DtoRegisterRequest) => {
      const res = await identityApi.publicAuthRegisterPost(payload)
      return res.data
    },
  })

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      const res = await identityApi.publicAuthLogoutPost()
      return res.data
    },
  })

export const useCheckLoginQuery = (login: string, enabled: boolean) =>
  useQuery({
    enabled,
    queryKey: ['auth', 'check-login', login],
    queryFn: async () => {
      const res = await identityApi.publicAuthCheckLoginLoginGet(login)
      return res.data
    },
    staleTime: 60_000,
  })


