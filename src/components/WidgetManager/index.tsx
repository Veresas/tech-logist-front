import { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { StatisticWidget } from './StatisticWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from "./WidgetManager.module.css"
import '../Diagrams/GlobalDiagramStyles.css'; 

const ResponsiveGridLayout = WidthProvider(Responsive);

// 20% от 12 колонок = 2.4, округляем до 3 для минимума
const MIN_WIDTH_PERCENT = 3; // ~25% (немного больше 20% для удобства)
const DEFAULT_WIDTH = 6; // 50% по умолчанию

export const Dashboard = () => {
  const [layout, setLayout] = useState<Layout[]>([
    { i: 'widget1', x: 0, y: 0, w: DEFAULT_WIDTH, h: 5, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget2', x: DEFAULT_WIDTH, y: 0, w: DEFAULT_WIDTH, h: 5, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget3', x: 0, y: 5, w: DEFAULT_WIDTH, h: 5, minW: MIN_WIDTH_PERCENT, minH: 4 },
    { i: 'widget4', x: DEFAULT_WIDTH, y: 5, w: DEFAULT_WIDTH, h: 5, minW: MIN_WIDTH_PERCENT, minH: 4 },
  ]);

    const handleLayoutChange = useCallback((currentLayout: Layout[]) => {
    // Группируем элементы по строкам (y координата)
    const rows = new Map<number, Layout[]>();
    
    currentLayout.forEach(item => {
      const y = item.y;
      if (!rows.has(y)) {
        rows.set(y, []);
      }
      rows.get(y)!.push(item);
    });

    const updatedLayout: Layout[] = [];
    const maxWidth = 12 - MIN_WIDTH_PERCENT; // Максимум для первого элемента (второй минимум)
    
    // Обрабатываем каждую строку
    rows.forEach((rowItems) => {
      if (rowItems.length === 2) {
        // Если в строке два элемента
        const [first, second] = rowItems.sort((a, b) => a.x - b.x);
        
        if (first.w > maxWidth) {
          // Первый элемент слишком большой - перемещаем второй вниз
          const maxY = Math.max(
            ...currentLayout.map(l => l.y + l.h),
            ...updatedLayout.map(l => l.y + l.h),
            0
          );
          
          updatedLayout.push({
            ...first,
            w: 12,
            x: 0,
          });
          
          updatedLayout.push({
            ...second,
            y: maxY,
            x: 0,
            w: 12,
          });
        } else {
          // Второй элемент сжимается до минимума, если нужно
          const totalWidth = first.w + second.w;
          if (totalWidth > 12) {
            // Если суммарная ширина больше 12, сжимаем второй до минимума
            updatedLayout.push({
              ...first,
            });
            
            updatedLayout.push({
              ...second,
              w: MIN_WIDTH_PERCENT,
              x: first.x + first.w,
            });
          } else {
            // Оставляем как есть
            updatedLayout.push(first, second);
          }
        }
      } else {
        // Если в строке не два элемента, оставляем как есть
        updatedLayout.push(...rowItems);
      }
    });
    
    setLayout(updatedLayout);
  }, []);

  const layoutConfig = {
    className: styles.layout,
    layouts: { lg: layout },
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 50,
    margin: [16, 16] as [number, number],
    containerPadding: [16, 16] as [number, number],
    isDraggable: true,
    draggableHandle: '.dragHandle',
    isResizable: true,
    compactType: 'vertical' as const, // Автоматическое перемещение элементов вниз
    preventCollision: false, // Разрешаем временные перекрытия при изменении размера
    onLayoutChange: handleLayoutChange,
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