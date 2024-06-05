import { Box, BoxProps } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { blue_500, blue_500_t30, neutral_200, ocean_blue_300 } from 'theme/colors';
import { DateRange } from 'types/view';

interface Props extends BoxProps {
  handleDateClick: (date: Date) => void;
  isSelected: boolean;
  date: Date;
  day: number;
  validMaxDate?: Date | undefined;
  fullDate: Date;
  dateRange?: DateRange | null;
  setTempRangeEndDate?: Dispatch<SetStateAction<Date | undefined>>;
  isDisabled?: boolean;
}

const AppCalenderDate: FC<Props> = ({
  date,
  isSelected,
  handleDateClick,
  day,
  validMaxDate,
  fullDate,
  dateRange,
  isDisabled = false
}) => {
  const [bgColor, setBgColor] = useState('transparent');

  const isInRange = useCallback(() => {
    try {
      if (dateRange?.startDate && dateRange?.endDate) {
        return date > dateRange?.startDate && date < dateRange?.endDate;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }, [dateRange, fullDate]);

  useEffect(() => {
    const _bgColor = isSelected ? blue_500 : isInRange() ? blue_500_t30 : 'transparent';
    setBgColor(_bgColor);
  }, [fullDate, dateRange]);

  const isValidDateRange = (date: Date): boolean => {
    if (!validMaxDate) {
      return true;
    }

    return date < validMaxDate;
  };

  const onDateClickHandler = () => {
    if (isDisabled) return;
    handleDateClick(date);
  };

  return (
    <Box
      key={`as-${day}`}
      cursor={isDisabled ? 'not-allowed' : isValidDateRange(date) ? 'pointer' : 'default'}
      onClick={() => {
        isValidDateRange(date) && onDateClickHandler();
      }}
      transition="all .1s ease"
      w="20px"
      h="20px"
      pos="relative"
      bg={bgColor}
      outlineOffset={isInRange() ? 0 : -1}
      outline={isInRange() ? `` : isSelected ? `4px solid ${blue_500}` : ''}
      borderRadius={isSelected ? '10px' : ''}
      border="none"
      boxShadow={isInRange() ? `10px 0 ${blue_500_t30}` : ''}
      justifyContent="center"
      alignItems="center"
    >
      <AppText
        textAlign="center"
        size="body3"
        color={isDisabled ? ocean_blue_300 : isValidDateRange(date) ? neutral_200 : ocean_blue_300}
        lineHeight="20px"
      >
        {day}
      </AppText>
    </Box>
  );
};

export default AppCalenderDate;
