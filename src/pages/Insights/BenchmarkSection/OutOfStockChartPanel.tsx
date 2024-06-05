import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import InsightChart from '../InsightChart/InsightChart';
import { InsightReportDataI } from 'types/insight';

interface OutOfStockChartPanelProps {
  title: string;
  isEnableValQtyController: boolean;
  isEnableBenchmark: boolean;
  reportData: InsightReportDataI[];
  benchmarkOption?: string;
}

const OutOfStockChartPanel: FC<OutOfStockChartPanelProps> = ({
  title,
  reportData,
  isEnableBenchmark,
  benchmarkOption
}) => {
  return (
    <VStack h="full" w="full" align="start">
      <AppText size="16_600">{title}</AppText>
      <Box h="511px" w="full">
        <InsightChart
          reportData={reportData}
          isEnableBenchmark={isEnableBenchmark}
          actualDataKey="actual_qty"
          projectionDataKey="proj_qty"
          benchmarkDataKey={benchmarkOption === 'sply' ? 'benchmark_sply' : 'benchmark_dep'}
          benchmarkName={benchmarkOption === 'sply' ? 'Same period last year' : 'At Deployment'}
        />
      </Box>
    </VStack>
  );
};

export default OutOfStockChartPanel;
