import { useState, useEffect, useCallback } from 'react';
import type { GithubComVeresusTlApiInternalModelOrderOut, OrdersApi } from '../../../api';

/**
 * Менеджер для управления фотографиями заказов
 * Инкапсулирует логику загрузки и отображения фотографий
 */
export const useOrderPhoto = (selectedOrder: GithubComVeresusTlApiInternalModelOrderOut | null, ordersApi: OrdersApi) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Загрузка фотографии заказа
  const handleGetPhoto = useCallback(async () => {
    if (!selectedOrder?.photo_id) {
      setPhotoUrl(null);
      return;
    }

    try {
      setIsLoadingPhoto(true);
      setPhotoError(null);
      
      const res = await ordersApi.ordersPhotoIdGet(selectedOrder.photo_id, { 
        responseType: 'blob' 
      });
      
      const photoBlob = URL.createObjectURL(res.data);
      setPhotoUrl(photoBlob);
    } catch (error) {
      console.error('Ошибка получения фотографии:', error);
      setPhotoError('Не удалось загрузить фотографию');
      setPhotoUrl(null);
    } finally {
      setIsLoadingPhoto(false);
    }
  }, [selectedOrder?.photo_id, ordersApi]);

  // Очистка фотографии
  const clearPhoto = useCallback(() => {
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
    }
    setPhotoUrl(null);
    setPhotoError(null);
  }, [photoUrl]);

  // Автоматическая загрузка фотографии при изменении выбранного заказа
  useEffect(() => {
    if (selectedOrder?.photo_id) {
      handleGetPhoto();
    } else {
      clearPhoto();
    }
  }, [selectedOrder, handleGetPhoto, clearPhoto]);

  // Очистка URL при размонтировании
  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  return {
    // Состояние фотографии
    photoUrl,
    isLoadingPhoto,
    photoError,
    
    // Методы управления фотографией
    handleGetPhoto,
    clearPhoto,
  };
};
