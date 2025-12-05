import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { StatisticWidget } from './StatisticWidget';
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
    { i: 'widget1', x: 0, y: 0, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget2', x: widgetWidth, y: 0, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget3', x: 0, y: widgetHeight, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget4', x: widgetWidth, y: widgetHeight, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
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
          <StatisticWidget chartType="bar" title="Заказы по водителям" />
        </div>
        <div key="widget2">
          <StatisticWidget chartType="donut" title="Распределение заказов" />
        </div>
        <div key="widget3">
          <StatisticWidget chartType="bar" title="Статистика по месяцам" />
        </div>
        <div key="widget4">
          <StatisticWidget chartType="donut" title="Типы грузов" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};