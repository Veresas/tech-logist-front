import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
//import type { WorkshopData } from '../Diagrams';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from "./WidgetManager.module.css"
import '../Diagrams/GlobalDiagramStyles.css'; 
import type { period } from './types';
import { useDiagramValues } from './hooks/useDiagramValue';
import { StatisticWidget } from './StatisticWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const MIN_WIDTH_PERCENT = 3;

export const WidgetManager = () => {
  const widgetWidth = 6;
  const widgetHeight = 5; 
  
  const [ driverAverageTimePeriod, setDriverAverageTimePeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ driverTypesPeriod, setDriverTypesPeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ driverTypesWithWeightPeriod, setDriverTypesWithWeightPeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ workShopTypesOutPeriod, setWorkShopTypesOutPeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ workShopTypesWithBuildOutPeriod, setWorkShopTypesWithBuildOutPeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ workShopTypesInPeriod, setWorkShopTypesInPeriod] = useState<period>({dateFrom: "", dateTo: ""})
  const [ workShopTypesWithBuildInPeriod, setWorkShopTypesWithBuildInPeriod] = useState<period>({dateFrom: "", dateTo: ""})

  const { 
    driverAverageTime,
    driverTypes,
    driverTypesWithWeight,
    workShopTypesOut,
    workShopTypesWithBuildOut,
    workShopTypesIn,
    workShopTypesWithBuildIn
  } = useDiagramValues({
    driverAverageTimePeriod,
    driverTypesPeriod,
    driverTypesWithWeightPeriod,
    workShopTypesOutPeriod,
    workShopTypesWithBuildOutPeriod,
    workShopTypesInPeriod,
    workShopTypesWithBuildInPeriod
  })

  const [layout] = useState<Layout[]>([
    { i: 'widget1', x: 0, y: 0, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget2', x: 0, y: widgetHeight, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget3', x: 0, y: widgetHeight * 2, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget4', x: 0, y: widgetHeight * 3, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget5', x: 0, y: widgetHeight * 4, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget6', x: 0, y: widgetHeight * 5, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget7', x: 0, y: widgetHeight * 6, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
  ]);

  const layoutConfig = {
    className: styles.layout,
    layouts: { lg: layout },
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50,
    margin: [22, 22] as [number, number],
    containerPadding: [22, 22] as [number, number],
    isDraggable: true,
    draggableHandle: '.dragHandle',
    isResizable: true,
    preventCollision: false,
  };

  return (
    <div className={styles.app}>
      <ResponsiveGridLayout {...layoutConfig}>
        <div key="widget1">
          <StatisticWidget
            title="Статистика заказов по водителям и типам груза (количество)"
            chartType="stackedBar"
            xAxisLabel="Водитель"
            yAxisLabel="Количество заказов"
            setPeriod={setDriverTypesPeriod}
            stackedBarData={driverTypes.data}
            isLoading={driverTypes.isLoading}
          />
        </div>
        <div key="widget2">
          <StatisticWidget 
            title="Статистика заказов по водителям и типам груза (вес)"
            chartType="stackedBar"
            xAxisLabel="Водитель"
            yAxisLabel="Вес груза (кг)"
            setPeriod={setDriverTypesWithWeightPeriod}
            stackedBarData={driverTypesWithWeight.data}
            isLoading={driverTypesWithWeight.isLoading}
          />
        </div>
        <div key="widget3">
          <StatisticWidget 
            title="Среднее время выполнения заказов водителями"
            chartType="stackedBar"
            xAxisLabel="Водитель"
            yAxisLabel="Время (минуты)"
            setPeriod={setDriverAverageTimePeriod}
            stackedBarData={driverAverageTime.data}
            isLoading={driverAverageTime.isLoading}
          />
        </div>
        <div key="widget4">
          <StatisticWidget 
            title="Поступление заказов из цехов по типам"
            chartType="stackedBar"
            xAxisLabel="Цех (откуда)"
            yAxisLabel="Количество"
            setPeriod={setWorkShopTypesOutPeriod}
            stackedBarData={workShopTypesOut.data}
            isLoading={workShopTypesOut.isLoading}
          />
        </div>
        <div key="widget5">
          <StatisticWidget 
            title="Поступление заказов из цехов по типам и корпусам"
            chartType="stackedBar"
            xAxisLabel="Корпус-Цех (откуда)"
            yAxisLabel="Количество"
            setPeriod={setWorkShopTypesWithBuildOutPeriod}
            stackedBarData={workShopTypesWithBuildOut.data}
            isLoading={workShopTypesWithBuildOut.isLoading}
          />
        </div>
        <div key="widget6">
          <StatisticWidget 
            title="Поступление заказов в цеха по типам"
            chartType="stackedBar"
            xAxisLabel="Цех (куда)"
            yAxisLabel="Количество"
            setPeriod={setWorkShopTypesInPeriod}
            stackedBarData={workShopTypesIn.data}
            isLoading={workShopTypesIn.isLoading}
          />
        </div>
        <div key="widget7">
          <StatisticWidget 
            title="Поступление заказов в цеха по типам и корпусам"
            chartType="stackedBar"
            xAxisLabel="Корпус-Цех (куда)"
            yAxisLabel="Количество"
            setPeriod={setWorkShopTypesWithBuildInPeriod}
            stackedBarData={workShopTypesWithBuildIn.data}
            isLoading={workShopTypesWithBuildIn.isLoading}
          />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};