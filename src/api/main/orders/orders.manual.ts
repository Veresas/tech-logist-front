/**
 * Ручные изменения для эндпоинтов, требующих кастомизации
 * Этот файл НЕ генерируется автоматически и не будет затронут при регенерации API
 * 
 * Содержит функции, которые требуют ручной настройки (например, кастомные заголовки)
 */

import { useMutation } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import type {
  DtoOrderCreate,
  GithubComVeresusTlApiInternalModelErrorResponse,
  GithubComVeresusTlApiInternalModelMessageResponse,
} from '../model';

import { apiClient } from '../../../utils/customAxios';

/**
 * Создает новую заявку в системе
 * @summary Создать новую заявку
 * 
 * ВАЖНО: Эта функция требует ручной настройки для передачи Idempotency-Key заголовка
 */
export const postOrdersCreate = (
  dtoOrderCreate: DtoOrderCreate,
  idempotencyKey: string,
  signal?: AbortSignal
) => {
  return apiClient<GithubComVeresusTlApiInternalModelMessageResponse>({
    url: `/orders/create`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    data: dtoOrderCreate,
    signal,
  });
};

export const getPostOrdersCreateMutationOptions = <
  TError = GithubComVeresusTlApiInternalModelErrorResponse,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postOrdersCreate>>,
      TError,
      { data: DtoOrderCreate; idempotencyKey: string },
      TContext
   >;
  }
): UseMutationOptions<
  Awaited<ReturnType<typeof postOrdersCreate>>,
  TError,
  { data: DtoOrderCreate; idempotencyKey: string },
  TContext
> => {
  const mutationKey = ['postOrdersCreate'];
  const { mutation: mutationOptions } = options
    ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postOrdersCreate>>,
    { data: DtoOrderCreate; idempotencyKey: string }
  > = (props) => {
    const { data, idempotencyKey } = props ?? {};

    return postOrdersCreate(data, idempotencyKey);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostOrdersCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof postOrdersCreate>>
>;
export type PostOrdersCreateMutationBody = DtoOrderCreate;
export type PostOrdersCreateMutationError =
  GithubComVeresusTlApiInternalModelErrorResponse;

/**
 * @summary Создать новую заявку
 */
export const usePostOrdersCreate = <
  TError = GithubComVeresusTlApiInternalModelErrorResponse,
  TContext = unknown
>(
  options?: {
    mutation?: UseMutationOptions<
      Awaited<ReturnType<typeof postOrdersCreate>>,
      TError,
      { data: DtoOrderCreate; idempotencyKey: string },
      TContext
   >;
  },
  queryClient?: QueryClient
): UseMutationResult<
  Awaited<ReturnType<typeof postOrdersCreate>>,
  TError,
  { data: DtoOrderCreate; idempotencyKey: string },
  TContext
> => {
  const mutationOptions = getPostOrdersCreateMutationOptions(options);

  return useMutation(mutationOptions, queryClient);
};

