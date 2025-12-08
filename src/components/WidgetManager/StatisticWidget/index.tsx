import { useState, useEffect, useMemo } from 'react';
import { Button, DatePicker, ConfigProvider, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import { DownOutlined, ExpandOutlined } from '@ant-design/icons';
import { BarChartWidget, DonutChartWidget, StackedBarChartWidget } from '../../Diagrams';
import styles from './StatisticWidget.module.css';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { BarDiagramValue } from './types';
import type { period } from '../types';

dayjs.locale('ru');

const { RangePicker } = DatePicker;

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';
type ChartType = 'bar' | 'donut' | 'stackedBar';

type StatisticWidgetProps = {
  chartType: ChartType;
  setPeriod: React.Dispatch<React.SetStateAction<period>>
  title: string;
  stackedBarData: BarDiagramValue[];
  xAxisLabel: string;
  yAxisLabel: string;
  isLoading: boolean;
};

export const StatisticWidget = ({ 
  chartType = 'bar', 
  title = 'Заказы по водителям',
  setPeriod,
  stackedBarData,
  xAxisLabel,
  yAxisLabel,
  isLoading = false,
}: StatisticWidgetProps) => {
  const [internalSelectedPeriod, setInternalSelectedPeriod] = useState<PeriodType>('day');
  const [showCustomCalendar, setShowCustomCalendar] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [internalCustomDateRange, setInternalCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedPeriod =  internalSelectedPeriod;
  const customDateRange = internalCustomDateRange; 

  const getPeriodDates = (period: PeriodType, customRange?: [Dayjs | null, Dayjs | null] | null): period => {
    const now = dayjs();
    let dateFrom: Dayjs;
    let dateTo: Dayjs = now.endOf('day');
  
    if (period === 'custom' && customRange && customRange[0] && customRange[1]) {
      dateFrom = customRange[0].startOf('day');
      dateTo = customRange[1].endOf('day');
    } else if (period === 'day') {
      dateFrom = now.startOf('day');
    } else if (period === 'week') {
      dateFrom = now.subtract(7, 'day').startOf('day');
    } else if (period === 'month') {
      dateFrom = now.subtract(1, 'month').startOf('day');
    } else if (period === 'year') {
      dateFrom = now.subtract(1, 'year').startOf('day');
    } else {
      dateFrom = now.subtract(7, 'day').startOf('day');
    }
    
    return {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
    };
  };

  const subtitle = useMemo(() => {
    if (selectedPeriod === 'custom' && customDateRange && customDateRange[0] && customDateRange[1]) {
      return `Период: ${customDateRange[0].format('DD.MM.YYYY')} — ${customDateRange[1].format('DD.MM.YYYY')}`;
    }
    const { dateFrom: from, dateTo: to } = getPeriodDates(selectedPeriod, customDateRange);
    return `Период: ${dayjs(from).format('DD.MM.YYYY')} — ${dayjs(to).format('DD.MM.YYYY')}`;
  }, [selectedPeriod, customDateRange]);

  useEffect(() => {
    if (selectedPeriod === 'custom' && customDateRange && customDateRange[0] && customDateRange[1]) {
      setPeriod({
        dateFrom: customDateRange[0].startOf('day').toISOString(),
        dateTo: customDateRange[1].endOf('day').toISOString()
      });
    } else {
      const periodDates = getPeriodDates(selectedPeriod);
      setPeriod(periodDates);
    }
  }, [selectedPeriod, customDateRange]);

  useEffect(() => {
    if (selectedPeriod === 'custom') {
      setShowCustomCalendar(true);
    } else {
      setShowCustomCalendar(false);
      setCalendarOpen(false);
    }
  }, [selectedPeriod]);

  const handlePeriodChange = (period: PeriodType) => {

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
    }
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {

    setInternalCustomDateRange(dates);
  };

  const renderChart = (isFullscreen = false) => {
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
          isFullscreen={isFullscreen}
        />
      );
    }
    return <BarChartWidget title={title} />;
  };

  const renderWidgetContent = (isFullscreen = false) => (
    <>
      {!isFullscreen && (
        <Button
          className={styles.expandButton}
          type="text"
          icon={<ExpandOutlined />}
          onClick={() => setIsModalOpen(true)}
          title="Развернуть виджет"
        />
      )}
      <div className={styles.chartSection}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p>Загрузка данных...</p>
          </div>
        ) : (
          renderChart(isFullscreen)
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
                iconPlacement="end"
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
    </>
  );

  return (
    <>
      <div className={styles.widget}>
        <div className="dragHandle" title="Перетащить виджет">
          <span className={styles.dragIcon}></span>
        </div>
        {renderWidgetContent(false)}
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="100%"
        style={{ top: 0, paddingBottom: 0 }}
        className={styles.fullscreenModal}
        styles={{
          body: { height: '100vh', padding: '24px' }
        }}
      >
        <div className={styles.fullscreenWidget}>
          {renderWidgetContent(true)}
        </div>
      </Modal>
    </>
  );
};

