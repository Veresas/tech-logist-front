import { useQuery } from '@tanstack/react-query'
import { checkApi } from '../../utils/ApiFactory'

export const useVerifyAuthQuery = (isName: boolean) =>
  useQuery({
    queryKey: ['auth', 'verify', { isName }],
    queryFn: async () => {
      const res = await checkApi.checkGet(isName)
      return res.data
    },
    retry: (count, err: unknown) => {
      const status = (err as { response?: { status?: number } })?.response?.status
      if (status === 401) return false
      return count < 2
    },
  })


