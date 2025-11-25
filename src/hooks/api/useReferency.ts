import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { referencyApi } from '../../utils/ApiFactory'
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api'

export const useDropdownListInfoQuery = (options?: Omit<UseQueryOptions<GithubComVeresusTlApiInternalModelDropDownListInfoResponse>, 'queryKey' | 'queryFn'>) =>
  useQuery<GithubComVeresusTlApiInternalModelDropDownListInfoResponse>({
    queryKey: ['ref', 'dropdown-list-info'],
    queryFn: async () => {
      const res = await referencyApi.refDropdownListInfoGet()
      return res.data
    },
    staleTime: 5 * 60_000,
    ...options,
  })


