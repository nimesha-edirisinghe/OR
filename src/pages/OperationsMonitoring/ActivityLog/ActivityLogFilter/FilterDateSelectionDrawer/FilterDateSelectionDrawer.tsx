import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFromLocal } from 'utils/localStorage';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  openFilterDrawer,
  toggleFilterDateDrawer,
  updateDashboardFilter,
  updateRightPanelRetainDataList
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import AppRadioButton from '../../../../../components/AppRadioButton/AppRadioButton';
import { initialDateTypesAndValues } from './helper';
import AppDateRangeCalendar from 'components/AppDateCalendar/Calender/AppDateRangeCalendar';
import { getDate, getMonth, getTime, getYear } from 'date-fns';
import { produce } from 'immer';
import AppTimePicker, { TimeType } from 'components/AppTimePicker/AppTimePicker';
import { AM_PM } from 'components/AppTimePicker/AppAMPMSkipper';
import { blue_500, ocean_blue_350, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';

const initialDateRange = {
  startDate: null,
  endDate: null
};

const initialTime = {
  startTime: {
    h: null,
    m: null
  },
  endTime: {
    h: null,
    m: null
  }
};

export interface DateType {
  startDate: null | Date;
  endDate: null | Date;
}

interface Props {
  isOpen: boolean;
}

const FilterDateSelectionDrawer: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dashboardFilter = activityLogState.dashboardFilter;
  const selectedDateTime = dashboardFilter.filterLocalScope.rightPanelRetainDataList.date;
  const beforeEditFilterOptionsLevel2 =
    dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel2;
  const [selectedDateType, setSelectedDateType] = useState(selectedDateTime.dateType);
  const [dateTypes, setDateTypes] = useState(initialDateTypesAndValues);
  const [dateRange, setDateRange] = useState<DateType>(initialDateRange);
  const [time, setTime] = useState<TimeType>(initialTime);
  const [unixTime, setUnixTime] = useState({
    startDateTime: 0,
    endDateTime: 0
  });

  useEffect(() => {
    if (!selectedDateTime.endDate) {
      setTime(initialTime);
      setDateRange(initialDateRange);
      setDateTypes(initialDateTypesAndValues);
      setSelectedDateType(selectedDateTime.dateType);
    }
  }, [selectedDateTime]);

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      const startDateInUnixTime = getTime(
        new Date(
          getYear(dateRange.startDate),
          getMonth(dateRange.startDate),
          getDate(dateRange.startDate),
          time.startTime.h ? time.startTime.h : 0,
          time.startTime.m ? time.startTime.m : 0,
          0
        )
      );
      const endDateInUnixTime = getTime(
        new Date(
          getYear(dateRange.endDate),
          getMonth(dateRange.endDate),
          getDate(dateRange.endDate),
          time.endTime.h ? time.endTime.h : 0,
          time.endTime.m ? time.endTime.m : 0,
          0
        )
      );

      setUnixTime({
        startDateTime: startDateInUnixTime,
        endDateTime: endDateInUnixTime
      });
    }
  }, [dateRange, time]);

  const onChangeDateType = (value: string) => {
    setSelectedDateType(value);
    const _dashboardFilter = produce(dashboardFilter, (draft) => {
      draft.filterLocalScope.rightPanelRetainDataList.date.dateType = value;
    });
    dispatch(updateDashboardFilter(_dashboardFilter));
  };
  const onDrawerClose = () => {
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel2));
    dispatch(toggleFilterDateDrawer({ status: false }));
    onCloseCancelPrompt();
    dispatch(openFilterDrawer());
  };
  const onSaveSelectedItems = () => {
    if (unixTime.startDateTime && unixTime.endDateTime) {
      const _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.date.dateType = selectedDateType;
        draft.filterLocalScope.rightPanelRetainDataList.date.startDate =
          selectedDateType === '5' ? unixTime.startDateTime : null;
        draft.filterLocalScope.rightPanelRetainDataList.date.endDate =
          selectedDateType === '5' ? unixTime.endDateTime : null;
      });
      dispatch(updateDashboardFilter(_dashboardFilter));
    }
    dispatch(toggleFilterDateDrawer({ status: false }));
    dispatch(openFilterDrawer());
  };
  const cancelConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">The changes you have made in filters will be discarded.</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Cancel Changes"
        onConfirmHandler={onDrawerClose}
        onCloseHandler={onCloseCancelPrompt}
        children={renderBody()}
      />
    );
  }, [isOpenCancelPrompt]);

  const onChangeRadioButton = (name: string, value: boolean) => {
    const _dateTypes =
      dateTypes &&
      dateTypes.map((dateType) => {
        dateType.isSelected = false;
        if (dateType.value === name) {
          dateType.isSelected = true;
          onChangeDateType(dateType.value);
          return dateType;
        }
        return dateType;
      });
    setDateTypes(_dateTypes);
  };
  const onRangeSelect = (startDate: Date, endDate: Date, id?: number) => {
    setDateRange({ startDate, endDate });
  };
  const onTimeChange = (
    hour: number,
    minute: number,
    timeType: 'start' | 'end',
    isTimeValid: boolean,
    amPm: AM_PM
  ) => {
    let timeObj = { ...time };
    if (amPm === 'PM' && hour + 12 <= 24) {
      hour += 12;
    }

    if (amPm === 'AM' && hour - 12 >= 0) {
      hour -= 12;
    }

    if (timeType === 'start') {
      timeObj.startTime = { h: hour, m: minute };
    } else {
      timeObj.endTime = { h: hour, m: minute };
    }

    setTime(timeObj);
  };

  return (
    <>
      {cancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="700px"
          maxW="700px"
          px="17px"
          pt="22px"
          userSelect="none"
        >
          <VStack w="full" spacing="20px">
            <HStack justify="space-between" w="full">
              <HStack spacing="12px">
                <AppIconButton
                  aria-label="back"
                  variant="iconPrimary"
                  size="iconLarge"
                  justifyContent="center"
                  alignItems="center"
                  icon={<AppIcon name="singleLeftArrow" w="24px" h="24px" fill={blue_500} />}
                  onClick={onDrawerClose}
                />
                <AppText size="h4Semibold">{getFromLocal('insightDrawerTitle')}</AppText>
              </HStack>
              <AppIconButton
                aria-label="close"
                variant="iconPrimary"
                size="iconLarge"
                justifyContent="center"
                alignItems="center"
                icon={<AppIcon name="cross" stroke={blue_500} w="24px" h="24px" />}
                onClick={onDrawerClose}
              />
            </HStack>
          </VStack>
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden" w="full">
            <VStack
              bg={ocean_blue_400}
              h="full"
              w="full"
              align="start"
              mt="20px"
              borderRadius="6px"
              px="13px"
              pt="5px"
              pb="25px"
              gap={0}
              spacing={0}
              overflowY="auto"
              __css={{
                '&::-webkit-scrollbar': {
                  w: '1'
                },
                '&::-webkit-scrollbar-track': {
                  w: '1'
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '10',
                  bg: ocean_blue_350
                }
              }}
            >
              {dateTypes.map((item, key) => {
                return (
                  <HStack
                    bg={item.value === selectedDateType ? ocean_blue_600 : 'transparent'}
                    borderBottom="1px solid "
                    borderBottomColor={ocean_blue_350}
                    w="full"
                    py="10px"
                    pl="8px"
                    key={key}
                  >
                    <AppRadioButton
                      isChecked={item.value === selectedDateType}
                      name={item.value}
                      text={item.displayName}
                      onChange={onChangeRadioButton}
                    />
                  </HStack>
                );
              })}
              {selectedDateType === '5' && (
                <Box w="full">
                  <HStack pt="20px" justify="center" w="full">
                    <AppDateRangeCalendar
                      onRangeSelect={onRangeSelect}
                      selectedDateRange={{
                        startDate: dateRange.startDate!,
                        endDate: dateRange.endDate!
                      }}
                    />
                  </HStack>

                  <VStack pt="34px">
                    <HStack justify="space-between" w="full">
                      <VStack align="start">
                        <AppText fontSize="13px" fontWeight={400}>
                          From Time
                        </AppText>
                        <AppTimePicker
                          onTimeSelect={(hours, minutes, isValid, amPm) => {
                            onTimeChange(hours, minutes, 'start', isValid, amPm);
                          }}
                          time={time.startTime}
                        />
                      </VStack>
                      <VStack align="start">
                        <AppText fontSize="13px" fontWeight={400}>
                          To Time
                        </AppText>
                        <AppTimePicker
                          onTimeSelect={(hours, minutes, isValid, amPm) => {
                            onTimeChange(hours, minutes, 'end', isValid, amPm);
                          }}
                          time={time.endTime}
                        />
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton
                  variant="secondary"
                  size="medium"
                  onClick={onToggleCancelPrompt}
                  px="25px"
                >
                  Cancel
                </AppButton>
                <AppButton variant="primary" size="medium" onClick={onSaveSelectedItems} px="25px">
                  Select
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDateSelectionDrawer;
