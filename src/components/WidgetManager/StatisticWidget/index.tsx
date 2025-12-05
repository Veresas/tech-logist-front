import { useState } from 'react';
import { Button, DatePicker, ConfigProvider } from 'antd';
import type { Dayjs } from 'dayjs';
import { DownOutlined } from '@ant-design/icons';
import { BarChartWidget, DonutChartWidget } from '../../Diagrams';
import styles from './StatisticWidget.module.css';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const { RangePicker } = DatePicker;

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';
type ChartType = 'bar' | 'donut';

type StatisticWidgetProps = {
  chartType?: ChartType;
  title?: string;
};

export const StatisticWidget = ({ chartType = 'bar', title = 'Заказы по водителям' }: StatisticWidgetProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('week');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const handlePeriodChange = (period: PeriodType) => {
    if (period === 'custom') {
      setSelectedPeriod(period);
      setShowCustomCalendar(true);
      // Открываем календарь после рендера
      setTimeout(() => {
        setCalendarOpen(true);
      }, 0);
    } else {
      setShowCustomCalendar(false);
      setCalendarOpen(false);
      setSelectedPeriod(period);
      // Здесь будет обновление данных диаграммы
      console.log('Период изменен на:', period);
    }
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setCustomDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      // Здесь будет обновление данных диаграммы
      console.log('Выбран период:', dates[0].format('DD.MM.YYYY'), '-', dates[1].format('DD.MM.YYYY'));
    }
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
            <div className={styles.periodRow}>
              <Button
                className={`${styles.periodButton} ${selectedPeriod === 'day' ? styles.active : ''}`}
                onClick={() => handlePeriodChange('day')}
                type="text"
              >
                День
              </Button>
              <Button
                className={`${styles.periodButton} ${selectedPeriod === 'week' ? styles.active : ''}`}
                onClick={() => handlePeriodChange('week')}
                type="text"
              >
                Неделя
              </Button>
            </div>
            <div className={styles.periodRow}>
              <Button
                className={`${styles.periodButton} ${selectedPeriod === 'month' ? styles.active : ''}`}
                onClick={() => handlePeriodChange('month')}
                type="text"
              >
                Месяц
              </Button>
              <Button
                className={`${styles.periodButton} ${selectedPeriod === 'year' ? styles.active : ''}`}
                onClick={() => handlePeriodChange('year')}
                type="text"
              >
                Год
              </Button>
            </div>
            <div className={styles.customPeriodWrapper}>
              <Button
                className={`${styles.periodButton} ${styles.customPeriod} ${selectedPeriod === 'custom' ? styles.active : ''}`}
                onClick={() => handlePeriodChange('custom')}
                type="text"
                icon={<DownOutlined className={showCustomCalendar ? styles.rotatedIcon : ''} />}
                iconPosition="end"
              >
                Свой период
              </Button>
              {showCustomCalendar && (
                <div className={styles.calendarContainer}>
                  <ConfigProvider locale={ruRU}>
                    <RangePicker
                      value={customDateRange}
                      onChange={handleDateRangeChange}
                      format="DD.MM.YYYY"
                      placeholder={['Начало периода', 'Конец периода']}
                      className={styles.dateRangePicker}
                      open={calendarOpen}
                      getPopupContainer={() => document.body}
                      onOpenChange={(open) => {
                        setCalendarOpen(open);
                        if (!open) {
                          setShowCustomCalendar(false);
                        }
                      }}
                    />
                  </ConfigProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

