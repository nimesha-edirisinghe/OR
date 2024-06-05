import { Box, HStack, VStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppSelect from 'components/AppSelect/AppSelect';
import AppSkipper from 'components/AppSkipper/AppSkipper';
import AppText from 'components/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { getResponseAnchorAndSkuCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { ocean_blue_500, ocean_blue_100 } from 'theme/colors';
import { GroupDetailsI, GroupDetailsKeyT } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { repeatDurationOptions } from 'utils/utility';

interface Props {
  onChangeHandler: (key: GroupDetailsKeyT, value: string | number | ScheduleType) => void;
  onChangeOption: (selectedOption: { key: string; value: string }) => void;
  detailsObj: GroupDetailsI;
}

const SaveGroup: FC<Props> = ({ onChangeHandler, detailsObj, onChangeOption }) => {
  const options: { key: string; value: string }[] = repeatDurationOptions;

  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupFilter = groupConfigurationState.groupFilter;
  const [anchorCount, setAnchorCount] = useState(0);
  const [skuCount, setSkuCount] = useState(0);

  useEffect(() => {
    const obj = getResponseAnchorAndSkuCount(groupFilter);
    setAnchorCount(obj.anchor);
    setSkuCount(obj.sku);
  }, [groupFilter.filterTotalItemsCount]);

  return (
    <VStack w="full" align="start" gap="20px" pt="20px">
      <HStack>
        <Box w="200px">
          <AppText fontSize="14px">Group Name :</AppText>
        </Box>
        <Box>
          <AppInput
            onChange={(e) => onChangeHandler('name', e.target.value)}
            value={detailsObj.name}
            maxLength={40}
            bg={ocean_blue_500}
            borderColor={ocean_blue_100}
          />
        </Box>
      </HStack>
      <HStack>
        <Box w="200px">
          <AppText fontSize="14px">Forecasting Frequency :</AppText>
        </Box>
        <AppSelect
          options={options}
          onConfigTypeChange={onChangeOption}
          selectedScheduleType={detailsObj.frequency}
        />
      </HStack>
      <HStack>
        <Box w="200px">
          <AppText fontSize="14px" w="200px">
            Forecasting Horizon :
          </AppText>
        </Box>
        <AppSkipper
          onValueChange={(value) => onChangeHandler('horizon', value)}
          value={detailsObj.horizon}
          w="60px"
          minNumber={0}
          bg="none"
          border="1px solid"
          borderColor={ocean_blue_100}
        />
      </HStack>
      <HStack>
        <Box w="200px">
          <AppText fontSize="14px" w="200px">
            Anchors-locations :
          </AppText>
        </Box>
        <AppText fontSize="14px" w="200px">
          {anchorCount}
        </AppText>
      </HStack>
      <HStack>
        <Box w="200px">
          <AppText fontSize="14px" w="200px">
            SKU-locations :
          </AppText>
        </Box>
        <AppText fontSize="14px" w="200px">
          {skuCount}
        </AppText>
      </HStack>
    </VStack>
  );
};

export default SaveGroup;
