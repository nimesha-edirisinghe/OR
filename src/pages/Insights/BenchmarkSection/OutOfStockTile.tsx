import { FC } from 'react';
import { Box, FlexProps, Skeleton } from '@chakra-ui/react';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';
import { useSelector } from 'react-redux';
import OutOfStockChartPanel from './OutOfStockChartPanel';

interface OutOfStockPercentTileProps extends FlexProps {}

const OutOfStockPercentTile: FC<OutOfStockPercentTileProps> = ({ ...rest }) => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  return (
    <Skeleton
      w="full"
      height="full"
      borderRadius="10px"
      isLoaded={!insightState.isLoading}
      fadeDuration={1}
      speed={1}
      {...rest}
    >
      <Box
        overflow="auto"
        w="full"
        height="full"
        bgColor="insights-section-bg-color"
        borderRadius="10px"
        py="20px"
        px="24px"
        h="521px"
        userSelect="none"
      >
        <OutOfStockChartPanel
          title="Out of Stock %"
          isEnableValQtyController={false}
          benchmarkOption={insightState.benchmarkOption}
          reportData={insightState.outOfStockPercentData}
          isEnableBenchmark
        />
      </Box>
    </Skeleton>
  );
};

export default OutOfStockPercentTile;
