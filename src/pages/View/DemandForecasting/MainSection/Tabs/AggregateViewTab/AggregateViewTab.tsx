import { FC, useRef, useState } from 'react';
import { Box, Center, HStack, Skeleton, VStack } from '@chakra-ui/react';
import {
  dfViewSliceSelector,
  setAggregateOption,
  setTableStatus,
  toggleGraphPanel,
  updateGraphDateRange
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppText from 'components/newTheme/AppText/AppText';
import { blue_500, neutral_200, neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import ChartPanel from '../../ChartPanel/ChartPanel';
import GridPanel from '../../GridPanel/GridPanel';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppDateRangePicker from 'components/AppDateCalendar/Pickers/AppDateRangePicker';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { addMonths } from 'date-fns';
import useTooltip from 'hooks/useTooltip';
import AppCustomDropdown from 'components/newTheme/AppCustomDropdown/AppCustomDropdown';
import { historyOptions } from '../../ControlPanel/helper';

interface AggregateViewTabProps {
  skuMaximized: boolean;
}

const AggregateViewTab: FC<AggregateViewTabProps> = ({ skuMaximized }) => {
  const [scroll, setScroll] = useState<string>('hidden');
  const dfViewState = useSelector(dfViewSliceSelector);
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const selectedSkuListLen = dfViewState.selectedSkuList.length;
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const isSelectedSkuListEmpty = dfViewState.selectedSkuList?.length === 0 || false;
  const graphDateRange = dfViewState.graphDateRange;
  const aggregatedCount = (isAllSkuSelected ? totalSkuCount : selectedSkuListLen) || 0;
  const isGraphPanelOpen = dfViewState.isGraphPanelOpen;
  const [isExpandTooltipOpen, handleExpandMouseEnter, handleExpandMouseLeave] = useTooltip();
  const aggregateOption = dfViewState.aggregateOption;

  const dispatch = useDispatch();

  const ref: any = useRef();
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const selectedHistoryValue =
    aggregateOption.selectedAggregateOption === 'history'
      ? historyOptions?.find((opt) => opt.label === aggregateOption.compareSelection)?.value
      : undefined;

  const setCoordHandler = () => {
    const { x, y, width, height } = ref.current.getBoundingClientRect();
    let calcX = x - width * 12;
    calcX -= 18;
    setPosition({
      x: calcX,
      y: y + height
    });
  };

  const onRangeSelect = (startDate: Date, endDate: Date) => {
    dispatch(updateGraphDateRange({ startDate: startDate, endDate: endDate }));
  };

  const onClickExpandGraphView = () => {
    dispatch(toggleGraphPanel());
    dispatch(setTableStatus(false));
  };

  const onSelectHistoryHandler = (item: string) => {
    dispatch(
      setAggregateOption({
        type:
          item === aggregateOption.compareSelection &&
          aggregateOption.selectedAggregateOption === 'history'
            ? ''
            : 'history',
        item:
          item === aggregateOption.compareSelection &&
          aggregateOption.selectedAggregateOption === 'history'
            ? 'sku'
            : item
      })
    );
  };

  return (
    <VStack
      spacing="20px"
      h="full"
      w="full"
      overflowX={'hidden'}
      overflowY={'scroll'}
      __css={scrollbarYStyles}
    >
      <VStack w="full" h="full" transition="all 0.1s ease-in" spacing={0} borderBottomRadius="8px">
        {dfViewState.selectedSkuList?.length > 0 && dfViewState.selectedSku?.forecastKey && (
          <Skeleton
            isLoaded={dfViewState.loading.graphDataLoading}
            w="full"
            borderBottomRadius="10px"
          >
            <HStack w="full" justify="space-between" mb="16px">
              <HStack>
                <AppCustomDropdown
                  options={historyOptions}
                  colorScheme={neutral_200}
                  handleItemClick={onSelectHistoryHandler}
                  selectedItem={selectedHistoryValue!}
                  buttonWidth="auto"
                  isEnableAction
                  radioValue="history"
                  isSelected={aggregateOption.selectedAggregateOption === 'history'}
                  defaultValue="History"
                  isDisabled={isSelectedSkuListEmpty}
                />
              </HStack>
              <HStack spacing="8px" justify="right">
                <AppTooltip label="Calendar" placement="bottom-start" position="relative">
                  <Box>
                    <AppDateRangePicker
                      id={1}
                      children={
                        <Box ref={ref}>
                          <AppIconButton
                            aria-label="calender"
                            icon={
                              <AppIcon
                                transition="transform 0.25s ease"
                                name="calender"
                                fill={blue_500}
                              />
                            }
                            variant="secondary"
                            size="iconMedium"
                            onClick={setCoordHandler}
                            bg={ocean_blue_600}
                            isDisabled={isSelectedSkuListEmpty}
                          />
                        </Box>
                      }
                      onRangeSelect={onRangeSelect}
                      initialDate1={addMonths(new Date(), -1)}
                      initialDate2={new Date()}
                      selectedDateRange={graphDateRange}
                      prePos={{ x: position.x, y: position.y }}
                    />
                  </Box>
                </AppTooltip>

                <AppTooltip
                  label={isGraphPanelOpen ? 'Collapse' : 'Expand'}
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
                      onClick={onClickExpandGraphView}
                      bg={ocean_blue_600}
                      isDisabled={isSelectedSkuListEmpty}
                    />
                  </Box>
                </AppTooltip>
              </HStack>
            </HStack>
            <HStack
              w="full"
              bg={ocean_blue_500}
              minH={'52px'}
              borderTopRadius="8px"
              px={'20px'}
              justify={'space-between'}
            >
              <AppText size={'body2'} color={neutral_200}>
                Aggregated view of {aggregatedCount} Forecast
              </AppText>
            </HStack>
            <Box
              overflowX={'hidden'}
              overflowY={'scroll'}
              __css={scrollbarYStyles}
              onMouseOver={() => setScroll('auto')}
              onMouseLeave={() => setScroll('hidden')}
              bg={ocean_blue_600}
              h={'calc(100vh - 263px)'}
              borderBottomRadius="10px"
            >
              <VStack w="full" p="16px" pl={'18px'}>
                {dfViewState?.graphData.length !== 0 ? (
                  <VStack w={'full'} h={'full'}>
                    <ChartPanel chartHeight="calc(100vh - 330px)" />
                    <Box w="full" mt="-35px !important">
                      <GridPanel />
                    </Box>
                  </VStack>
                ) : (
                  <VStack
                    h="calc(100vh - 295px)"
                    w="full"
                    bg={ocean_blue_500}
                    borderRadius="8px"
                    justify="center"
                  >
                    <AppText size="italic" color={neutral_500} fontStyle="italic">
                      No forecast is available for the selected SKU location
                    </AppText>
                  </VStack>
                )}
              </VStack>
            </Box>
          </Skeleton>
        )}
        {dfViewState.selectedSkuList?.length === 0 && (
          <Skeleton isLoaded={dfViewState.loading.graphDataLoading} w="full" borderRadius="10px">
            <Box
              overflow={scroll}
              borderRadius="10px"
              h="calc(100vh - 211px)"
              __css={scrollbarYStyles}
              minW="full"
              onMouseOver={() => setScroll('auto')}
              onMouseLeave={() => setScroll('hidden')}
              bg="#0A1922"
            >
              <Center h="full">
                <AppText size="italic" color={neutral_500} fontStyle="italic">
                  Please select a SKU-location to view the forecast here
                </AppText>
              </Center>
            </Box>
          </Skeleton>
        )}
        {dfViewState.selectedSkuList?.length && !dfViewState.selectedSku?.forecastKey && (
          <Center h="full">
            <AppText size="italic" color={neutral_500} fontStyle="italic">
              No forecast available
            </AppText>
          </Center>
        )}
      </VStack>
    </VStack>
  );
};

export default AggregateViewTab;
