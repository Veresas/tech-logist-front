import { useState, useEffect } from 'react';
import { Button, DatePicker, ConfigProvider } from 'antd';
import type { Dayjs } from 'dayjs';
import { DownOutlined } from '@ant-design/icons';
import { BarChartWidget, DonutChartWidget, StackedBarChartWidget } from '../../Diagrams';
import styles from './StatisticWidget.module.css';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { ModelDepartIncomingResponse } from '../../../api/analytics/model';

dayjs.locale('ru');

const { RangePicker } = DatePicker;

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';
type ChartType = 'bar' | 'donut' | 'stackedBar';

type StatisticWidgetProps = {
  chartType?: ChartType;
  title?: string;
  subtitle?: string;
  stackedBarData?: ModelDepartIncomingResponse[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  selectedPeriod?: PeriodType;
  customDateRange?: [Dayjs | null, Dayjs | null] | null;
  onPeriodChange?: (period: PeriodType) => void;
  onDateRangeChange?: (dates: [Dayjs | null, Dayjs | null] | null) => void;
  isLoading?: boolean;
};

export const StatisticWidget = ({ 
  chartType = 'bar', 
  title = 'Заказы по водителям',
  subtitle,
  stackedBarData,
  xAxisLabel,
  yAxisLabel,
  selectedPeriod: externalSelectedPeriod,
  customDateRange: externalCustomDateRange,
  onPeriodChange: externalOnPeriodChange,
  onDateRangeChange: externalOnDateRangeChange,
  isLoading = false,
}: StatisticWidgetProps) => {
  const [internalSelectedPeriod, setInternalSelectedPeriod] = useState<PeriodType>('week');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [internalCustomDateRange, setInternalCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const selectedPeriod = externalSelectedPeriod ?? internalSelectedPeriod;
  const customDateRange = externalCustomDateRange ?? internalCustomDateRange;

  useEffect(() => {
    if (selectedPeriod === 'custom') {
      setShowCustomCalendar(true);
    } else {
      setShowCustomCalendar(false);
      setCalendarOpen(false);
    }
  }, [selectedPeriod]);

  const handlePeriodChange = (period: PeriodType) => {
    if (externalOnPeriodChange) {
      externalOnPeriodChange(period);
      if (period === 'custom') {
        setShowCustomCalendar(true);
        setTimeout(() => {
          setCalendarOpen(true);
        }, 0);
      } else {
        setShowCustomCalendar(false);
        setCalendarOpen(false);
      }
      return;
    }

    if (period === 'custom') {
      setInternalSelectedPeriod(period);
      setShowCustomCalendar(true);
      setTimeout(() => {
        setCalendarOpen(true);
      }, 0);
    } else {
      setShowCustomCalendar(false);
      setCalendarOpen(false);
      setInternalSelectedPeriod(period);
      console.log('Период изменен на:', period);
    }
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (externalOnDateRangeChange) {
      externalOnDateRangeChange(dates);
      return;
    }

    setInternalCustomDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      console.log('Выбран период:', dates[0].format('DD.MM.YYYY'), '-', dates[1].format('DD.MM.YYYY'));
    }
  };

  const renderChart = () => {
    if (chartType === 'donut') {
      return <DonutChartWidget title={title} />;
    }
    if (chartType === 'stackedBar' && stackedBarData) {
      return (
        <StackedBarChartWidget 
          title={title}
          subtitle={subtitle}
          data={stackedBarData}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      );
    }
    return <BarChartWidget title={title} />;
  };

  return (
    <div className={styles.widget}>
      <div className="dragHandle" title="Перетащить виджет">
        <span className={styles.dragIcon}></span>
      </div>
      <div className={styles.chartSection}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Загрузка данных...</p>
          </div>
        ) : (
          renderChart()
        )}
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

