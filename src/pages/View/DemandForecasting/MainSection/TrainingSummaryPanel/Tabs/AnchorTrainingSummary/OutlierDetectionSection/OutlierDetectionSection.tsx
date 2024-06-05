import { Box, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import OutlierDetectionChart from 'pages/View/OutlierDetectionChart/OutlierDetectionChart';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IDFView, dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { OutlierDetectionChartDataI } from 'types/responses/viewResponses';

interface Props {}

const OutlierDetectionSection: FC<Props> = () => {
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const trainingSummaryDataState = dfViewState.trainingSummaryData;
  const isOutlierDetected = dfViewState.trainingSummaryData?.outputLayerInfo.outlier_detection;

  const outlierDetectionChartData: OutlierDetectionChartDataI[] =
    trainingSummaryDataState?.outlierGraph || [];

  return (
    <VStack
      w="full"
      h="224px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="start"
      spacing="8px"
    >
      <HStack spacing="4px">
        <AppText size="caption" color={ocean_blue_50}>
          Outlier Detection
        </AppText>
        <AppText size="h4Semibold" color={neutral_100}>
          {isOutlierDetected ? 'Yes' : 'No'}
        </AppText>
      </HStack>
      <Box w="full" h="full">
        {outlierDetectionChartData && outlierDetectionChartData.length > 0 && (
          <OutlierDetectionChart reportData={outlierDetectionChartData} />
        )}
      </Box>
    </VStack>
  );
};

export default OutlierDetectionSection;
