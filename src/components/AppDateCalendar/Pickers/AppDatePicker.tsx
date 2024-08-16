import { Box, useOutsideClick } from '@chakra-ui/react';
import { FC, ReactNode, useRef, useState } from 'react';
import AppDateCalendar from '../Calender/AppDateCalendar';
import { getBoxPosition } from 'utils/layouts';
import { ocean_blue_500 } from 'theme/colors';

interface Props {
  children?: ReactNode;
  onDateSelect: (date: Date) => void;
  prePos?: {
    x?: number;
    y?: number;
  };
  isDisabled?: boolean;
  initDate?: Date;
  disabledPrevMonth?: boolean;
  disabledPrevDate?: number;
  calendarTopPadding?: number;
}

const AppDatePicker: FC<Props> = ({
  children,
  onDateSelect,
  prePos,
  isDisabled = false,
  initDate,
  disabledPrevMonth = false,
  disabledPrevDate = 0,
  calendarTopPadding = 4
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  useOutsideClick({
    //@ts-ignore
    ref: ref,
    handler: () => setIsVisible(false)
  });

  const onCalenderIconClick = (e: any) => {
    const pos = getBoxPosition(e, 322, 312, prePos);
    setPos(pos);
    setIsVisible(!isVisible);
  };

  const onSelectDate = (date: Date) => {
    onDateSelect(date);
    setIsVisible(false);
  };
  const cursorStyle = isDisabled ? 'not-allowed' : 'pointer';

  return (
    <Box>
      <Box onClick={(e) => !isDisabled && onCalenderIconClick(e)} cursor={cursorStyle}>
        {children}
      </Box>
      {isVisible && (
        <Box
          // @ts-ignore
          ref={ref}
          position="absolute"
          w="236px"
          h="320px"
          top={pos.y}
          left={pos.x}
          bgColor={ocean_blue_500}
          padding="10px 10px"
          boxShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
          borderRadius="6px"
          transition=".2s"
          zIndex={1}
        >
          <AppDateCalendar
            onDateSelect={(date) => onSelectDate(date)}
            initDate={initDate}
            disabledPrevMonth={disabledPrevMonth}
            disabledPrevDate={disabledPrevDate}
            calendarTopPadding={calendarTopPadding}
          />
        </Box>
      )}
    </Box>
  );
};

export default AppDatePicker;
