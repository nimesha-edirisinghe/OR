import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { DAYS, MONTH_NAMES } from 'utils/constants';
import { addMonths, endOfMonth, format, getDay, getMonth, getYear, sub } from 'date-fns';
import AppCalenderDate from './AppCalenderDate';
import {
  blue_500,
  neutral_200,
  ocean_blue_100,
  ocean_blue_300,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { DateRange } from 'types/view';
import AppInput from 'components/newTheme/AppInput/AppInput';
import { showInfoToast } from 'state/toast/toastState';

interface AppDateCalendarProps {
  onDateSelect: (date: Date) => void;
  initDate?: Date;
  prevSelectedDate?: Date | null;
  dateRange?: DateRange | null;
  validMaxDate?: Date | undefined;
  label?: string;
  disabledPrevMonth?: boolean;
  disabledPrevDate?: number;
  calendarTopPadding?: number;
}

const AppDateCalendar: React.FC<AppDateCalendarProps> = ({
  onDateSelect,
  initDate,
  prevSelectedDate,
  dateRange,
  validMaxDate,
  label,
  disabledPrevMonth = false,
  disabledPrevDate = 0,
  calendarTopPadding = 4
}) => {
  const [fullDate, setFullDate] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(prevSelectedDate);
  const [textDate, setTextDate] = useState<string>('');
  const [isDateTyping, setIsDateTyping] = useState<boolean>(false);
  const disablePrevMonth: MutableRefObject<boolean> = useRef(disabledPrevMonth);

  useEffect(() => {
    const initialDate = prevSelectedDate ? prevSelectedDate : initDate ? initDate : new Date();
    const _selectedMonth = getMonth(initialDate);
    const _selectedYear = getYear(initialDate);
    setSelectedMonth(_selectedMonth);
    setSelectedYear(_selectedYear);
    setFullDate(initialDate);
  }, []);

  const getMonthName = useCallback(
    (month: number) => {
      return MONTH_NAMES[month];
    },
    [selectedMonth]
  );

  const handleDateClick = (date: Date) => {
    setFullDate(date);
    setSelectedDate(date);
    onDateSelect(date);
  };

  const onMonthChangeWithArrow = useCallback(
    (diff: number) => {
      const _fullDate = addMonths(fullDate!, diff);
      setFullDate(_fullDate);
      setSelectedYear(_fullDate.getFullYear());
      setSelectedMonth(_fullDate.getMonth());
      if (disabledPrevMonth) {
        disablePrevMonth.current =
          _fullDate.getMonth()! <= initDate?.getMonth()! &&
          initDate?.getFullYear()! >= _fullDate.getFullYear();
      }
    },
    [selectedMonth]
  );

  const isDateSelected = (date: Date) => {
    return (
      (selectedDate &&
        format(selectedDate, 'yyyy-MM-dd').toString() === format(date, 'yyyy-MM-dd').toString()) ||
      false
    );
  };

  const renderCalendarDays = () => {
    if (selectedMonth !== undefined && selectedYear !== undefined && fullDate !== undefined) {
      const days = [];
      const monthStartFullDate = new Date(selectedYear, selectedMonth, 1);
      const monthStartDayInWeek = getDay(monthStartFullDate);
      const monthEndFullDate = endOfMonth(monthStartFullDate);
      const monthEndDate = endOfMonth(monthEndFullDate).getDate();
      const previousMonthStartDate = sub(monthStartFullDate, {
        months: 1
      });
      const previousMonthEndDate = endOfMonth(previousMonthStartDate).getDate();
      const monthEndDayInWeek = getDay(monthEndFullDate);

      for (let i = monthStartDayInWeek; i > 0; i--) {
        days.push(
          <Box key={`pre-${i}`} w="20px" h="20px">
            <AppText textAlign="center" size="body3" color={ocean_blue_300}>
              {previousMonthEndDate - i + 1}
            </AppText>
          </Box>
        );
      }

      for (let i = 1; i <= monthEndDate; i++) {
        const date = new Date(selectedYear, selectedMonth, i);
        const isSelected = isDateSelected(date);
        let disableFlag: boolean = false;
        if (disabledPrevMonth) {
          if (initDate?.getMonth()! >= selectedMonth && initDate?.getFullYear()! >= selectedYear)
            disableFlag = i < disabledPrevDate + 1;
        }
        days.push(
          <AppCalenderDate
            key={`date-${i}`}
            handleDateClick={handleDateClick}
            isSelected={isSelected}
            date={date}
            day={i}
            dateRange={dateRange}
            fullDate={fullDate}
            validMaxDate={validMaxDate}
            isDisabled={disableFlag}
          />
        );
      }

      for (let x = monthEndDayInWeek, key = 1; x < 6; x++, key++) {
        days.push(
          <Box key={`post-${x}`} w="20px" h="20px">
            <AppText textAlign="center" size="body3" color={ocean_blue_300}>
              {key}
            </AppText>
          </Box>
        );
      }

      return days;
    }
  };

  const toggleDateTypingMode = (status: boolean) => {
    setIsDateTyping(status);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      // validateAndApplyTypedData();
      showInfoToast('Sorry typing is under construction');
    }
  };

  const validateAndApplyTypedData = () => {
    // const parsed = parse(textDate, 'yyyy-MM-dd', new Date());
    // if (isValid(parsed)) {
    //   handleDateClick(parsed);
    // }
  };

  return (
    <VStack w="216px" h="300px" bg={ocean_blue_600} userSelect="none">
      <HStack
        w="full"
        bg={ocean_blue_500}
        justify="center"
        gap="10px"
        p={`${calendarTopPadding}px 0`}
        borderRadius="4px"
        h={calendarTopPadding ? '26px' : '0px'}
      >
        <AppText size="caption" color={ocean_blue_100}>
          {label}
        </AppText>
        <AppText size="h5Semibold" color={neutral_200}>
          {selectedDate && format(selectedDate, 'yyyy-MM-dd').toString()}
        </AppText>
      </HStack>
      <HStack h="28px" w="full" justify="space-between">
        <AppIconButton
          aria-label="prev"
          icon={<AppIcon name="chevronLeft" fill={blue_500} w="14px" h="14px" />}
          variant="iconPrimary"
          size="iconSmall"
          onClick={() => onMonthChangeWithArrow(-1)}
          isDisabled={disablePrevMonth.current}
        />
        <AppText size="body3" color={neutral_200} textAlign="center">
          {selectedMonth !== undefined &&
            selectedYear !== undefined &&
            `${getMonthName(selectedMonth)} ${selectedYear}`}
        </AppText>
        <AppIconButton
          aria-label="next"
          icon={<AppIcon name="chevronRight" fill={blue_500} w="14px" h="14px" />}
          variant="iconPrimary"
          size="iconSmall"
          onClick={() => onMonthChangeWithArrow(1)}
        />
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap="10px">
        {DAYS.map((day, index) => (
          <AppText
            textAlign="center"
            key={`day-${index}`}
            size="body3"
            color={ocean_blue_300}
            w="20px"
          >
            {day}
          </AppText>
        ))}
        {renderCalendarDays()}
      </Grid>
    </VStack>
  );
};

export default AppDateCalendar;
