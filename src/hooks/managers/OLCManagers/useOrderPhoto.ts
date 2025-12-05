import { useEffect, useCallback } from 'react';
import type { GithubComVeresusTlApiInternalModelOrderOut } from '../../../api/main';
import { useQueryClient } from '@tanstack/react-query';
import { useGetOrdersPhotoId } from '../../../api/main/orders/orders';

/**
 * Менеджер для управления фотографиями заказов
 * Инкапсулирует логику загрузки и отображения фотографий
 */
export const useOrderPhoto = (selectedOrder: GithubComVeresusTlApiInternalModelOrderOut | null) => {
  const qc = useQueryClient();

  // Загрузка фотографии заказа
  const { data: photoResponse, isLoading: isLoadingPhoto, error } = useGetOrdersPhotoId(
    selectedOrder?.photo_id || '',
    {
      query: {
        enabled: Boolean(selectedOrder?.photo_id),
        queryKey: ['orderPhoto', selectedOrder?.photo_id],
        gcTime: 0,
      }
    }
  );

  const photoBlobUrl = photoResponse?.data ? URL.createObjectURL(photoResponse.data) : null;

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
