import { FC } from 'react';
import { Box, Flex, FlexProps, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import BenchmarkChartPanel from './InventoryChartPanel';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';

interface InventoryTileProps extends FlexProps {}

const InventoryTile: FC<InventoryTileProps> = ({ ...rest }) => {
  const insightState: IInsight = useSelector(insightSliceSelector);

  return (
    <Flex direction="column" {...rest} userSelect="none">
      <Skeleton
        w="full"
        borderRadius="10px"
        isLoaded={!insightState.isLoading}
        fadeDuration={1}
        speed={1}
      >
        <Box
          bgColor="insights-section-bg-color"
          overflow="auto"
          w="full"
          borderRadius="10px"
          py="16px"
          px="24px"
          h="521px"
        >
          <BenchmarkChartPanel
            title="Inventory"
            isEnableValQtyController
            benchmarkOption={insightState.benchmarkOption}
            reportData={insightState.invReportData}
            isEnableBenchmark
          />
        </Box>
      </Skeleton>
    </Flex>
  );
};

export default InventoryTile;
