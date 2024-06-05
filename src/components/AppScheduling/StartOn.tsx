import { HStack, Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import AppDateTimePicker from 'components/AppDateTimePicker/AppDateTimePicker';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  jobScheduleSliceSelector,
  setJobScheduleConfig
} from 'state/pages/shared/jobScheduling/jobSchedulingState';
import {
  black_800,
  blue_500,
  neutral_100,
  neutral_400,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';
import { formatUnixDateTime, getTimeFromTimestamp } from 'utils/utility';

interface StartOnSectionProps {
  status: boolean;
}

const StartOnSection: FC<StartOnSectionProps> = ({ status }) => {
  const dispatch = useDispatch();
  const jobScheduleState = useSelector(jobScheduleSliceSelector);
  const schedulingStartDate = jobScheduleState?.jobSchedulingData?.startDate;
  const { date, time } = formatUnixDateTime(schedulingStartDate ?? null);
  const { hours, minutes } = getTimeFromTimestamp(schedulingStartDate);

  const onSelectStartDateTime = (unixDateTime: number) => {
    dispatch(setJobScheduleConfig({ field: 'startDateTime', value: unixDateTime }));
  };

  return (
    <HStack h="40px" w="full">
      <Flex gap="16px">
        <Flex direction="column" gap="4px">
          <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
            Start on
          </AppText>
          <Flex position="relative">
            <AppInput
              bg={ocean_blue_500}
              border="none"
              borderRadius="8px"
              w="272px"
              h="36px"
              fontSize="13px"
              fontWeight={400}
              lineHeight="19.5px"
              color={neutral_100}
              value={date ?? ''}
              onChange={(e) => {}}
              isDisabled={!status}
              _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
            />
            <Box position="absolute" top="1" right="2" zIndex={2}>
              <AppDateTimePicker
                children={<AppIcon name="clock" fill={blue_500} />}
                onSelectStartDateTime={onSelectStartDateTime}
                prePos={{ x: -234, y: -2 }}
                initialTime={{ h: hours, m: minutes }}
                isDisabled={!status}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" gap="4px">
          <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
            Start Time
          </AppText>
          <Flex position="relative">
            <AppInput
              border="none"
              borderRadius="8px"
              bg={ocean_blue_500}
              w="272px"
              h="35px"
              fontSize="13px"
              fontWeight={400}
              lineHeight="19.5px"
              color={neutral_100}
              value={time ?? ''}
              onChange={(e) => console.log('end_date', e.target.value)}
              isDisabled={!status}
              _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
            />
            <Box position="absolute" top="1" right="2" zIndex={2}>
              <AppDateTimePicker
                children={<AppIcon name="calenderWithDate" fill={blue_500} />}
                onSelectStartDateTime={onSelectStartDateTime}
                prePos={{ x: -500, y: -2 }}
                initialTime={{ h: hours, m: minutes }}
                isDisabled={!status}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </HStack>
  );
};

export default StartOnSection;
