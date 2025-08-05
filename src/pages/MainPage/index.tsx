import React, { useEffect, useState } from 'react'
import { OrderList } from '../../components/OrdersComp'
import { ordersApi } from '../../utils/ApiFactory'
import type { ModelOrderOut } from "../../api"
import type { OrderCardClickHandler, OrderCardClickPhotoHandler } from '../../components/OrdersComp/type'

export const MainPage = () => {
    const [ orders, setOrders ] = useState<ModelOrderOut[] | undefined>(undefined)
    const [ isLoading, setIsLoding ] = useState(false)
    const [ errLoad, setErrLoad ] = useState<string | undefined>(undefined)

    const handelSendRequest : OrderCardClickHandler  = async (orderId, action) => {
        try {
            await action(orderId)
        } catch (error) {
            console.log(error)
        }
    }

    const  handelGetPhoto : OrderCardClickPhotoHandler = async (photoId) => {
        alert("Зашлушка, будет запрошенно фото " + photoId)
    }

    useEffect (() => {
        const fecthOrders = async () => {
            try {
                setIsLoding(true)
                setErrLoad(undefined)
                const res = await ordersApi.ordersActualGet()
                setOrders(res.data)
            } catch (err) {
                console.log(err)
                alert("Ошибка получения заказов")
                setErrLoad("Ошибка загрузки списка заказов: " + err)
            } finally {
                setIsLoding (false)
            }
        }

        fecthOrders()
    }, [])

    if (isLoading){
        return ( <div>Загрузка страницы</div>)
    }

    if (errLoad){
        return ( <div>{errLoad}</div>)
    }

    return (
        <div>
            {orders && <OrderList orders={orders} handelAction={handelSendRequest} handelPhoto={handelGetPhoto} isPrivate={false} />}
            
        </div>
    )
}