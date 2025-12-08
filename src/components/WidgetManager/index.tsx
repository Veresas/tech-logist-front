import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { DriverOrdersByTypesWidget } from './DriverOrdersByTypesWidget';
import { DriverAverageTimeWidget } from './DriverAverageTimeWidget';
import { WorkshopIncomingWidget } from './WorkshopIncomingWidget';
import { WorkshopOutgoingWidget } from './WorkshopOutgoingWidget';
//import type { WorkshopData } from '../Diagrams';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from "./WidgetManager.module.css"
import '../Diagrams/GlobalDiagramStyles.css'; 

const ResponsiveGridLayout = WidthProvider(Responsive);

const MIN_WIDTH_PERCENT = 3;

export const Dashboard = () => {
  const widgetWidth = 6;
  const widgetHeight = 5; 
  
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
      <h1>Панель управления</h1>
      <ResponsiveGridLayout {...layoutConfig}>
        <div key="widget1">
          <DriverOrdersByTypesWidget 
            title="Статистика заказов по водителям и типам груза (количество)"
            xAxisLabel="Водитель"
            yAxisLabel="Количество заказов"
            isWithWeight={false}
          />
        </div>
        <div key="widget2">
          <DriverOrdersByTypesWidget 
            title="Статистика заказов по водителям и типам груза (вес)"
            xAxisLabel="Водитель"
            yAxisLabel="Вес груза (кг)"
            isWithWeight={true}
          />
        </div>
        <div key="widget3">
          <DriverAverageTimeWidget 
            title="Среднее время выполнения заказов водителями"
            xAxisLabel="Водитель"
            yAxisLabel="Время (минуты)"
          />
        </div>
        <div key="widget4">
          <WorkshopIncomingWidget 
            title="Поступление заказов из цехов по типам"
            xAxisLabel="Цех (откуда)"
            yAxisLabel="Количество"
            isWithBuildings={false}
          />
        </div>
        <div key="widget5">
          <WorkshopIncomingWidget 
            title="Поступление заказов из цехов по типам и корпусам"
            xAxisLabel="Корпус-Цех (откуда)"
            yAxisLabel="Количество"
            isWithBuildings={true}
          />
        </div>
        <div key="widget6">
          <WorkshopOutgoingWidget 
            title="Поступление заказов в цеха по типам"
            xAxisLabel="Цех (куда)"
            yAxisLabel="Количество"
            isWithBuildings={false}
          />
        </div>
        <div key="widget7">
          <WorkshopOutgoingWidget 
            title="Поступление заказов в цеха по типам и корпусам"
            xAxisLabel="Корпус-Цех (куда)"
            yAxisLabel="Количество"
            isWithBuildings={true}
          />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};