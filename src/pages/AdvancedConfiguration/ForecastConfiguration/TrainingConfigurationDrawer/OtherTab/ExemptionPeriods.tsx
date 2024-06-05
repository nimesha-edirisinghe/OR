import { VStack, HStack, Box } from '@chakra-ui/layout';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  addNewExemptionPeriod,
  removeExemptionPeriod,
  updateExemptionPeriod
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { differenceInDays, format } from 'date-fns';
import { showErrorToast } from 'state/toast/toastState';
import {
  blue_500,
  ocean_blue_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  red_400
} from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppDateRangePicker from 'components/AppDateCalendar/Pickers/AppDateRangePicker';
import { AppIconChakra } from 'assets/svg/chakraIcons';

const ExemptionPeriods: FC = () => {
  const dispatch = useDispatch();
  const exemptionPeriods =
    useSelector(fcConfigPageSliceSelector).trainingConfigData.algorithmSettings
      .advanced_configurations.exemption_periods;
  const exemptionPeriodsCheckboxChecked =
    useSelector(fcConfigPageSliceSelector).trainingConfigLocalScope.exemptionPeriodsCheckboxChecked;

  const onAddExemptionPeriod = () => {
    dispatch(addNewExemptionPeriod());
  };

  const onRemoveExemptionPeriod = (index: number) => {
    dispatch(removeExemptionPeriod(index));
  };

  const onUpdateExemptionPeriod = (
    field: 'start_date' | 'end_date',
    index: number,
    value: string
  ) => {
    dispatch(updateExemptionPeriod({ field, index, value }));
  };

  const onRangeSelect = (startDate: Date, endDate: Date, key: number) => {
    const dateRange = differenceInDays(endDate, startDate);
    if (dateRange > 14) {
      showErrorToast('The maximum period between two dates must not exceed 14 days.');
      return;
    }
    const strStartDate = format(startDate, 'yyyy-MM-dd').toString();
    const strEndDate = format(endDate, 'yyyy-MM-dd').toString();
    onUpdateExemptionPeriod('start_date', key, strStartDate);
    onUpdateExemptionPeriod('end_date', key, strEndDate);
  };
  return (
    <VStack
      w="full"
      bg={ocean_blue_400}
      borderRadius="6px"
      align="start"
      transition="all 2s ease"
      gap="8px"
      p="8px"
    >
      <VStack align="start">
        <HStack spacing={0}>
          <AppText fontSize="12px" fontWeight="400">
            Date range
          </AppText>
          <AppText fontSize="12px" fontWeight="400" color={red_400}>
            *
          </AppText>
        </HStack>

        {exemptionPeriods.map((exemption, key) => (
          <HStack key={key}>
            <HStack position="relative">
              <AppInput
                w="490px"
                h="36px"
                isDisabled={!exemptionPeriodsCheckboxChecked}
                type="text"
                fontSize="14px"
                fontWeight={400}
                color={ocean_blue_300}
                _disabled={{ backgroundColor: ocean_blue_500 }}
                value={`${exemption.start_date} ${exemption.start_date && 'to'} ${
                  exemption.end_date
                }`}
                borderRadius="8px"
                p="10px 8px 10px 12px"
                onChange={(e) => onUpdateExemptionPeriod('start_date', key, e.target.value)}
              />
              <Box position="absolute" right={2}>
                <AppDateRangePicker
                  id={key}
                  children={<AppIconChakra name="calender" fill={blue_500} />}
                  onRangeSelect={onRangeSelect}
                  prePos={{ x: -473, y: 8 }}
                />
              </Box>
            </HStack>

            {exemptionPeriods.length > 1 && (
              <Box
                transition=".1s"
                cursor="pointer"
                w="36px"
                h="36px"
                borderRadius="8px"
                p="8px"
                bg={ocean_blue_600}
                onClick={() => onRemoveExemptionPeriod(key)}
              >
                <AppIcon name="minus" fill={blue_500} w="full" h="1.67px" />
              </Box>
            )}
          </HStack>
        ))}
        {exemptionPeriods.length - 1 < 3 && (
          <HStack
            cursor="pointer"
            w="534px"
            h="36px"
            borderRadius="8px"
            p="10px 14px 10px 14px"
            bg={ocean_blue_600}
            onClick={onAddExemptionPeriod}
            gap="8px"
            justifyContent="center"
            alignContent="center"
          >
            <AppIcon name="plus" fill={blue_500} w="9.33px" h="9.33px" />
            <AppText color={blue_500} fontSize="13px" fontWeight={400}>
              Add
            </AppText>
          </HStack>
        )}
      </VStack>
    </VStack>
  );
};

export default ExemptionPeriods;
