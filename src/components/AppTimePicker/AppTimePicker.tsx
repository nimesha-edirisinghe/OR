import { HStack, VStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import AppAMPMSkipper, { AM_PM } from './AppAMPMSkipper';
import { ocean_blue_600, ocean_blue_700 } from 'theme/colors';
export interface TimeType {
  startTime: {
    h: number | null;
    m: number | null;
  };
  endTime: {
    h: number | null;
    m: number | null;
  };
}
const isNumeric = (num: any) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !isNaN(num as number);

interface Props {
  onTimeSelect: (hours: number, minutes: number, isValid: boolean, amPm: AM_PM) => void;
  time?: TimeType['startTime'] | TimeType['endTime'];
  setIsClockVisible?: Dispatch<SetStateAction<{ hour: boolean; minutes: boolean }>>;
}

const AppTimePicker: FC<Props> = ({ onTimeSelect, time, setIsClockVisible }) => {
  const [hour, setHour] = useState<string>(
    time?.h ? `${time?.h >= 12 ? time?.h - 12 : time?.h}` : ''
  );
  const [minute, setMinute] = useState<string>(time?.m ? `${time?.m}` : '');
  const [amPm, setAmPm] = useState<AM_PM>(time?.h && time?.h >= 12 ? 'PM' : 'AM');

  useEffect(() => {
    if (amPm == 'AM') {
      setHour(time?.h ? `${time?.h}` : '0');
    } else {
      setHour(time?.h ? `${time?.h}` : '0');
    }

    setMinute(time?.m ? `${time?.m}` : '0');
  }, [time]);

  useEffect(() => {
    if (amPm == 'AM') {
      onTimeSelect(time?.h ? (time?.h === 12 ? 0 : time?.h) : 0, time?.m ?? 0, true, amPm);
    } else {
      onTimeSelect(time?.h ?? 0, time?.m ?? 0, true, amPm);
    }
  }, [amPm]);

  const onUpdateHours = (value: string) => {
    if (
      (amPm === 'AM' && isNumeric(value) && parseInt(value) <= 12 && parseInt(value) >= 0) ||
      value === ''
    ) {
      onTimeSelect(parseInt(value), parseInt(minute), true, amPm);
    }
    if ((amPm === 'PM' && isNumeric(value) && parseInt(value) <= 12) || value === '') {
      onTimeSelect(parseInt(value), parseInt(minute), true, amPm);
    }
  };

  const onUpdateMinutes = (value: string) => {
    ((isNumeric(value) && parseInt(value) <= 59) || value === '') &&
      onTimeSelect(parseInt(hour), parseInt(value), true, amPm);
  };

  const getHour = (hour: string) => {
    const numericHour = parseInt(hour, 10);
    return isNaN(numericHour) ? hour : numericHour > 12 ? (numericHour - 12).toString() : hour;
  };

  return (
    <HStack align="start">
      <VStack align="start">
        <AppInput
          onFocus={() => setIsClockVisible && setIsClockVisible({ hour: true, minutes: false })}
          w="85px"
          h="40px"
          textAlign="center"
          onChange={(e: any) => onUpdateHours(e.target.value)}
          value={getHour(hour)}
          maxLength={2}
          bg={ocean_blue_600}
        />
        <AppText fontSize="13px" fontWeight={400} color="#BDBDBD">
          Hour
        </AppText>
      </VStack>
      <AppText fontSize="25px" fontWeight={800} color="#FFF">
        :
      </AppText>
      <VStack align="start">
        <AppInput
          onFocus={() => setIsClockVisible && setIsClockVisible({ hour: false, minutes: true })}
          w="85px"
          h="40px"
          textAlign="center"
          onChange={(e: any) => onUpdateMinutes(e.target.value)}
          value={minute}
          maxLength={2}
          bg={ocean_blue_600}
        />
        <AppText fontSize="13px" fontWeight={400} color="#BDBDBD">
          Minute
        </AppText>
      </VStack>
      <VStack>
        <AppAMPMSkipper
          value={amPm}
          onValueChange={(value) => setAmPm(value)}
          w="80px"
          bg={ocean_blue_600}
        />
      </VStack>
    </HStack>
  );
};

export default AppTimePicker;
