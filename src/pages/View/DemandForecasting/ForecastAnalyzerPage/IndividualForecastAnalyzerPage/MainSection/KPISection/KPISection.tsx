import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import KPICard from '../../../FCAnalyzerCommonComponents/KPICard/KPICard';
import { KPIResponseI } from 'types/responses/view/forecastAnalyzer';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  kpiData: KPIResponseI | null;
}

const KPISection: FC<Props> = ({ kpiData }) => {
  const avgSales = kpiData?.averageSales;
  const medianSales = kpiData?.medianSales;
  const minHistoricalDiscount = kpiData?.minHistoricalDiscount;
  const maxHistoricalDiscount = kpiData?.maxHistoricalDiscount;
  const dataLength = kpiData?.dataLength;
  const frequencyLabel = kpiData?.frequency;

  const formattedAvgSales =
    avgSales !== null && avgSales !== undefined ? numberWithCommaSeparator(avgSales) : '';
  const formattedMedianSales =
    medianSales !== null && medianSales !== undefined ? numberWithCommaSeparator(medianSales) : '';
  const isAlerted = dataLength ? dataLength <= 10 : false;

  return (
    <HStack flex={1} spacing="8px">
      <KPICard name="Average Sales" infoLabel="during last 1 year" value={formattedAvgSales} />
      <KPICard name="Median Sales" infoLabel="during last 1 year" value={formattedMedianSales} />
      <KPICard name="Min. Historical Discount" value={`${minHistoricalDiscount}%`} />
      <KPICard
        name="Max. Historical Discount"
        hiddenOutOfStockDays
        value={`${maxHistoricalDiscount}%`}
      />
      <KPICard
        name="Data Length"
        isAlerted={isAlerted}
        infoLabel={frequencyLabel}
        value={`${dataLength}`}
      />
    </HStack>
  );
};

export default KPISection;
