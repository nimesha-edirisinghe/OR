import {
  Box,
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
import { FC, useCallback, useEffect, useRef, useState } from 'react';
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
import { differenceInDays, getDate, getMonth, getTime, getYear } from 'date-fns';
import { produce } from 'immer';
import AppTimePicker from 'components/newTheme/AppTimePicker/AppTimePicker';
import { AM_PM } from 'components/AppTimePicker/AppAMPMSkipper';
import {
  black_800,
  blue_500,
  neutral_100,
  neutral_400,
  ocean_blue_350,
  ocean_blue_500,
  ocean_blue_600,
  ocean_blue_700
} from 'theme/colors';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import { showErrorToast } from 'state/toast/toastState';
import { format } from 'date-fns';
import AppDateRangeCalendar from 'components/AppDateCalendar/Calender/AppDateRangeCalendar';
import { convertTo24hours } from 'utils/date';

const initialDateRange = {
  startDate: null,
  endDate: null,
  parsedDate: null
};

const initialTime = {
  startTime: {
    h: null,
    m: null,
    formatted: '',
    timeType: null
  },
  endTime: {
    h: null,
    m: null,
    formatted: '',
    timeType: null
  }
};

const initialTimeVisibility: TimeVisibility = {
  start: false,
  end: false,
  dateRange: false
};

interface TimeVisibility {
  start: boolean;
  end: boolean;
  dateRange: boolean;
}
export interface DateType {
  startDate: null | Date;
  endDate: null | Date;
  parsedDate: string | null;
}

interface Props {
  isOpen: boolean;
}

interface ClockI {
  startTime: {
    h: number | null;
    m: number | null;
    formatted: string;
    timeType: AM_PM | null;
  };
  endTime: {
    h: number | null;
    m: number | null;
    formatted: string;
    timeType: AM_PM | null;
  };
}

const FilterDateSelectionDrawer: FC<Props> = ({ isOpen }) => {
  const dispatch = useDispatch();
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dateRangeRef: any = useRef();
  const fromDateRef: any = useRef();
  const toDateRef: any = useRef();
  const dashboardFilter = activityLogState.dashboardFilter;
  const selectedDateTime = dashboardFilter.filterLocalScope.rightPanelRetainDataList.date;
  const beforeEditFilterOptionsLevel2 =
    dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel2;
  const [selectedDateType, setSelectedDateType] = useState(selectedDateTime.dateType);
  const [dateTypes, setDateTypes] = useState(initialDateTypesAndValues);
  const [dateRange, setDateRange] = useState<DateType>(initialDateRange);
  const [time, setTime] = useState<ClockI>(initialTime);


  const [timeVisibility, setTimeVisibility] = useState<TimeVisibility>(initialTimeVisibility);

  useEffect(() => {
    if (!selectedDateTime.endDate) {
      setTime(initialTime);
      setDateRange(initialDateRange);
      setDateTypes(initialDateTypesAndValues);
      setSelectedDateType(selectedDateTime.dateType);
    }
  }, [selectedDateTime]);

  const getStartDate = () => {
    return getTime(
      new Date(
        getYear(dateRange.startDate!),
        getMonth(dateRange.startDate!),
        getDate(dateRange.startDate!),
        time.startTime.h ? convertTo24hours(time.startTime.h, time.startTime.timeType!) : 0,
        time.startTime.m ? time.startTime.m : 0,
        0
      )
    );
  };

  const getEndDate = () => {
    return getTime(
      new Date(
        getYear(dateRange.endDate!),
        getMonth(dateRange.endDate!),
        getDate(dateRange.endDate!),
        time.endTime.h ? convertTo24hours(time.endTime.h, time.endTime.timeType!) : 0,
        time.endTime.m ? time.endTime.m : 0,
        0
      )
    );
  };

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
    if (dateRange.startDate && dateRange.endDate) {
      const _dashboardFilter = produce(dashboardFilter, (draft) => {
        draft.filterLocalScope.rightPanelRetainDataList.date.dateType = selectedDateType;
        draft.filterLocalScope.rightPanelRetainDataList.date.startDate =
          selectedDateType === '5' ? getStartDate() : null;
        draft.filterLocalScope.rightPanelRetainDataList.date.endDate =
          selectedDateType === '5' ? getEndDate() : null;
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

  const onTimeChange = (
    hour: number,
    minute: number,
    isTimeValid: boolean,
    amPm: AM_PM,
    timeType: string = ''
  ) => {
    const timeObj = { ...time };
    const formatted: string = `${hour > 12 ? hour - 12 : hour} : ${minute} ${amPm}`;

    if (timeType === 'start') {
      timeObj.startTime = { h: hour, m: minute, formatted, timeType: amPm };
    } else if (timeType === 'end') {
      timeObj.endTime = { h: hour, m: minute, formatted, timeType: amPm };
    }
    setTime(timeObj);
  };

  const onRangeSelect = (startDate: Date, endDate: Date, key: number) => {
    const dateRange = differenceInDays(endDate, startDate);
    if (dateRange > 14) {
      showErrorToast('The maximum period between two dates must not exceed 14 days.');
      setDateRange({ startDate: null, endDate: null, parsedDate: null });
      return;
    }
    const strStartDate = format(startDate, 'yyyy-MM-dd').toString();
    const strEndDate = format(endDate, 'yyyy-MM-dd').toString();
    const parsedDate = `${strStartDate} to ${strEndDate}`;
    setDateRange({ startDate: new Date(startDate), endDate: new Date(endDate), parsedDate });
    handleTimeVisibility('dateRange');
  };

  const handleTimeVisibility = (type: string) => {
    setTimeVisibility({ ...timeVisibility, [type]: !(timeVisibility as any)[type] });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const target = event.target;
      const tempTimeVisibility: TimeVisibility = { ...timeVisibility };
      if (dateRangeRef.current && !dateRangeRef.current.contains(target)) {
        tempTimeVisibility.dateRange = false;
      }

      if (toDateRef.current && !toDateRef.current.contains(target)) {
        tempTimeVisibility.end = false;
      }

      if (fromDateRef.current && !fromDateRef.current.contains(target)) {
        tempTimeVisibility.start = false;
      }

      setTimeVisibility(tempTimeVisibility);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [timeVisibility]);

  return (
    <>
      {cancelConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          p="20px"
          userSelect="none"
        >
          <VStack w="full" spacing="20px">
            <HStack justify="space-between" w="full" mx="20px">
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
                <AppText fontSize="13px" fontWeight={600} color={neutral_100}>
                  {getFromLocal('insightDrawerTitle')}
                </AppText>
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
          <DrawerBody p={0} overflow="hidden" w="full">
            <VStack
              h="full"
              w="full"
              align="start"
              mt="20px"
              ml="6px"
              spacing="200px"
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
                    w="full"
                    key={key}
                  >
                    <AppRadioButton
                      isChecked={item.value === selectedDateType}
                      name={item.value}
                      text={item.displayName}
                      onChange={onChangeRadioButton}
                      size="md"
                    />
                  </HStack>
                );
              })}
              {selectedDateType === '5' && (
                <Box w="full">
                  <VStack pt="20px" spacing="20px" w="full" align="start" pr="10px">
                    <VStack align="start" w="full">
                      <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
                        Date Range
                      </AppText>
                      <Flex position="relative" w="full">
                        <AppInput
                          bg={ocean_blue_500}
                          border="none"
                          borderRadius="8px"
                          w="full"
                          h="36px"
                          fontSize="13px"
                          fontWeight={400}
                          color={neutral_100}
                          value={dateRange.parsedDate || ''}
                          onChange={(e) => {}}
                          p="10px 8px 10px 12px"
                          _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
                        />
                        <AppIcon
                          name="calenderWithDate"
                          fill={blue_500}
                          position="absolute"
                          top="2"
                          right="2"
                          onClick={() => handleTimeVisibility('dateRange')}
                          zIndex={2}
                        />

                        {timeVisibility.dateRange && (
                          <Box
                            ref={dateRangeRef}
                            position="absolute"
                            top="-50px"
                            right="8"
                            zIndex={3}
                          >
                            <AppDateRangeCalendar
                              onRangeSelect={onRangeSelect}
                              selectedDateRange={dateRange}
                            />
                          </Box>
                        )}
                      </Flex>
                    </VStack>

                    <HStack align="start">
                      <Box>
                        <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
                          From
                        </AppText>
                        <Flex position="relative">
                          <AppInput
                            bg={ocean_blue_500}
                            border="none"
                            borderRadius="8px"
                            w="272px"
                            h="36px"
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="19.5px"
                            color={neutral_100}
                            value={time.startTime.formatted}
                            onChange={(e) => {}}
                            _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
                          />
                          <Box position="absolute" top="1" right="2" zIndex={2}>
                            <AppIcon name="clock" onClick={() => handleTimeVisibility('start')} />
                          </Box>
                          {timeVisibility.start && (
                            <VStack
                              ref={fromDateRef}
                              align="center"
                              justify="center"
                              position="absolute"
                              top="10"
                              zIndex={2}
                              backgroundColor={ocean_blue_700}
                              w="272px"
                              h="93px"
                              p="8px"
                            >
                              <AppText
                                w="full"
                                fontSize="12px"
                                fontWeight={400}
                                color={neutral_400}
                              >
                                From Time
                              </AppText>
                              <AppTimePicker
                                onTimeSelect={(hours, minutes, isValid, amPm) => {
                                  onTimeChange(hours, minutes, isValid, amPm, 'start');
                                }}
                                time={time.startTime}
                              />
                            </VStack>
                          )}
                        </Flex>
                      </Box>
                      <Box>
                        <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
                          To
                        </AppText>
                        <Flex position="relative">
                          <AppInput
                            bg={ocean_blue_500}
                            border="none"
                            borderRadius="8px"
                            w="272px"
                            h="36px"
                            fontSize="13px"
                            fontWeight={400}
                            lineHeight="19.5px"
                            color={neutral_100}
                            value={time.endTime.formatted}
                            onChange={(e) => {}}
                            _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
                          />
                          <Box position="absolute" top="1" right="2" zIndex={2}>
                            <AppIcon name="clock" onClick={() => handleTimeVisibility('end')} />
                          </Box>
                          {timeVisibility.end && (
                            <VStack
                              ref={toDateRef}
                              align="center"
                              justify="center"
                              position="absolute"
                              top="10"
                              zIndex={2}
                              backgroundColor={ocean_blue_700}
                              w="272px"
                              h="93px"
                              p="8px"
                            >
                              <AppText
                                w="full"
                                fontSize="12px"
                                fontWeight={400}
                                color={neutral_400}
                              >
                                To Time
                              </AppText>
                              <AppTimePicker
                                onTimeSelect={(hours, minutes, isValid, amPm) => {
                                  onTimeChange(hours, minutes, isValid, amPm, 'end');
                                }}
                                time={time.endTime}
                              />
                            </VStack>
                          )}
                        </Flex>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </VStack>
          </DrawerBody>
          <DrawerFooter p={0}>
            <HStack w="full" justify="end">
              <AppButton
                variant="primary"
                w="105px"
                h="36px"
                p="10px 14px 10px 14px"
                onClick={onSaveSelectedItems}
              >
                Apply
              </AppButton>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterDateSelectionDrawer;
