import { useState, useMemo } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { StatisticWidget } from '../StatisticWidget';
import { useGetAnalyticsWorkshopsIncoming } from '../../../api/analytics/analytics/analytics';
import type { ModelDepartIncomingResponse } from '../../../api/analytics/model';

type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';

const getPeriodDates = (period: PeriodType, customRange?: [Dayjs | null, Dayjs | null] | null): { dateFrom: string; dateTo: string } => {
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

type WorkshopIncomingWidgetProps = {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

export const WorkshopIncomingWidget = ({
  title = 'Поступление заказов из цехов по типам',
  xAxisLabel = 'Цех (откуда)',
  yAxisLabel = 'Количество',
}: WorkshopIncomingWidgetProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('week');
  const [customDateRange, setCustomDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);

  const { dateFrom, dateTo } = useMemo(
    () => getPeriodDates(selectedPeriod, customDateRange),
    [selectedPeriod, customDateRange]
  );

  const { data: apiData, isLoading, error } = useGetAnalyticsWorkshopsIncoming(
    { date_from: dateFrom, date_to: dateTo },
    {
      query: {
        enabled: !!dateFrom && !!dateTo,
        select: (response) => (response?.data ?? response) as ModelDepartIncomingResponse[],
      },
    }
  );

  const workshopData: ModelDepartIncomingResponse[] = useMemo(() => {
    if (!apiData) return [];
    return (apiData);
  }, [apiData]);

  const subtitle = useMemo(() => {
    if (selectedPeriod === 'custom' && customDateRange && customDateRange[0] && customDateRange[1]) {
      return `Период: ${customDateRange[0].format('DD.MM.YYYY')} — ${customDateRange[1].format('DD.MM.YYYY')}`;
    }
    const { dateFrom: from, dateTo: to } = getPeriodDates(selectedPeriod);
    return `Период: ${dayjs(from).format('DD.MM.YYYY')} — ${dayjs(to).format('DD.MM.YYYY')}`;
  }, [selectedPeriod, customDateRange]);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
  };

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setCustomDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      setSelectedPeriod('custom');
    }
  };

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Ошибка загрузки данных: {error.error || 'Неизвестная ошибка'}</p>
      </div>
    );
  }

  return (
    <StatisticWidget
      chartType="stackedBar"
      title={title}
      subtitle={subtitle}
      stackedBarData={workshopData}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      selectedPeriod={selectedPeriod}
      customDateRange={customDateRange}
      onPeriodChange={handlePeriodChange}
      onDateRangeChange={handleDateRangeChange}
      isLoading={isLoading}
    />
  );
};
