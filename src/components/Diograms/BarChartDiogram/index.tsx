// src/components/BarChartWidget.tsx
import React from 'react';
import Chart from 'react-apexcharts';

type Props = {
  title: string;
};

export const BarChartWidget: React.FC<Props> = ({ title }) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'bar-chart',
      type: 'bar', // Указываем тип диаграммы
    },
    title: {
      text: title, // Заголовок диаграммы
    },
    xaxis: {
      categories: ['Категория A', 'Категория B', 'Категория C', 'Категория D'], // Подписи по оси X
    },
    legend: {
      position: 'bottom', // Позиция легенды
      horizontalAlign: 'center',
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} единиц`, // Форматирование значений в тултипе
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4, // Скругление столбцов
      }
    },
    dataLabels: {
      enabled: false, // Отключаем отображение значений на столбцах
    },
  };

  const chartSeries = [
    {
      name: 'Значения',
      data: [30, 40, 35, 50], // Данные для столбцов
    },
  ];

  return (
    <div className="chart-container">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar" // Тип диаграммы
        height="350" // Высота диаграммы
      />
    </div>
  );
};

