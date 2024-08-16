import { FC, useCallback } from 'react';
import { HStack, Box } from '@chakra-ui/layout';
import AppSkipper from 'components/AppSkipper/AppSkipper';
import AppText from 'components/AppText/AppText';
import { weekDays } from 'utils/constants';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import {
  black_800,
  blue_500,
  neutral_100,
  neutral_400,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';
import { Flex } from '@chakra-ui/react';

interface RepeatOnProps {
  selectedRepeatEveryOption: string;
  selectedDay?: number;
  onChangeDay: (value: number) => void;
  status: boolean;
  isDisabled?: boolean;
}

const RepeatOn: FC<RepeatOnProps> = ({
  selectedRepeatEveryOption,
  selectedDay = 1,
  onChangeDay,
  status = false,
  isDisabled = false
}) => {
  const textColor = status ? '#fff' : black_800;
  const cursorStyle = !status || isDisabled ? 'not-allowed' : 'pointer';
  const renderRepeatOption = useCallback(() => {
    switch (selectedRepeatEveryOption) {
      case 'Months':
        return (
          <HStack spacing="20px" cursor={cursorStyle}>
            <AppSkipper
              onValueChange={(value) => onChangeDay(value)}
              value={selectedDay}
              w="80px"
              minNumber={1}
              maxNumber={31}
              isDisabled={!status || isDisabled}
              bg={ocean_blue_600}
            />
            <AppText
              fontSize="13px"
              fontWeight={400}
              lineHeight="19.5px"
              color={!status || isDisabled ? neutral_400 : neutral_100}
              mr="5px"
            >
              day of the month
            </AppText>
          </HStack>
        );
      case 'Weeks':
        return (
          <HStack spacing="14px">
            {weekDays.map((day) => (
              <Box
                key={day.id}
                borderRadius="4px"
                h="36px"
                w="38px"
                bg={selectedDay === day.id ? blue_500 : ocean_blue_500}
                p="8px"
                onClick={() => status && !isDisabled && onChangeDay(day.id)}
                cursor={cursorStyle}
                transition="all 0.3s ease"
              >
                <AppText
                  textAlign="center"
                  fontSize="13px"
                  fontWeight={400}
                  lineHeight="22.5px"
                  color={selectedDay === day.id ? neutral_100 : '#57809A'}
                >
                  {day.label}
                </AppText>
              </Box>
            ))}
          </HStack>
        );
      case 'Days':
        return <HStack spacing="20px"></HStack>;
    }
  }, [selectedRepeatEveryOption, selectedDay, status, isDisabled]);

  return (
    <HStack h="40px" w="full">
      <Flex direction="column" gap="4px">
        <Box w="100px">
          <AppText fontSize="12px" fontWeight={400} color={neutral_400}>
            Repeat on
          </AppText>
        </Box>
        {renderRepeatOption()}
      </Flex>
    </HStack>
  );
};

export default RepeatOn;
