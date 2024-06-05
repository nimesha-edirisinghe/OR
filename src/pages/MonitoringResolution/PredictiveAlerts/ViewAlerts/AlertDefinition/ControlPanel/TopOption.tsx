import { Box, HStack, RadioGroup, Stack } from '@chakra-ui/react';
import AppDateRangePicker from 'components/AppDateCalendar/Pickers/AppDateRangePicker';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppCustomDropdown from 'components/newTheme/AppCustomDropdown/AppCustomDropdown';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { addMonths } from 'date-fns';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blue_500, neutral_200, ocean_blue_600 } from 'theme/colors';
import { generateOptions, historyOptions } from './helper';
import { InfluencingFactorTypes } from 'types/groupConfig';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import useTooltip from 'hooks/useTooltip';
import {
  alertSliceSelector,
  setAggregateOption,
  toggleGraphPanel,
  updateGraphDateRange,
  resetViewForecast
} from 'state/pages/monitoringAndResolution/Alert/alertState';

interface TopOptionProps {}

const TopOption: FC<TopOptionProps> = () => {
  const alertState = useSelector(alertSliceSelector);
  const aggregateOption = alertState.aggregateOption;
  const graphDateRange = alertState.graphDateRange;
  const dispatch = useDispatch();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [isExpandTooltipOpen, handleExpandMouseEnter, handleExpandMouseLeave] = useTooltip();

  const onSelectHandler = (item: string) => {
    dispatch(
      setAggregateOption({
        type: '',
        item: item === aggregateOption.selectedAggregateOption ? 'sku' : item
      })
    );
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

  const onSelectPredictorHandler = (item: string, index?: number, groupName?: string) => {
    const selectedPredictorType = groupName?.toLocaleLowerCase() as InfluencingFactorTypes;
    const influencingFactor = 'influencingFactor';
    dispatch(
      setAggregateOption({
        type:
          item === aggregateOption.compareSelection &&
          aggregateOption.selectedAggregateOption === influencingFactor &&
          aggregateOption.predictorType == selectedPredictorType
            ? ''
            : influencingFactor,
        item:
          item === aggregateOption.compareSelection &&
          aggregateOption.selectedAggregateOption === influencingFactor &&
          aggregateOption.predictorType == selectedPredictorType
            ? 'sku'
            : item,
        predictorType:
          item === aggregateOption.compareSelection &&
          aggregateOption.selectedAggregateOption === influencingFactor &&
          aggregateOption.predictorType == selectedPredictorType
            ? undefined
            : selectedPredictorType
      })
    );
    setSelectedGroupIndex(index || 0);
  };

  const onRangeSelect = (startDate: Date, endDate: Date) => {
    dispatch(updateGraphDateRange({ startDate: startDate, endDate: endDate }));
  };

  const generatedOption = generateOptions(alertState?.predictorList?.list!);
  const selectedHistoryValue = historyOptions?.find(
    (opt) => opt.label === aggregateOption.compareSelection
  )?.value;

  const getValueFromLabel = (selectedLabel: string): string | undefined => {
    if (generatedOption) {
      for (const group of generatedOption) {
        const foundOption = group.options.find((option) => option.label === selectedLabel);
        if (foundOption) {
          return foundOption.value;
        }
      }
      return undefined;
    }
  };

  const onClickMinimizeHandler = () => {
    dispatch(toggleGraphPanel());
    dispatch(resetViewForecast());
  };

  const selectedValue1 = getValueFromLabel(aggregateOption?.compareSelection!);

  return (
    <HStack w="full" justify={'space-between'}>
      <HStack w="full" justify={'space-between'}>
        <HStack w="full" justify="left">
          <RadioGroup value={aggregateOption.selectedAggregateOption!}>
            <Stack direction="row">
              <AppCustomDropdown
                colorScheme={neutral_200}
                handleItemClick={onSelectHandler}
                selectedItem="Anchor Forecast"
                buttonWidth="auto"
                isEnableAction
                radioValue="anchor"
                isSelected={aggregateOption.selectedAggregateOption === 'anchor'}
              />
            </Stack>
          </RadioGroup>
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
          />
          <AppCustomDropdown
            options={generatedOption}
            colorScheme={neutral_200}
            handleItemClick={onSelectPredictorHandler}
            selectedItem={selectedValue1!}
            defaultValue="Influencing Factors"
            buttonWidth="200px"
            isEnableAction
            radioValue="predictor"
            isSelected={aggregateOption.selectedAggregateOption === 'influencingFactor'}
            isGroup
            selectedGroupIndex={selectedGroupIndex}
          />
        </HStack>
      </HStack>
      <HStack spacing="8px">
        <AppTooltip label="Calendar" placement="bottom-start">
          <Box>
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
                />
              }
              onRangeSelect={onRangeSelect}
              initialDate1={addMonths(new Date(), -1)}
              initialDate2={new Date()}
              selectedDateRange={graphDateRange}
              prePos={{ x: 0, y: 20 }}
            />
          </Box>
        </AppTooltip>

        <AppTooltip
          label="Collapse"
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
                  name={'collapse'}
                  stroke={blue_500}
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={onClickMinimizeHandler}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
      </HStack>
    </HStack>
  );
};

export default TopOption;
