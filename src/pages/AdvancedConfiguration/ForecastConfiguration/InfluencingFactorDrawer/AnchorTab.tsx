import { Box, VStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  updateAnchorPredictorsConfig
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import ConfigTypeSelectionDropdown from './ConfigTypeSelectionDropdown';
import { neutral_400 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import useScrollState from 'hooks/useScrollState';

interface Props {}

const AnchorTab: FC<Props> = () => {
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();
  const anchorPredictors =
    useSelector(fcConfigPageSliceSelector).influencingFactorsConfig.anchorForecastPredictorsConfig;
  const dispatch = useDispatch();

  const onPercentageConfigValueChange = (value: number, index: number) => {
    dispatch(updateAnchorPredictorsConfig({ field: 'predictor_value', index, value }));
  };

  const onConfigTypeChange = (value: string, index: number) => {
    dispatch(updateAnchorPredictorsConfig({ field: 'config_type', index, value }));
  };

  return (
    <VStack
      align="start"
      gap="8px"
      maxH="71vh"
      overflowX="hidden"
      overflowY={scroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      __css={scrollbarYStyles}
      pr="3px"
    >
      {anchorPredictors &&
        anchorPredictors.map((predictor, key) => (
          <Box key={key} display={'flex'} flexDirection="column" gap="4px" w="full">
            <Box display={'flex'} flexDirection="row">
              <AppText
                fontSize="12px"
                w="405px"
                fontWeight={400}
                color={neutral_400}
                lineHeight="18px"
              >
                {predictor.predictor_name}
              </AppText>
              {predictor.config_type === 'Percentage change' && (
                <AppText fontSize="12px" fontWeight={400} color={neutral_400} lineHeight="18px">
                  Percentage
                </AppText>
              )}
            </Box>
            <ConfigTypeSelectionDropdown
              dropdownType="anchor"
              uniqueKey={key}
              configValue={predictor.predictor_value}
              configType={predictor.config_type ? predictor.config_type : 'From database'}
              onConfigTypeChange={onConfigTypeChange}
              onPercentageConfigValueChange={onPercentageConfigValueChange}
            />
          </Box>
        ))}
    </VStack>
  );
};

export default AnchorTab;
