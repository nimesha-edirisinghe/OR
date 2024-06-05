import { Box, HStack, useOutsideClick } from '@chakra-ui/react';
import AppDatePicker from 'components/AppDateCalendar/Pickers/AppDatePicker';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import React, { FC, useRef, useState } from 'react';
import { blue_500, neutral_400 } from 'theme/colors';
import { timeStampToDateString } from 'utils/utility';

interface IProsp {
  selectedDate: number;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateSelect: (date: Date) => void;
  placeHolder?: string;
}

const AppDateInput: FC<IProsp> = ({
  selectedDate,
  label,
  onChange,
  onDateSelect,
  placeHolder = 'Select Date'
}) => {
  const [visible, setVisible] = useState(false);
  const dateSelected = timeStampToDateString(selectedDate, 'yyyy-MM-dd');
  const ref = useRef();
  useOutsideClick({
    //@ts-ignore
    ref: ref,
    handler: () => setVisible(false)
  });

  return (
    <>
      <HStack h="full" w="full">
        <AppText size="body2" color={neutral_400} lineHeight="18px">
          {label}
        </AppText>
      </HStack>
      <HStack h="full" w="full">
        <HStack position={'relative'} w="full">
          <AppInput
            placeholder={placeHolder}
            value={dateSelected}
            onChange={onChange}
            variant="primary"
            size="small"
            lineHeight="19.5px"
            fontSize="13px"
            w="full"
          />
          <Box position="absolute" top="1" right="2" zIndex={1}>
            <AppDatePicker
              onDateSelect={onDateSelect}
              children={<AppIcon name="calenderWithDate" fill={blue_500} />}
              prePos={{ x: -200, y: 10 }}
            />
            
          </Box>
        </HStack>
      </HStack>
    </>
  );
};

export default AppDateInput;
