// hooks/useOrderCardHandlers.ts
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../../components/OrdersComp/type'
import type { OrderCardAction } from '../../components/OrdersComp/type'

export const useOrderCardHandlers = () => {
  const handleSendRequest: OrderCardClickHandler = async (orderId: number, action: OrderCardAction ) => {
    try {
      await action(orderId)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetPhoto: OrderCardClickPhotoHandler = async (photoId: string) => {
    alert("Заглушка, будет запрошено фото: " + photoId)
  }

  return { handleSendRequest, handleGetPhoto }
}