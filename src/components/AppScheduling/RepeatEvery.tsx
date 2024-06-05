import { HStack, Box } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import { FC } from 'react';
import { neutral_100, neutral_400, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { repeatDurationOptions } from 'utils/utility';

interface RepeatEveryProps {
  frequency: number | null;
  scheduleType: ScheduleType;
  onChangeOption: (selectedOption: { key: string; value: string }) => void;
  onChangeFrequency: (value: number) => void;
  status: boolean;
}

const RepeatEvery: FC<RepeatEveryProps> = ({
  frequency,
  scheduleType,
  onChangeOption,
  onChangeFrequency,
  status = false
}) => {
  const options: string[] = repeatDurationOptions.map((obj:{ key: string; value: string })=>obj.key);
  return (
    <HStack h="40px" w="full">
      <Flex direction="column"  gap="4px"> 
      <Box w="100px">
        <AppText fontSize="12px" fontWeight={200} color={neutral_400}>
          Repeat every
        </AppText>
      </Box>
      <HStack spacing="16px">
         <AppInput
              value={frequency ?? 0}
              onChange={(e) => onChangeFrequency(Number(e.target.value)||0)}
              border="none"
              borderRadius="8px"
              w="165px"
              h="36px"
              bg={ocean_blue_500}
              isDisabled={!status}
              fontSize="13px"
              fontWeight="400"
              color={neutral_100}
            />

          <AppDropdown
            options={options}
            buttonWidth='379px'
            height='36px'
            handleItemClick={(value)=>onChangeOption({key:value,value})}
            selectedItem={scheduleType||''}
            isDisabled={!status}
          />
      </HStack>
      </Flex>
    </HStack>
  );
};

export default RepeatEvery;
