// src/App.tsx
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { BarChartWidget, DonutChartWidget } from '../Diograms';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard: React.FC = () => {
  const [layout] = useState([
    { i: 'bar', x: 0, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
    { i: 'donut', x: 6, y: 0, w: 6, h: 4, minW: 4, minH: 3 },
  ]);

  // Обработчик изменения макета (опционально)
  //const onLayoutChange = (currentLayout: any) => {
    // console.log('Layout changed:', currentLayout);
    //setLayout(currentLayout);
  //};

  // Опции для ResponsiveGridLayout
  const layoutConfig = {
    className: 'layout',
    layouts: { lg: layout }, // Используем начальный макет как lg (large)
   // onLayoutChange: onLayoutChange,
    // breakpoints и cols можно настроить по необходимости
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50, // Высота строки в px
    isDraggable: true,
    isResizable: true,
    // isBounded: true, // Ограничивать ли перетаскивание границами контейнера
    // compactType: 'vertical', // Как компоновать элементы
  };

  return (
    <div className="App">
      <h1>Панель управления</h1>
      <ResponsiveGridLayout {...layoutConfig}>
        <div key="bar" className="widget">
          <BarChartWidget title="Столбчатая диаграмма" />
        </div>
        <div key="donut" className="widget">
          <DonutChartWidget title="Круговая диаграмма (Пончик)" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};