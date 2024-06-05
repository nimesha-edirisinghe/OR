import { HStack, Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import AppDatePicker from 'components/AppDateCalendar/Pickers/AppDatePicker';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { getTime } from 'date-fns';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setJobScheduleConfig } from 'state/pages/shared/jobScheduling/jobSchedulingState';
import { black_800, blue_500, neutral_100, neutral_400, ocean_blue_500, ocean_blue_600 } from 'theme/colors';

interface EndOnProps {
  selectedDate: number | string | null;
  status: boolean;
}

const EndOn: FC<EndOnProps> = ({ selectedDate, status = false }) => {
  const dispatch = useDispatch();

  const onChangeEndDate = (date: Date) => {
    dispatch(
      setJobScheduleConfig({
        field: 'endDate',
        value: getTime(date)
      })
    );
  };

  return (
    <HStack h="40px" w="full">
      <Flex direction="column"  gap="4px">
      <Box w="100px">
        <AppText fontSize="12px" fontWeight={200} color={neutral_400}>
          End on
        </AppText>
      </Box>
     <HStack position={"relative"}>
      <AppInput
          w="272px"
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
          isDisabled={!status}
          _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
        />
        <Box position="absolute" top="1" right="2" zIndex={1}>
          <AppDatePicker
            onDateSelect={onChangeEndDate}
            children={<AppIcon name="calenderWithDate" fill={blue_500} />}
            prePos={{ x: -200,y:-20 }}
            isDisabled={!status}
          />
        </Box>
     </HStack>
      </Flex>
    </HStack>
  );
};

export default EndOn;
