import { Box, HStack, useOutsideClick } from '@chakra-ui/react';
import { FC, ReactNode, useRef, useState } from 'react';
import AppDateRangeCalendar from '../Calender/AppDateRangeCalendar';
import { addMonths } from 'date-fns';
import { getBoxPosition } from 'utils/layouts';
import { DateRange } from 'types/view';

interface Props {
  children: ReactNode;
  id: number;
  onRangeSelect: (startDate: Date, endDate: Date, key: number) => void;
  validMaxDate?: Date | undefined;
  initialDate1?: Date;
  initialDate2?: Date;
  prePos?: {
    x?: number;
    y?: number;
  };
  selectedDateRange?: DateRange | null | undefined;
  isDisabled?: boolean;
}

const AppDateRangePicker: FC<Props> = ({
  children,
  id,
  onRangeSelect,
  validMaxDate,
  initialDate1 = addMonths(new Date(), -1),
  initialDate2 = new Date(),
  prePos,
  selectedDateRange,
  isDisabled = false
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<any>();
  useOutsideClick({
    ref: ref,
    handler: () => setIsVisible(false)
  });

  const onRangeSelectionComplete = (startDate: Date, endDate: Date, key: number) => {
    if (!isDisabled) {
      onRangeSelect(startDate, endDate, id);
      setIsVisible(false);
    }
  };

  const onCalenderIconClick = (e: any) => {
    if (!isDisabled) {
      const pos = getBoxPosition(e, 488, 317, prePos);
      setPos(pos);
      setIsVisible(!isVisible);
    }
  };

  return (
    <Box ref={ref} zIndex={9}>
      <Box onClick={onCalenderIconClick} cursor={isDisabled ? 'not-allowed' : 'pointer'}>
        {children}
      </Box>
      {isVisible && !isDisabled && (
        <Box pos="absolute" top={pos.y} left={pos.x} zIndex={20}>
          <AppDateRangeCalendar
            onRangeSelect={onRangeSelectionComplete}
            selectedDateRange={selectedDateRange}
          />
        </Box>
      )}
    </Box>
  );
};

export default AppDateRangePicker;
