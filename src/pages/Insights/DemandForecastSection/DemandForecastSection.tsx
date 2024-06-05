import { Box, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import AppDateRangePicker from 'components/AppDateCalendar/Pickers/AppDateRangePicker';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import DemandForecastChart from './DemandForecastChart';
import {
  IInsight,
  getDemandForecastDataRequest,
  insightSliceSelector,
  onUpdateFilterOptions
} from 'state/pages/insights/insightState';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorToast } from 'state/toast/toastState';
import { addMonths, differenceInDays, format } from 'date-fns';
import InsightCard from '../InsightCard/InsightCard';
import CardTitle from '../InsightCard/CardTitle';
import DirectionIndicator from '../InsightCard/DirectionIndicator';
import { produce } from 'immer';

interface Props {}

const DemandForecastSection: FC<Props> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const dfCardState = insightState.demandForecastCardData;
  const filterOptions = insightState.dashboardFilter.filterOptions;
  const filterLocalScope = insightState.dashboardFilter.filterLocalScope;
  const duration = filterOptions.duration;
  const dispatch = useDispatch();

  const onRangeSelect = (startDate: Date, endDate: Date) => {
    const dateRange = differenceInDays(endDate, startDate);
    if (Math.abs(dateRange) < 30) {
      showErrorToast('The minimum period between two dates must not less than 30 days.');
      return;
    }

    const strStartDate = format(startDate, 'yyyy-MM-dd').toString();
    const strEndDate = format(endDate, 'yyyy-MM-dd').toString();

    const _filterOptions = produce(filterOptions, (draft) => {
      draft.duration = {
        startDate: strStartDate,
        endDate: strEndDate
      };
    });

    dispatch(onUpdateFilterOptions(_filterOptions));
    dispatch(getDemandForecastDataRequest(false));
  };

  const getMaxForecastedDate = (): Date => {
    const _date: Date = new Date(filterLocalScope.maxDate);
    new Date(filterLocalScope.maxDate);
    return new Date(_date.setDate(_date.getDate() + 7));
  };

  return (
    <Box
      overflow="auto"
      w="full"
      height="full"
      bgColor="insights-section-bg-color"
      borderRadius="10px"
      py="20px"
      px="24px"
      userSelect="none"
    >
      <HStack w="full">
        <Box w="full">
          <DemandForecastChart from="insight" />
        </Box>
        <VStack h="511px" minW="400px">
          <HStack>
            <AppText fontSize="13px" fontWeight={500}>
              Date Range: From
            </AppText>
            <AppInput
              bg="#000000"
              border="none"
              w="105px"
              h="38px"
              fontSize="12px"
              value={duration?.startDate}
              onChange={(e) => console.log('start_date', e.target.value)}
            />
            <AppText fontSize="13px" fontWeight={500}>
              To
            </AppText>
            <AppInput
              color="white"
              border="none"
              bg="#000000"
              w="105px"
              h="38px"
              fontSize="12px"
              value={duration?.endDate}
              onChange={(e) => console.log('end_date', e.target.value)}
            />
            <AppDateRangePicker
              id={1}
              children={<AppIconChakra name="calender" fill="#F7CC45" />}
              onRangeSelect={onRangeSelect}
              validMaxDate={getMaxForecastedDate()}
              initialDate1={addMonths(new Date(), -1)}
              initialDate2={new Date()}
            />
          </HStack>
          <HStack w="full" pt="50px">
            <InsightCard
              title={<CardTitle title="Forecasted Total Demand" subTitle="Next 4 weeks" />}
              hasSARPrefix={false}
              sar={dfCardState?.forecastedTotalDemand ? dfCardState?.forecastedTotalDemand.sar : 0}
              pwDir={
                <DirectionIndicator
                  direction={dfCardState?.forecastedTotalDemand?.cw_pw_dir}
                  arrowColor={
                    dfCardState?.forecastedTotalDemand?.cw_pw_dir === '0' ? '#D11E27' : '#28A54D'
                  }
                  percentage={dfCardState?.forecastedTotalDemand?.cw_pw_per}
                  desc={`${
                    dfCardState?.forecastedTotalDemand?.cw_pw_per !== 'undefined' ? '%' : ''
                  } vs the previous 4 weeks`}
                />
              }
              splyDir={
                <DirectionIndicator
                  direction={dfCardState?.forecastedTotalDemand?.cy_sply_dir}
                  arrowColor={
                    dfCardState?.forecastedTotalDemand?.cy_sply_dir === '0' ? '#D11E27' : '#28A54D'
                  }
                  percentage={dfCardState?.forecastedTotalDemand?.cy_sply_per}
                  desc={`${
                    dfCardState?.forecastedTotalDemand?.cy_sply_per !== 'undefined' ? '%' : ''
                  } vs SPLYr`}
                />
              }
            />
          </HStack>
          <HStack w="full" pt="10px">
            <InsightCard
              title={<CardTitle title="Forecasting Accuracy" subTitle="Last 4 weeks" />}
              sar={
                dfCardState?.avgForecastingError && dfCardState?.avgForecastingError.cw_pw_per
                  ? `${dfCardState.avgForecastingError.cw_pw_per}${
                      dfCardState?.avgForecastingError.cw_pw_per !== 'undefined' ? '%' : ''
                    }`
                  : '0 %'
              }
              hasSARPrefix={false}
              contentAlign="center"
            />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default DemandForecastSection;
