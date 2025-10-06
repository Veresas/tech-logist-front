import { useEffect, useCallback } from 'react';
import type { GithubComVeresusTlApiInternalModelOrderOut } from '../../../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../../../utils/ApiFactory';

/**
 * Менеджер для управления фотографиями заказов
 * Инкапсулирует логику загрузки и отображения фотографий
 */
export const useOrderPhoto = (selectedOrder: GithubComVeresusTlApiInternalModelOrderOut | null) => {
  const qc = useQueryClient();

  // Загрузка фотографии заказа
  const { data: photoBlobUrl, isLoading: isLoadingPhoto, error } = useQuery<string | null>({
    enabled: Boolean(selectedOrder?.photo_id),
    queryKey: ['orderPhoto', selectedOrder?.photo_id],
    queryFn: async () => {
      if (!selectedOrder?.photo_id) return null;
      const res = await ordersApi.ordersPhotoIdGet(selectedOrder.photo_id, { responseType: 'blob' });
      return URL.createObjectURL(res.data);
    },
    gcTime: 0,
  });

  // Очистка фотографии
  const clearPhoto = useCallback(() => {
    const current = qc.getQueryData<string | null>(['orderPhoto', selectedOrder?.photo_id]);
    if (current) URL.revokeObjectURL(current);
    qc.removeQueries({ queryKey: ['orderPhoto', selectedOrder?.photo_id] });
  }, [qc, selectedOrder?.photo_id]);

  // Автоматическая загрузка фотографии при изменении выбранного заказа
  useEffect(() => {
    if (!selectedOrder?.photo_id) clearPhoto();
  }, [selectedOrder, clearPhoto]);

  // Очистка URL при размонтировании
  useEffect(() => {
    return () => {
      const current = qc.getQueryData<string | null>(['orderPhoto', selectedOrder?.photo_id]);
      if (current) URL.revokeObjectURL(current);
    };
  }, [qc, selectedOrder?.photo_id]);

  return {
    // Состояние фотографии
    photoUrl: photoBlobUrl ?? null,
    isLoadingPhoto,
    photoError: (error as Error | null) ?? null,
    
    clearPhoto,
  };
};
