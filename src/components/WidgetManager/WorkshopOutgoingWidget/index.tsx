import { WorkshopIncomingWidget } from '../WorkshopIncomingWidget';

type WorkshopOutgoingWidgetProps = {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  isWithBuildings?: boolean;
};

export const WorkshopOutgoingWidget = ({
  title = 'Поступление заказов в цеха по типам',
  xAxisLabel = 'Цех (куда)',
  yAxisLabel = 'Количество',
  isWithBuildings = false,
}: WorkshopOutgoingWidgetProps) => {
  return (
    <WorkshopIncomingWidget
      title={title}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      isWithBuildings={isWithBuildings}
      isIn={true}
    />
  );
};
