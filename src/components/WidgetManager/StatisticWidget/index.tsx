import { useState } from 'react';
import { BarChartWidget, DonutChartWidget } from '../../Diagrams';
import styles from './StatisticWidget.module.css';

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';
type ChartType = 'bar' | 'donut';

type StatisticWidgetProps = {
  chartType?: ChartType;
  title?: string;
};

export const StatisticWidget = ({ chartType = 'bar', title = 'Заказы по водителям' }: StatisticWidgetProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('week');

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
    // Здесь будет обновление данных диаграммы
    console.log('Период изменен на:', period);
  };

  const renderChart = () => {
    if (chartType === 'donut') {
      return <DonutChartWidget title={title} />;
    }
    return <BarChartWidget title={title} />;
  };

  return (
    <div className={styles.widget}>
      <div className="dragHandle" title="Перетащить виджет">
        <span className={styles.dragIcon}>⋮⋮</span>
      </div>
      <div className={styles.chartSection}>
        {renderChart()}
      </div>
      <div className={styles.controlsSection}>
        <div className={styles.periodSelector}>
          <h3 className={styles.controlsTitle}>Выбор периода</h3>
          <div className={styles.periodButtons}>
            <button
              className={`${styles.periodButton} ${selectedPeriod === 'day' ? styles.active : ''}`}
              onClick={() => handlePeriodChange('day')}
              type="button"
            >
              День
            </button>
            <button
              className={`${styles.periodButton} ${selectedPeriod === 'week' ? styles.active : ''}`}
              onClick={() => handlePeriodChange('week')}
              type="button"
            >
              Неделя
            </button>
            <button
              className={`${styles.periodButton} ${selectedPeriod === 'month' ? styles.active : ''}`}
              onClick={() => handlePeriodChange('month')}
              type="button"
            >
              Месяц
            </button>
            <button
              className={`${styles.periodButton} ${selectedPeriod === 'year' ? styles.active : ''}`}
              onClick={() => handlePeriodChange('year')}
              type="button"
            >
              Год
            </button>
            <button
              className={`${styles.periodButton} ${selectedPeriod === 'custom' ? styles.active : ''}`}
              onClick={() => handlePeriodChange('custom')}
              type="button"
            >
              Свой период
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

