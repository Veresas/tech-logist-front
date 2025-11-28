import { 
  usePostPublicAuthLogin, 
  usePostPublicAuthRegister, 
  usePostPublicAuthLogout,
  useGetPublicAuthCheckLoginLogin
} from '../../api/identity/identity'
import type { DtoLoginRequest, DtoRegisterRequest } from '../../api/model'

export const useLoginMutation = () => {
  const mutation = usePostPublicAuthLogin()
  return {
    ...mutation,
    mutate: (payload: DtoLoginRequest) => mutation.mutate({ data: payload }),
    mutateAsync: async (payload: DtoLoginRequest) => {
      const res = await mutation.mutateAsync({ data: payload })
      return res.data
    }
  }
}

export const useRegisterMutation = () => {
  const mutation = usePostPublicAuthRegister()
  return {
    ...mutation,
    mutate: (payload: DtoRegisterRequest) => mutation.mutate({ data: payload }),
    mutateAsync: async (payload: DtoRegisterRequest) => {
      const res = await mutation.mutateAsync({ data: payload })
      return res.data
    }
  }
}

export const useLogoutMutation = () => {
  const mutation = usePostPublicAuthLogout()
  return {
    ...mutation,
    mutate: () => mutation.mutate(undefined),
    mutateAsync: async () => {
      const res = await mutation.mutateAsync(undefined)
      return res.data
    }
  }
}

export const useCheckLoginQuery = (login: string, enabled: boolean) => {
  const query = useGetPublicAuthCheckLoginLogin(login, {
    query: { enabled, staleTime: 60_000 }
  })
  return {
    ...query,
    data: query.data?.data
  }
}


