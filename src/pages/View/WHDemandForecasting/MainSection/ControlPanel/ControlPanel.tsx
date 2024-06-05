import { Box, HStack, VStack } from '@chakra-ui/react';
import AppDateRangePicker from 'components/AppDateCalendar/Pickers/AppDateRangePicker';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { addMonths } from 'date-fns';
import useTooltip from 'hooks/useTooltip';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  demandForecastChartRequest,
  whDfViewSliceSelector,
  updateGraphDateRange,
  IWhDFView
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
import { blue_500, ocean_blue_600 } from 'theme/colors';

interface Props {
  isGraphPanelOpen: boolean;
  onMaxMinHandler: () => void;
}

const ControlPanel: FC<Props> = ({ isGraphPanelOpen, onMaxMinHandler }) => {
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const dispatch = useDispatch();
  const [isExpandTooltipOpen, handleExpandMouseEnter, handleExpandMouseLeave] = useTooltip();
  const [isCalenderTooltipOpen, handleCalenderMouseEnter, handleCalenderMouseLeave] = useTooltip();
  const aggregateOption = dfViewState.aggregateOption;
  const graphDateRange = dfViewState.graphDateRange;
  const isSelectedSkuListEmpty = dfViewState.selectedSkuList?.length === 0 || false;

  const onRangeSelect = (startDate: Date, endDate: Date) => {
    dispatch(updateGraphDateRange({ startDate: startDate, endDate: endDate }));
  };

  useEffect(() => {
    if (!isSelectedSkuListEmpty)
      dispatch(demandForecastChartRequest({ chartType: aggregateOption.selectedAggregateOption! }));
  }, [aggregateOption, graphDateRange]);

  return (
    <VStack w="full" pb="16px" borderTopRadius="8px">
      <HStack w="full">
        <HStack w="full" justify="end">
          <AppTooltip
            label="Calendar"
            placement="bottom-start"
            isOpen={isCalenderTooltipOpen}
            onClose={handleCalenderMouseLeave}
          >
            <Box onMouseEnter={handleCalenderMouseEnter} onMouseLeave={handleCalenderMouseLeave}>
              <AppDateRangePicker
                id={1}
                children={
                  <AppIconButton
                    aria-label="calender"
                    icon={
                      <AppIcon transition="transform 0.25s ease" name="calender" fill={blue_500} />
                    }
                    variant="secondary"
                    size="iconMedium"
                    onClick={() => {}}
                    bg={ocean_blue_600}
                    isDisabled={isSelectedSkuListEmpty}
                  />
                }
                onRangeSelect={onRangeSelect}
                initialDate1={addMonths(new Date(), -1)}
                initialDate2={new Date()}
                selectedDateRange={graphDateRange}
                prePos={{ x: 0, y: 235 }}
              />
            </Box>
          </AppTooltip>
          <AppTooltip
            label="Expand"
            placement="bottom-start"
            isOpen={isExpandTooltipOpen}
            onClose={handleExpandMouseLeave}
          >
            <Box onMouseEnter={handleExpandMouseEnter} onMouseLeave={handleExpandMouseLeave}>
              <AppIconButton
                aria-label="maximize"
                icon={
                  <AppIcon
                    transition="transform 0.25s ease"
                    name={isGraphPanelOpen ? 'collapse' : 'expand'}
                    fill={blue_500}
                  />
                }
                variant="secondary"
                size="iconMedium"
                onClick={onMaxMinHandler}
                bg={ocean_blue_600}
                isDisabled={isSelectedSkuListEmpty}
              />
            </Box>
          </AppTooltip>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ControlPanel;
