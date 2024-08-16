import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  updateSKUPredictorsConfig
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import ConfigTypeSelectionDropdown from './ConfigTypeSelectionDropdown';
import { neutral_400 } from 'theme/colors';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

interface Props {}

const SkuTab: FC<Props> = () => {
  const dispatch = useDispatch();
  const skuPredictors =
    useSelector(fcConfigPageSliceSelector).influencingFactorsConfig.sKUPredictorsConfig;
  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onPercentageConfigValueChange = (value: number, index: number) => {
    dispatch(updateSKUPredictorsConfig({ field: 'predictorValue', index, value }));
  };

  const onConfigTypeChange = (value: string, index: number) => {
    dispatch(updateSKUPredictorsConfig({ field: 'configType', index, value }));
  };

  return (
    <VStack align="start" spacing="8px" pr="7px">
      {skuPredictors &&
        skuPredictors.map((predictor, key) => (
          <Box key={key} display={'flex'} flexDirection="column" gap="4px" w="full">
            <AppText fontSize="12px" fontWeight={400} color={neutral_400} lineHeight="18px">
              {predictor.predictorName}
            </AppText>
            <ConfigTypeSelectionDropdown
              dropdownType="sku"
              uniqueKey={key}
              configValue={predictor.predictorValue}
              configType={predictor.configType ? predictor.configType : 'From database'}
              onConfigTypeChange={onConfigTypeChange}
              onPercentageConfigValueChange={onPercentageConfigValueChange}
              isDisabled={accessNotAllowed}
            />
          </Box>
        ))}
    </VStack>
  );
};

export default SkuTab;
