import type { BarDiagramValue } from "../StatisticWidget/types";
import { 
    useGetAnalyticsDriversAverageTime, 
    useGetAnalyticsDriversOrdersByTypes,
    useGetAnalyticsWorkshopsIncoming, 
    useGetAnalyticsWorkshopsIncomingByBuildings 
} from '../../../api/analytics/analytics/analytics';
import type { 
    ModelDriverAverageTimeResponse, 
    ModelDriverOrdersResponse, 
    ModelDepartIncomingResponse, 
    ModelErrorResponse 
} from '../../../api/analytics/model';
import type { period } from "../types";
import { useMemo } from "react";

interface UseDiagramValueReturn {
    data: BarDiagramValue[];
    isLoading: boolean;
    error: ModelErrorResponse | null | undefined;
}

/**
 * Хук для получения и преобразования данных о среднем времени выполнения заказов водителями
 * Преобразует ModelDriverAverageTimeResponse[] в BarDiagramValue[]
 */
export const useDriverAverageTime = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsDriversAverageTime(
        { date_from: period.dateFrom, date_to: period.dateTo },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDriverAverageTimeResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((driver) => driver.driverName && driver.averageTimeMinutes !== undefined)
            .map((driver) => ({
                BarName: driver.driverName || 'Неизвестный водитель',
                BarValue: {
                    'Среднее время (мин)': Math.round((driver.averageTimeMinutes || 0) * 10) / 10,
                },
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о заказах водителей по типам груза (без веса)
 * Преобразует ModelDriverOrdersResponse[] в BarDiagramValue[]
 */
export const useDriverOrdersByTypes = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsDriversOrdersByTypes(
        { date_from: period.dateFrom, date_to: period.dateTo, isWithWeight: false },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDriverOrdersResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((driver) => driver.driverName && driver.cargoTypes)
            .map((driver) => ({
                BarName: driver.driverName || 'Неизвестный водитель',
                BarValue: Object.fromEntries(
                    Object.entries(driver.cargoTypes || {}).map(([key, value]) => [key, Math.round(value)])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о заказах водителей по типам груза (с весом)
 * Преобразует ModelDriverOrdersResponse[] в BarDiagramValue[]
 */
export const useDriverOrdersByTypesWithWeight = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsDriversOrdersByTypes(
        { date_from: period.dateFrom, date_to: period.dateTo, isWithWeight: true },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDriverOrdersResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((driver) => driver.driverName && driver.cargoTypes)
            .map((driver) => ({
                BarName: driver.driverName || 'Неизвестный водитель',
                BarValue: Object.fromEntries(
                    Object.entries(driver.cargoTypes || {}).map(([key, value]) => [key, Math.round(value)])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о поступлениях заказов ИЗ цехов по типам груза
 * Преобразует ModelDepartIncomingResponse[] в BarDiagramValue[]
 */
export const useWorkshopIncomingOut = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsWorkshopsIncoming(
        { date_from: period.dateFrom, date_to: period.dateTo, isIn: false },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDepartIncomingResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((depart) => depart.departName && depart.cargoTypes)
            .map((depart) => ({
                BarName: depart.departName || 'Неизвестный цех',
                BarValue: Object.fromEntries(
                    Object.entries(depart.cargoTypes || {}).map(([key, value]) => [key, value])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о поступлениях заказов ИЗ цехов по типам груза с разбивкой по зданиям
 * Преобразует ModelDepartIncomingResponse[] в BarDiagramValue[]
 */
export const useWorkshopIncomingOutByBuildings = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsWorkshopsIncomingByBuildings(
        { date_from: period.dateFrom, date_to: period.dateTo, isIn: false },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDepartIncomingResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((depart) => depart.departName && depart.cargoTypes)
            .map((depart) => ({
                BarName: depart.departName || 'Неизвестный цех',
                BarValue: Object.fromEntries(
                    Object.entries(depart.cargoTypes || {}).map(([key, value]) => [key, value])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о поступлениях заказов В цеха по типам груза
 * Преобразует ModelDepartIncomingResponse[] в BarDiagramValue[]
 */
export const useWorkshopIncomingIn = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsWorkshopsIncoming(
        { date_from: period.dateFrom, date_to: period.dateTo, isIn: true },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDepartIncomingResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((depart) => depart.departName && depart.cargoTypes)
            .map((depart) => ({
                BarName: depart.departName || 'Неизвестный цех',
                BarValue: Object.fromEntries(
                    Object.entries(depart.cargoTypes || {}).map(([key, value]) => [key, value])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

/**
 * Хук для получения и преобразования данных о поступлениях заказов В цеха по типам груза с разбивкой по зданиям
 * Преобразует ModelDepartIncomingResponse[] в BarDiagramValue[]
 */
export const useWorkshopIncomingInByBuildings = (
    period: period
): UseDiagramValueReturn => {
    const { data: apiData, isLoading, error } = useGetAnalyticsWorkshopsIncomingByBuildings(
        { date_from: period.dateFrom, date_to: period.dateTo, isIn: true },
        {
            query: {
                enabled: !!period.dateFrom && !!period.dateTo,
                select: (response) => (response?.data ?? response) as ModelDepartIncomingResponse[],
            },
        }
    );

    const data = useMemo(() => {
        if (!apiData) return [];
        return apiData
            .filter((depart) => depart.departName && depart.cargoTypes)
            .map((depart) => ({
                BarName: depart.departName || 'Неизвестный цех',
                BarValue: Object.fromEntries(
                    Object.entries(depart.cargoTypes || {}).map(([key, value]) => [key, value])
                ),
            }));
    }, [apiData]);

    return { data, isLoading, error };
};

interface UseDiagramValuesProps {
    driverAverageTimePeriod: period;
    driverTypesPeriod: period;
    driverTypesWithWeightPeriod: period;
    workShopTypesOutPeriod: period;
    workShopTypesWithBuildOutPeriod: period;
    workShopTypesInPeriod: period;
    workShopTypesWithBuildInPeriod: period;
}

interface UseDiagramValuesReturn {
    driverAverageTime: UseDiagramValueReturn;
    driverTypes: UseDiagramValueReturn;
    driverTypesWithWeight: UseDiagramValueReturn;
    workShopTypesOut: UseDiagramValueReturn;
    workShopTypesWithBuildOut: UseDiagramValueReturn;
    workShopTypesIn: UseDiagramValueReturn;
    workShopTypesWithBuildIn: UseDiagramValueReturn;
}

/**
 * Композитный хук для получения всех данных диаграмм
 * Объединяет все отдельные хуки в один для удобства использования
 */
export const useDiagramValues = (props: UseDiagramValuesProps): UseDiagramValuesReturn => {
    const driverAverageTime = useDriverAverageTime(props.driverAverageTimePeriod);
    const driverTypes = useDriverOrdersByTypes(props.driverTypesPeriod);
    const driverTypesWithWeight = useDriverOrdersByTypesWithWeight(props.driverTypesWithWeightPeriod);
    const workShopTypesOut = useWorkshopIncomingOut(props.workShopTypesOutPeriod);
    const workShopTypesWithBuildOut = useWorkshopIncomingOutByBuildings(props.workShopTypesWithBuildOutPeriod);
    const workShopTypesIn = useWorkshopIncomingIn(props.workShopTypesInPeriod);
    const workShopTypesWithBuildIn = useWorkshopIncomingInByBuildings(props.workShopTypesWithBuildInPeriod);

    return {
        driverAverageTime,
        driverTypes,
        driverTypesWithWeight,
        workShopTypesOut,
        workShopTypesWithBuildOut,
        workShopTypesIn,
        workShopTypesWithBuildIn,
    }
}
