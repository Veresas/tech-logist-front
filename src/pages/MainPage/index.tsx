//import React, { useEffect, useState } from 'react'
import { OrderListContainer } from '../../components/OrdersComp/OrderListContainer'

export const MainPage = () => {

    return (
        <div>
            <OrderListContainer isPrivate={false} ></OrderListContainer>
        </div>
    )
}