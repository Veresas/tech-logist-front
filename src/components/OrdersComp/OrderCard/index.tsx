import type { OrderCardProps } from './type';
import { useAuth } from '../../../utils/ContextHooks/AuthContextHooks';
import { ModelRoleEnum, ModelOrderStatusEnum } from "../../../api"
import { OCActionList } from '../type';

export const OrderCard = ({ order, onClick , isPrivate , onClickPhoto }: OrderCardProps) => {
    const { role } = useAuth();
//TODO : дописать весь блок
    return (
        <div>
            <label>Номер заказа: {order.id}</label>
            <label>{order.cargo_name}</label>
            <label>{order.cargo_description}</label>
            <label>{order.cargo_weight}</label>
            <label>{order.cargo_type_name}</label>
            <label>{order.depart_loc_name}</label>
            <label>{order.goal_loc_name}</label>
            <label>{order.order_status_name}</label>
            <label>{order.time}</label>
            <label>Диспетчер: {order.dispatcher_name}</label>
            {order.driver_name && <label>Водитель: {order.driver_name}</label>}
            {role === ModelRoleEnum.DRIVER && ModelOrderStatusEnum.NEW === order.order_status_name && <label>Действия:
                <button onClick={() => onClick(order.id || 0, OCActionList.TAKE)}>Принять</button>
            </label>}

            {role === ModelRoleEnum.DRIVER && ModelOrderStatusEnum.ACCEPT === order.order_status_name && isPrivate && <label>Действия:
                <button onClick={() => onClick(order.id || 0, OCActionList.COMPLITE)}>Выполнить</button>
                <button onClick={() => onClick(order.id || 0, OCActionList.REJECT)}>Отклонить</button>
                {order?.photo_id && <button onClick={() => onClickPhoto(order?.photo_id || '')}>Фото</button>}
            </label>}

            {role !== ModelRoleEnum.DRIVER && ModelOrderStatusEnum.NEW === order.order_status_name && isPrivate  && <label>Действия:
                <button onClick={() => onClick(order.id || 0, OCActionList.CANCEL)}>Отменить</button>
            </label>}
        </div>
    );
};