import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { StatisticWidget } from './StatisticWidget';
import { WorkshopIncomingWidget } from './WorkshopIncomingWidget';
import { WorkshopOutgoingWidget } from './WorkshopOutgoingWidget';
//import type { WorkshopData } from '../Diagrams';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from "./WidgetManager.module.css"
import '../Diagrams/GlobalDiagramStyles.css'; 

const ResponsiveGridLayout = WidthProvider(Responsive);

const MIN_WIDTH_PERCENT = 3;
/*
// Моковые данные для сегментированной диаграммы "Поступление заказов из цехов по типам"
const mockWorkshopDataFrom: WorkshopData[] = [
  {
    workshopId: "41",
    cargoTypes: {
      "Бытовые отходы": 14,
      "Стружка": 2,
      "Вода": 2,
      "Детали": 91,
      "Материалы, комплектующие, ПКИ": 3,
      "Инструменты, оснастка": 3,
      "Прочее": 8,
      "Сборочные единицы": 14,
    }
  },
  {
    workshopId: "43",
    cargoTypes: {
      "Бытовые отходы": 6,
      "Готовая продукция": 5,
      "Детали": 2,
      "Материалы, комплектующие, ПКИ": 5,
      "Производственные отходы": 2,
    }
  },
  {
    workshopId: "44",
    cargoTypes: {
      "Детали": 40,
      "Сборочные единицы": 4,
      "Производственные отходы": 4,
    }
  },
  {
    workshopId: "45",
    cargoTypes: {
      "Детали": 25,
      "Готовая продукция": 15,
      "Материалы, комплектующие, ПКИ": 8,
    }
  },
  {
    workshopId: "46",
    cargoTypes: {
      "Бытовые отходы": 10,
      "Детали": 30,
      "Производственные отходы": 5,
    }
  },
  {
    workshopId: "51",
    cargoTypes: {
      "Детали": 50,
      "Сборочные единицы": 20,
      "Инструменты, оснастка": 5,
    }
  },
  {
    workshopId: "52",
    cargoTypes: {
      "Готовая продукция": 35,
      "Окончательные сборки": 15,
      "Детали": 10,
    }
  },
  {
    workshopId: "58",
    cargoTypes: {
      "Детали": 28,
      "Материалы, комплектующие, ПКИ": 12,
      "Прочее": 5,
    }
  },
  {
    workshopId: "59",
    cargoTypes: {
      "Сборочные единицы": 18,
      "Детали": 22,
      "Вода": 3,
    }
  },
  {
    workshopId: "6",
    cargoTypes: {
      "Детали": 45,
      "Готовая продукция": 20,
      "Стружка": 5,
    }
  },
  {
    workshopId: "61",
    cargoTypes: {
      "Бытовые отходы": 8,
      "Детали": 35,
      "Производственные отходы": 7,
    }
  },
  {
    workshopId: "945",
    cargoTypes: {
      "Детали": 15,
      "Материалы, комплектующие, ПКИ": 10,
      "Прочее": 3,
    }
  },
];

// Моковые данные для сегментированной диаграммы "Поступление заказов в цеха по типам"
const mockWorkshopDataTo: WorkshopData[] = [
  {
    workshopId: "41",
    cargoTypes: {
      "Вода": 2,
      "Детали": 53,
      "Производственные отходы": 9,
      "Окончательные сборки": 13,
    }
  },
  {
    workshopId: "43",
    cargoTypes: {
      "Детали": 20,
      "Материалы, комплектующие, ПКИ": 15,
      "Готовая продукция": 8,
    }
  },
  {
    workshopId: "44",
    cargoTypes: {
      "Детали": 35,
      "Сборочные единицы": 12,
      "Инструменты, оснастка": 5,
    }
  },
  {
    workshopId: "45",
    cargoTypes: {
      "Детали": 28,
      "Готовая продукция": 18,
      "Материалы, комплектующие, ПКИ": 10,
    }
  },
  {
    workshopId: "46",
    cargoTypes: {
      "Детали": 25,
      "Производственные отходы": 8,
      "Прочее": 4,
    }
  },
  {
    workshopId: "52",
    cargoTypes: {
      "Готовая продукция": 30,
      "Окончательные сборки": 20,
      "Детали": 15,
    }
  },
  {
    workshopId: "58",
    cargoTypes: {
      "Детали": 32,
      "Материалы, комплектующие, ПКИ": 15,
      "Сборочные единицы": 8,
    }
  },
  {
    workshopId: "59",
    cargoTypes: {
      "Детали": 20,
      "Сборочные единицы": 15,
      "Вода": 5,
    }
  },
  {
    workshopId: "6",
    cargoTypes: {
      "Детали": 40,
      "Готовая продукция": 25,
      "Инструменты, оснастка": 8,
    }
  },
  {
    workshopId: "61",
    cargoTypes: {
      "Детали": 30,
      "Производственные отходы": 10,
      "Прочее": 5,
    }
  },
  {
    workshopId: "64",
    cargoTypes: {
      "Детали": 18,
      "Материалы, комплектующие, ПКИ": 12,
      "Готовая продукция": 8,
    }
  },
  {
    workshopId: "9",
    cargoTypes: {
      "Детали": 22,
      "Сборочные единицы": 10,
      "Прочее": 3,
    }
  },
  {
    workshopId: "945",
    cargoTypes: {
      "Детали": 12,
      "Материалы, комплектующие, ПКИ": 8,
      "Окончательные сборки": 5,
    }
  },
];
*/
export const Dashboard = () => {
  const widgetWidth = 6;
  const widgetHeight = 5; 
  
  const [layout] = useState<Layout[]>([
    { i: 'widget1', x: 0, y: 0, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget2', x: widgetWidth, y: 0, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget3', x: 0, y: widgetHeight, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget4', x: widgetWidth, y: widgetHeight, w: widgetWidth, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget5', x: 0, y: widgetHeight * 2, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget6', x: 0, y: widgetHeight * 3, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget7', x: 0, y: widgetHeight * 4, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget8', x: 0, y: widgetHeight * 5, w: widgetWidth * 2, h: widgetHeight, minW: MIN_WIDTH_PERCENT, minH: 4 },
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
        <div key="widget5">
          <WorkshopIncomingWidget 
            title="Поступление заказов из цехов по типам"
            xAxisLabel="Цех (откуда)"
            yAxisLabel="Количество"
            isWithBuildings={false}
          />
        </div>
        <div key="widget6">
          <WorkshopIncomingWidget 
            title="Поступление заказов из цехов по типам и корпусам"
            xAxisLabel="Корпус-Цех (откуда)"
            yAxisLabel="Количество"
            isWithBuildings={true}
          />
        </div>
        <div key="widget7">
          <WorkshopOutgoingWidget 
            title="Поступление заказов в цеха по типам"
            xAxisLabel="Цех (куда)"
            yAxisLabel="Количество"
            isWithBuildings={false}
          />
        </div>
        <div key="widget8">
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