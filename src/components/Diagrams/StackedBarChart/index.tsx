import Chart from 'react-apexcharts';
import diagram_styles from "../Diagrams.module.css"
import type { BarDiagramValue } from '../../WidgetManager/StatisticWidget/types';

type Props = {
  title: string;
  subtitle?: string;
  data: BarDiagramValue[];
  colors?: string[]; // Опциональные цвета для типов груза
  xAxisLabel?: string; // Подпись оси X (например, "Цех (откуда)")
  yAxisLabel?: string; // Подпись оси Y (например, "Количество")
};

// Цвета по умолчанию для типов груза
const DEFAULT_COLORS = [
  '#1f77b4', // Темно-синий (Бытовые отходы)
  '#ff7f0e', // Оранжевый (Вода)
  '#2ca02c', // Темно-зеленый (Готовая продукция)
  '#d62728', // Красный (Детали)
  '#9467bd', // Фиолетовый (Инструменты, оснастка)
  '#8c564b', // Коричневый (Материалы, комплектующие, ПКИ)
  '#7f7f7f', // Темно-серый (Окончательные сборки)
  '#bcbd22', // Желто-зеленый (Производственные отходы)
  '#e377c2', // Розовый (Прочее)
  '#17becf', // Голубой (Сборочные единицы)
  '#aec7e8', // Светло-синий (Стружка)
];

export const StackedBarChartWidget = ({ 
  title, 
  subtitle,
  data,
  colors = DEFAULT_COLORS,
  xAxisLabel = 'Цех',
  yAxisLabel = 'Количество'
}: Props) => {
  // Преобразуем данные в формат для ApexCharts
  const categories = data.map(item => item.BarName || '');
  
  // Собираем все уникальные типы груза
  const allBarValue = new Set<string>();
  data.forEach(item => {
    if (item.BarValue) {
      Object.keys(item.BarValue).forEach(type => allBarValue.add(type));
    }
  });
  const BarValueArray = Array.from(allBarValue);

  // Формируем series: для каждого типа груза создаем массив значений по цехам
  const series = BarValueArray.map((cargoType) => ({
    name: cargoType,
    data: data.map(item => (item.BarValue?.[cargoType] || 0) as number),
  }));

  // Вычисляем суммы для каждого столбца (для отображения над столбцами)
  const totals = data.map(item => 
    item.BarValue ? Object.values(item.BarValue).reduce((sum, val) => sum + (val || 0), 0) : 0
  );

  // Вычисляем минимальную ширину диаграммы на основе количества категорий
  // Минимум 70px на категорию для комфортного отображения
  const minChartWidth = Math.max(600, categories.length * 70);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'stacked-bar-chart',
      type: 'bar',
      stacked: true, // Включаем сегментированные столбцы
      toolbar: {
        show: false,
      },
    },
    title: {
      text: title,
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: subtitle,
      style: {
        fontSize: '12px',
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: xAxisLabel,
      },
    },
    yaxis: {
      title: {
        text: yAxisLabel,
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -10,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} единиц`,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            offsetY: 0,
            formatter: (_val?: string, opts?: unknown) => {
              const dataPointIndex = (opts as { dataPointIndex?: number })?.dataPointIndex;
              if (dataPointIndex !== undefined) {
                const total = totals[dataPointIndex];
                return total > 0 ? total.toString() : '';
              }
              return '';
            },
            style: {
              fontSize: '12px',
              fontWeight: 600,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true, // Включаем отображение значений на сегментах
      formatter: (val: number) => val > 0 ? val.toString() : '',
      style: {
        fontSize: '11px',
        fontWeight: 500,
        colors: ['#fff'],
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        blur: 3,
        opacity: 0.5,
      },
    },
    colors: colors.slice(0, series.length), // Используем переданные цвета или цвета по умолчанию
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className={diagram_styles.chartWrapper}>
      <div className={diagram_styles.chartContainer} style={{ width: `${minChartWidth}px` }}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height="100%"
          width={minChartWidth}
        />
      </div>
    </div>
  );
};
