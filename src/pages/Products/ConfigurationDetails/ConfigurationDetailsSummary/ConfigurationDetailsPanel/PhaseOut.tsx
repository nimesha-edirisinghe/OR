import { Box, HStack, VStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppDatePicker from 'components/AppDateCalendar/Pickers/AppDatePicker';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { getTime } from 'date-fns';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { configDetailsInputType, updateConfigUpdateInput } from 'state/pages/product/newActivation/productNewActivationState';
import { blue_500, neutral_100, neutral_400, ocean_blue_500 } from 'theme/colors';

interface IProsp {
  selectedDate: number | string | null;
}

const PhaseOut: FC<IProsp> = ({ selectedDate }) => {
  const dispatch = useDispatch();

  const handleInputChange = (key: configDetailsInputType, value: any) => {
    dispatch(updateConfigUpdateInput({ key: key, value: value }));
  };

  return (
    <VStack w="full">
      <HStack h="full" w="full">
      <AppText size="body2" color={neutral_400} lineHeight="18px">
          Phase Out
        </AppText>
      </HStack>
      <HStack h="full" w="full">
        <HStack position={'relative'}>
          <AppInput
            w="480px"
            h="36px"
            fontSize="13px"
            fontWeight={400}
            lineHeight="19.5px"
            color={neutral_100}
            border="none"
            borderRadius="8px"
            bg={ocean_blue_500}
            onChange={() => {}}
            value={selectedDate || ''}
          />
          <Box position="absolute" top="1" right="2" zIndex={1}>
            <AppDatePicker
              onDateSelect={(date)=>  handleInputChange('phaseOut', getTime(date))}
              children={<AppIconChakra name="calender" fill={blue_500} />}
              prePos={{ x: -200, y: -20 }}
            />
          </Box>
        </HStack>
      </HStack>
      <HStack h="full" w="full" spacing="20px">
      <AppText size="body3" w="full" textAlign="left" color={neutral_400} lineHeight="15px">
            Refers to the date which the predecessor product will be discontinued
          </AppText>
        </HStack>
    </VStack>
  );
};

export default PhaseOut;
