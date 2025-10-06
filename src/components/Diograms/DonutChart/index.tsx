// src/components/DonutChartWidget.tsx
import React from 'react';
import Chart from 'react-apexcharts';

type Props = {
  title: string;
};

export const DonutChartWidget: React.FC<Props> = ({ title }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'donut-chart',
      type: 'donut', // Указываем тип диаграммы
    },
    title: {
      text: title, // Заголовок диаграммы
    },
    labels: ['Сегмент 1', 'Сегмент 2', 'Сегмент 3', 'Сегмент 4'], // Подписи сегментов
    legend: {
      position: 'right', // Позиция легенды
      offsetY: 0,
      height: 230,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`, // Форматирование значений в тултипе
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Размер отверстия в центре (для понятности)
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200, // Адаптивность для маленьких экранов
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const chartSeries = [44, 55, 13, 43]; // Данные для сегментов (в процентах или относительных значениях)

  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut" // Тип диаграммы
        height="350" // Высота диаграммы
      />
    </div>
  );
};