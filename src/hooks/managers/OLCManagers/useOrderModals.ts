import { useState, useCallback } from 'react';
import type { GithubComVeresusTlApiInternalModelOrderOut, DtoOrderCreate } from '../../../api';

/**
 * Менеджер для управления всеми модальными окнами в OrderListContainer
 * Инкапсулирует состояние и логику открытия/закрытия модальных окон
 */
export const useOrderModals = () => {
  // Состояние модальных окон
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  
  // Данные для модальных окон
  const [selectedOrder, setSelectedOrder] = useState<GithubComVeresusTlApiInternalModelOrderOut | null>(null);
  const [orderForEdit, setOrderForEdit] = useState<DtoOrderCreate | null>(null);
  const [orderEditID, setOrderEditID] = useState<number | undefined>(undefined);

  // Открытие модального окна деталей заказа
  const openDetailsModal = useCallback((order: GithubComVeresusTlApiInternalModelOrderOut) => {
    setSelectedOrder(order);
    setIsModalDetailsOpen(true);
  }, []);

  // Открытие модального окна редактирования заказа
  const openEditModal = useCallback((order: DtoOrderCreate, orderId: number) => {
    setOrderForEdit(order);
    setOrderEditID(orderId);
    setIsModalEditOpen(true);
  }, []);

  // Открытие модального окна создания заказа
  const openCreateModal = useCallback(() => {
    setIsModalCreateOpen(true);
  }, []);

  // Закрытие модального окна деталей
  const closeDetailsModal = useCallback(() => {
    setIsModalDetailsOpen(false);
    setOrderForEdit(null);
    setOrderEditID(undefined);
  }, []);

  // Закрытие модального окна редактирования
  const closeEditModal = useCallback(() => {
    setIsModalEditOpen(false);
    setSelectedOrder(null);
  }, []);

  // Закрытие модального окна создания
  const closeCreateModal = useCallback(() => {
    setIsModalCreateOpen(false);
  }, []);

  // Закрытие всех модальных окон
  const closeAllModals = useCallback(() => {
    setIsModalDetailsOpen(false);
    setIsModalEditOpen(false);
    setIsModalCreateOpen(false);
    setSelectedOrder(null);
    setOrderForEdit(null);
    setOrderEditID(undefined);
  }, []);

  return {
    // Состояние модальных окон
    isModalDetailsOpen,
    isModalEditOpen,
    isModalCreateOpen,
    
    // Данные для модальных окон
    selectedOrder,
    orderForEdit,
    orderEditID,
    
    // Методы управления модальными окнами
    openDetailsModal,
    openEditModal,
    openCreateModal,
    closeDetailsModal,
    closeEditModal,
    closeCreateModal,
    closeAllModals,
  };
};
