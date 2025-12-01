// src/components/BarChartWidget.tsx
import Chart from 'react-apexcharts';
import diagram_styles from "../Diagrams.module.css"

type Props = {
  title: string;
};

export const BarChartWidget = ({ title }: Props) => {
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      id: 'bar-chart',
      type: 'bar', // Указываем тип диаграммы
      toolbar: {
        show: false, // Скрываем тулбар
      },
    },
    title: {
      text: title, // Заголовок диаграммы
    },
    xaxis: {
      categories: ['Категория A', 'Категория B', 'Категория C', 'Категория D'], // Подписи по оси X
    },
    legend: {
      show: true, // Явно включаем легенду
      position: 'bottom', // Позиция легенды внизу
      horizontalAlign: 'center',
      offsetY: 0,
      offsetX: 0,
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
    <div className={diagram_styles.chartContainer}>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar" // Тип диаграммы
        height="100%" // Высота диаграммы
      />
    </div>
  );
};

