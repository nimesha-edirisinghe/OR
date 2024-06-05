import { Box, HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import AppDateCalendar from './AppDateCalendar';
import { addMonths } from 'date-fns';
import { ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { DateType } from 'pages/OperationsMonitoring/ActivityLog/ActivityLogFilter/FilterDateSelectionDrawer/FilterDateSelectionDrawer';
import { DateRange } from 'types/view';

interface Props {
  id?: number;
  onRangeSelect: (startDate: Date, endDate: Date, id: number) => void;
  validMaxDate?: Date | undefined;
  validMinDate?: Date | undefined;
  initialDate1?: Date;
  initialDate2?: Date;
  selectedDateRange?: DateRange | null | undefined;
}

const AppDateRangeCalendar: FC<Props> = ({
  id,
  onRangeSelect,
  validMaxDate,
  validMinDate,
  initialDate1 = addMonths(new Date(), -1),
  initialDate2 = new Date(),
  selectedDateRange
}) => {
  const [startDate, setStartDate] = useState<Date | undefined | null>(selectedDateRange?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined | null>(selectedDateRange?.endDate);
  const [dateRange, setDateRange] = useState({
    startDate: selectedDateRange ? selectedDateRange.startDate : undefined,
    endDate: selectedDateRange ? selectedDateRange.endDate : undefined
  });

  const onRangeSelectionComplete = (newRange: DateRange) => {
    onRangeSelect(newRange.startDate!, newRange.endDate!, id!);
    setDateRange({ startDate: newRange.startDate, endDate: newRange.endDate });
    setStartDate(null);
    setEndDate(null);
  };

  const onSelectDate = (date: Date, dateType: keyof DateType) => {
    try {
      let initialDateRange: {
        startDate: Date | null | undefined;
        endDate: Date | null | undefined;
      } = { startDate: null, endDate: null };

      if (dateRange.startDate && dateRange.endDate) {
        setDateRange(initialDateRange);
        setStartDate(null);
        setEndDate(null);
      } else {
        initialDateRange = dateRange;
      }

      const newRange = { ...initialDateRange, [dateType]: date };
      setDateRange(newRange);

      if (dateType === 'startDate') {
        setStartDate(date);
      }
      if (dateType === 'endDate') {
        setEndDate(date);
      }

      if (newRange.startDate && newRange.endDate) {
        onRangeSelectionComplete(newRange);
      }
    } catch (e) {
      console.error('date selection handle error ', e);
    }
  };

  return (
    <HStack
      w="full"
      spacing="24px"
      bg={ocean_blue_600}
      p="15px 16px 0 16px"
      borderRadius="8px"
      border={`1px solid ${ocean_blue_400}`}
      justify="space-around"
    >
      <AppDateCalendar
        onDateSelect={(date) => onSelectDate(date, 'startDate')}
        dateRange={dateRange}
        initDate={initialDate1}
        prevSelectedDate={startDate}
        label="Start Date"
      />
      <Box w="1px" h="250px" bg={ocean_blue_400}></Box>
      <AppDateCalendar
        onDateSelect={(date) => onSelectDate(date, 'endDate')}
        dateRange={dateRange}
        initDate={initialDate2}
        prevSelectedDate={endDate}
        label="End Date"
      />
    </HStack>
  );
};

export default AppDateRangeCalendar;
