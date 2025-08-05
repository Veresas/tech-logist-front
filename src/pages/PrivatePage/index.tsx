//import React, { useEffect, useState } from 'react'
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer'

export const PrivatePage = () => {

    return (
        <div>
            <OrderListContainer isPrivate={true} ></OrderListContainer>
        </div>
    )
}