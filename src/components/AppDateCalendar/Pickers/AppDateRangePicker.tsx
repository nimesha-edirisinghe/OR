import { Box, HStack, useOutsideClick } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import AppDateCalendar from '../Calender/AppDateCalendar';
import { addMonths } from 'date-fns';
import { motion } from 'framer-motion';
import { getBoxPosition } from 'utils/layouts';
import AppDateRangeCalendar from '../Calender/AppDateRangeCalendar';
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
}

const AppDateRangePicker: FC<Props> = ({
  children,
  id,
  onRangeSelect,
  validMaxDate,
  initialDate1 = addMonths(new Date(), -1),
  initialDate2 = new Date(),
  prePos,
  selectedDateRange
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<any>();
  useOutsideClick({
    ref: ref,
    handler: () => setIsVisible(false)
  });

  const onRangeSelectionComplete = (startDate: Date, endDate: Date, key: number) => {
    onRangeSelect(startDate, endDate, id);
    setIsVisible(false);
  };

  const onCalenderIconClick = (e: any) => {
    const pos = getBoxPosition(e, 488, 317, prePos);
    setPos(pos);
    setIsVisible(!isVisible);
  };

  return (
    <Box ref={ref} zIndex={9}>
      <Box onClick={onCalenderIconClick}>{children}</Box>
      {isVisible && (
        <Box
          pos="absolute"
          top={pos.y}
          left={pos.x}
          as={motion.div}
          initial={{ opacity: 0, scale: 0, y: '-30px' }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition=".1s"
          zIndex={20}
        >
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
