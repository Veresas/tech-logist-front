import { useMemo, useState } from "react";
import type { ModelOrderOut } from "../../api";

export function useSearche(orders: ModelOrderOut[] | undefined){
    const [name, setName] = useState<string | undefined>(undefined);
    const [today, setToday] = useState<boolean | undefined>(undefined);
    const [isUrgent, setIsUrgent] = useState<boolean | undefined>(undefined);

    const filteredOrders = useMemo(() => {
        if (!orders || orders.length === 0) {
            return [];
        }
        
        let result = orders;

        if (name && name !== "") {
            result = result.filter(order => 
                order.cargo_name?.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (today !== undefined) {
            const now = new Date();
            const todayString = now.toISOString().split('T')[0];
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowString = tomorrow.toISOString().split('T')[0];
            
            if (today) {
                result = result.filter(order => order.time?.startsWith(todayString));
            } else {
                result = result.filter(order => order.time?.startsWith(tomorrowString));
            }
        }
        if (isUrgent !== undefined) {
            result = result.filter(order => order.is_urgent === isUrgent);
        }


        return result;
    }, [orders, name, today, isUrgent]);


    return {
        filteredOrders,
        name,
        today,
        isUrgent,
        setName,
        setIsUrgent,
        setToday,
    }
        

    
}