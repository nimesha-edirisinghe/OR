import { HStack, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import {
  alertSliceSelector,
  AlertForecastChartRequest
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import BottomOption from './BottomOption';
import TopOption from './TopOption';

interface ControlPanelProps {}

const ControlPanel: FC<ControlPanelProps> = ({}) => {
  const alertState = useSelector(alertSliceSelector);
  const aggregateOption = alertState.aggregateOption;
  const graphDateRange = alertState.graphDateRange;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AlertForecastChartRequest({ chartType: aggregateOption.selectedAggregateOption! }));
  }, [aggregateOption, graphDateRange]);

  return (
    <VStack w="full" bg={ocean_blue_600} p="16px" borderTopRadius="8px">
      <HStack justify="space-between" w="full">
        <TopOption />
      </HStack>
      <HStack w="full" bg={ocean_blue_500} justify={'space-between'} p={'12px'}>
        <BottomOption />
      </HStack>
    </VStack>
  );
};

export default ControlPanel;
