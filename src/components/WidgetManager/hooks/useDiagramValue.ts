import type { BarDiagramValue } from "../StatisticWidget/types";

interface DiagramValueHooksReturn {
    DriverAverageTime: BarDiagramValue[]
    DriverTypes: BarDiagramValue[]
    DriverTypesWithWeight: BarDiagramValue[]
    WorkShopTypesOut: BarDiagramValue[]
    WorkShopTypesWithBuildOut: BarDiagramValue[]
    WorkShopTypesIn: BarDiagramValue[]
    WorkShopTypesWithBuildIn: BarDiagramValue[]
}

export const useDiagramValues = ():DiagramValueHooksReturn => {
    
}