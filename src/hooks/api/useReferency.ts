import { type UseQueryOptions } from '@tanstack/react-query'
import { useGetRefDropdownListInfo } from '../../api/referency/referency'
import type { GithubComVeresusTlApiInternalModelDropDownListInfoResponse } from '../../api/model'
import type { AxiosResponse } from 'axios'

export const useDropdownListInfoQuery = (options?: Omit<UseQueryOptions<AxiosResponse<GithubComVeresusTlApiInternalModelDropDownListInfoResponse>>, 'queryKey' | 'queryFn'>) => {
  const query = useGetRefDropdownListInfo({
    query: {
      staleTime: 5 * 60_000,
      ...options,
    }
  })
  return {
    ...query,
    data: query.data?.data
  }
}


