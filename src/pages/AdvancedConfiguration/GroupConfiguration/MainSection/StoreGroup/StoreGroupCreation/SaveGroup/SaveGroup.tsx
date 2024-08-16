import { VStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import { INSTRUCTION_MESSAGES } from 'constants/messages';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { ocean_blue_500, white, neutral_200, ocean_blue_300 } from 'theme/colors';
import { GroupDetailsI, GroupDetailsKeyT } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { repeatDurationOptions } from 'utils/utility';

interface Props {
  onChangeHandler: (key: GroupDetailsKeyT, value: string | number | ScheduleType) => void;
  onChangeOption: (selectedOption: { key: string; value: string }) => void;
  detailsObj: GroupDetailsI;
}

const SaveGroup: FC<Props> = ({ onChangeHandler, detailsObj, onChangeOption }) => {
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupDetailsState = groupConfigurationState.groupDetails;
  const [forecastHorizon, setForecastHorizon] = useState<string>('');

  const options: string[] = repeatDurationOptions.map(
    (obj: { key: string; value: string }) => obj.key
  );

  useEffect(() => {
    if (groupDetailsState.horizon !== 0) setForecastHorizon(groupDetailsState.horizon.toString());
  }, [groupDetailsState.horizon]);

  const onChangeHorizonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const horizon = e.target.value;
    const isHorizonValid = /^\d+$/.test(horizon.toString()) || horizon.toString() === '';
    if (isHorizonValid) onChangeHandler('horizon', horizon);
  };

  return (
    <VStack w="636px" gap="20px" pt="20px">
      <AppText textAlign={'center'} w={'full'} size={'body3'} color={white} fontWeight={400}>
        {INSTRUCTION_MESSAGES.STORE_GROUP_MESSAGE}
      </AppText>
      <VStack w={'full'}>
        <AppText w={'full'} size={'body2'} color={neutral_200} fontWeight={'400'}>
          Group Name
        </AppText>
        <AppInput
          onChange={(e) => onChangeHandler('name', e.target.value)}
          value={detailsObj.name}
          maxLength={40}
          bg={ocean_blue_500}
          h={'36px'}
          border={'none'}
          borderRadius={'8px'}
          placeholder="Enter group name"
          fontSize="12px"
          _placeholder={{ color: ocean_blue_300, fontSize: '12px' }}
        />
      </VStack>
      <VStack w={'full'}>
        <AppText size={'body2'} w={'full'} color={neutral_200} fontWeight={'400'}>
          Forecasting Frequency
        </AppText>
        <AppDropdown
          options={options}
          buttonWidth="636px"
          height="36px"
          handleItemClick={(value) => onChangeOption({ key: value, value })}
          selectedItem={detailsObj.frequency!}
        />
      </VStack>

      <VStack w={'full'}>
        <AppText size={'body2'} w={'full'} color={neutral_200} fontWeight={'400'}>
          Forecasting Horizon
        </AppText>
        <AppInput
          type="text"
          onChange={(e) => onChangeHorizonHandler(e)}
          value={forecastHorizon}
          bg={ocean_blue_500}
          h={'36px'}
          border={'none'}
          borderRadius={'8px'}
          placeholder="Enter forecasting horizon"
          fontSize="12px"
          _placeholder={{ color: ocean_blue_300, fontSize: '12px' }}
        />
      </VStack>
    </VStack>
  );
};

export default SaveGroup;
