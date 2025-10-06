// hooks/useOrderCardHandlers.ts
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../../components/OrdersComp/type'
import type { OrderCardAction } from '../../components/OrdersComp/type'
import { useAcceptOrder, useRejectOrder, useCancelOrder, useCompleteOrder } from './useOrderMutations'

export const useOrderCardHandlers = () => {
  const accept = useAcceptOrder()
  const reject = useRejectOrder()
  const cancel = useCancelOrder()
  const complete = useCompleteOrder()

  const handleSendRequest: OrderCardClickHandler = async (orderId: number, action: OrderCardAction ) => {
    try {
      if (action === 'TAKE') await accept.mutateAsync(orderId)
      else if (action === 'REJECT') await reject.mutateAsync(orderId)
      else if (action === 'CANCEL') await cancel.mutateAsync(orderId)
      else if (action === 'COMPLITE') await complete.mutateAsync(orderId)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetPhoto: OrderCardClickPhotoHandler = async (photoId: string) => {
    alert("Заглушка, будет запрошено фото: " + photoId)
  }

  return { handleSendRequest, handleGetPhoto }
}