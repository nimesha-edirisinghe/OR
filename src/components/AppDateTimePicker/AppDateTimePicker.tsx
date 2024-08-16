import { Box, HStack, VStack, useOutsideClick } from '@chakra-ui/react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getBoxPosition } from 'utils/layouts';
import AppDateCalendar from 'components/AppDateCalendar/Calender/AppDateCalendar';
import AppTimePicker, { TimeType } from 'components/AppTimePicker/AppTimePicker';
import AppAnalogTimePicker from 'components/AppAnalogTimePicker/AppAnalogTimePicker';
import AppText from 'components/AppText/AppText';
import { getDate, getMonth, getTime, getYear } from 'date-fns';
import { AM_PM } from 'components/AppTimePicker/AppAMPMSkipper';
import { convertTo24hours } from 'utils/date';
import { blue_500, ocean_blue_500 } from 'theme/colors';

interface Props {
  children?: ReactNode;
  isDisabled?: boolean;
  onSelectStartDateTime: (date: number) => void;
  prePos?: {
    x?: number;
    y?: number;
  };
  initialTime?: {
    h?: number | null;
    m?: number | null;
  };
}

const AppDateTimePicker: FC<Props> = ({
  children,
  isDisabled = false,
  onSelectStartDateTime,
  prePos,
  initialTime
}) => {
  const DEFAULT_TIME = { startTime: { h: null, m: null } };
  const initialTimeObj: Partial<TimeType> = {
    startTime: {
      h: initialTime?.h ?? DEFAULT_TIME.startTime.h,
      m: initialTime?.m ?? DEFAULT_TIME.startTime.m
    }
  };
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [clockTime, setClockTime] = useState<Partial<TimeType>>(initialTimeObj);
  const [amPm, setAmPm] = useState<AM_PM>((initialTime?.h ?? 0) >= 12 ? 'PM' : 'AM');
  const [isClockVisible, setIsClockVisible] = useState({
    hour: false,
    minutes: false
  });

  useEffect(() => {
    setClockTime(initialTimeObj);
  }, [initialTime]);

  const ref = useRef<any>();
  useOutsideClick({
    ref: ref,
    handler: () => setIsVisible(false)
  });

  const onCalenderIconClick = (e: any) => {
    const pos = getBoxPosition(e, 322, 312, prePos);
    setPos(pos);
    setIsVisible(!isVisible);
  };

  const _onSelectStartDateTime = () => {
    setIsVisible(false);
    const startDateInUnixTime = getTime(
      new Date(
        getYear(startDate),
        getMonth(startDate),
        getDate(startDate),
        clockTime.startTime?.h ? convertTo24hours(clockTime.startTime?.h, amPm) : 0,
        clockTime.startTime?.m ? clockTime.startTime?.m : 0,
        0
      )
    );
    onSelectStartDateTime(startDateInUnixTime);
  };

  const onTimeChange = (
    hour: number,
    minute: number,
    timeType: 'start' | 'end',
    isTimeValid: boolean,
    amPm: AM_PM
  ) => {
    const timeObj = { ...clockTime };
    timeObj.startTime = { h: hour, m: minute };
    setClockTime(timeObj);
    setAmPm(amPm);
  };

  return (
    <Box>
      <Box
        onClick={(e) => !isDisabled && onCalenderIconClick(e)}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
      >
        {children}
      </Box>
      {isVisible && (
        <Box
          ref={ref}
          position="absolute"
          top={pos.y}
          left={pos.x}
          bgColor={ocean_blue_500}
          padding="10px 10px "
          boxShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
          borderRadius="6px"
          zIndex={1}
        >
          <HStack bg={ocean_blue_500} pr="10px" align="start" justify="space-between">
            <AppDateCalendar onDateSelect={(date) => setStartDate(date)} initDate={startDate} />
            <VStack py="15px" gap={1} h="full">
              <AppText fontSize="13px" fontWeight={500}>
                Select Time
              </AppText>
              <AppTimePicker
                setIsClockVisible={setIsClockVisible}
                onTimeSelect={(hours, minutes, isValid, amPm) => {
                  onTimeChange(hours, minutes, 'start', isValid, amPm);
                }}
                time={clockTime.startTime}
              />
              <VStack w="full" justifySelf="end">
                <HStack h="120px">
                  {(isClockVisible.hour || isClockVisible.minutes) && (
                    <AppAnalogTimePicker
                      onHourSelected={(hour) => {
                        const timeObj = { ...clockTime };
                        timeObj.startTime = {
                          h: hour,
                          m: timeObj.startTime?.m ?? null
                        };
                        setClockTime(timeObj);
                        setIsClockVisible({ hour: false, minutes: true });
                      }}
                      onMinuteSelected={(minute) => {
                        const timeObj = { ...clockTime };
                        timeObj.startTime = {
                          h: timeObj.startTime?.h ?? null,
                          m: minute
                        };
                        setClockTime(timeObj);
                        setIsClockVisible({ hour: false, minutes: false });
                      }}
                      isClockVisible={isClockVisible}
                    />
                  )}
                </HStack>
                <HStack w="full" justify="end" gap="23px">
                  <AppText
                    cursor="pointer"
                    onClick={() => setIsVisible(false)}
                    fontSize="16px"
                    fontWeight={500}
                    color={blue_500}
                  >
                    CANCEL
                  </AppText>
                  <AppText
                    cursor="pointer"
                    onClick={_onSelectStartDateTime}
                    fontSize="16px"
                    fontWeight={500}
                    color={blue_500}
                  >
                    OK
                  </AppText>
                </HStack>
              </VStack>
            </VStack>
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default AppDateTimePicker;
