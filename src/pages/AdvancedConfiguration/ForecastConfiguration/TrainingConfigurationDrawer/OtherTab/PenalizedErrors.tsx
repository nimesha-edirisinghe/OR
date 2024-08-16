import { Box, HStack, VStack } from '@chakra-ui/layout';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  addNewPenalizedError,
  removePenalizedError,
  updatePenalizedError
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import {
  blue_500,
  neutral_400,
  ocean_blue_300,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600
} from 'theme/colors';
import { WeightMatrixI } from 'types/forecastConfig';

export interface PenalizedError {
  lowLimit: number;
  upperLimit: number;
  penalty: number;
}

interface Props {
  isDisabled?: boolean;
}

const PenalizedErrors: FC<Props> = ({ isDisabled = false }) => {
  const dispatch = useDispatch();
  const trainingConfigData = useSelector(fcConfigPageSliceSelector).trainingConfigData;
  const penalizedErrorRadioChecked =
    trainingConfigData.algorithmSettings.advanced_configurations.model_selection_criteria ===
    'PENALIZED_ERROR';
  const penalizedErrorList = trainingConfigData.algorithmSettings.penalized_error.weight_matrix;

  const onAddPenalizedError = () => {
    if (!isDisabled) {
      dispatch(addNewPenalizedError());
    }
  };

  const onRemovePenalizedError = (index: number) => {
    if (!isDisabled) {
      dispatch(removePenalizedError(index));
    }
  };

  const onUpdatePenalizedError = (
    field: 'lower_limit' | 'upper_limit' | 'penalty',
    index: number,
    value: string
  ) => {
    if (!isDisabled) {
      dispatch(updatePenalizedError({ field, index, value }));
    }
  };

  return (
    <VStack
      w="full"
      bg={ocean_blue_400}
      borderRadius="8px"
      align="start"
      transition="all 2s ease"
      gap="8px"
      p="8px"
      alignContent={'end'}
    >
      {penalizedErrorList.map((penalizedError: WeightMatrixI, key: number) => (
        <HStack spacing="8px" key={key}>
          <VStack alignItems={'start'} spacing="4px">
            <AppText fontSize="12px" fontWeight="400" color={neutral_400}>
              Lower Limit
            </AppText>
            <AppInput
              w="161.33px"
              h="36px"
              borderRadius="8px"
              p="10px 8px 10px 12px"
              value={penalizedError.lower_limit}
              fontSize="13px"
              fontWeight={400}
              bg={ocean_blue_500}
              color={ocean_blue_300}
              isDisabled={!penalizedErrorRadioChecked || isDisabled}
              onChange={(e) => onUpdatePenalizedError('lower_limit', key, e.target.value)}
            />
          </VStack>
          <VStack alignItems={'start'} spacing="4px">
            <AppText fontSize="12px" fontWeight="400" color={neutral_400}>
              Upper Limit
            </AppText>
            <AppInput
              w="161.33px"
              h="36px"
              borderRadius="8px"
              p="10px 8px 10px 12px"
              value={penalizedError.upper_limit}
              fontSize="13px"
              fontWeight={400}
              color={ocean_blue_300}
              bg={ocean_blue_500}
              _disabled={{ backgroundColor: ocean_blue_500 }}
              isDisabled={!penalizedErrorRadioChecked || isDisabled}
              onChange={(e) => onUpdatePenalizedError('upper_limit', key, e.target.value)}
            />
          </VStack>
          <VStack alignItems={'start'} spacing="4px">
            <AppText fontSize="12px" fontWeight="400" color={neutral_400}>
              Penalty
            </AppText>
            <AppInput
              w="161.33px"
              h="36px"
              borderRadius="8px"
              p="10px 8px 10px 12px"
              color={ocean_blue_300}
              bg={ocean_blue_500}
              _disabled={{ backgroundColor: ocean_blue_500 }}
              value={penalizedError.penalty}
              fontSize="13px"
              fontWeight={400}
              isDisabled={!penalizedErrorRadioChecked || isDisabled}
              onChange={(e) => onUpdatePenalizedError('penalty', key, e.target.value)}
            />
          </VStack>

          {penalizedErrorList.length > 1 && penalizedErrorRadioChecked && (
            <VStack alignItems={'start'} alignSelf={'end'}>
              <Box
                h="36px"
                w="36px"
                p="8px"
                borderRadius="8px"
                bg={ocean_blue_600}
                cursor={isDisabled ? 'not-allowed' : 'pointer'}
                onClick={() => !isDisabled && onRemovePenalizedError(key)}
              >
                <AppIcon name="minus" fill={blue_500} w="full" h="1.67px" />
              </Box>
            </VStack>
          )}
        </HStack>
      ))}

      {penalizedErrorRadioChecked && (
        <HStack
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          w="544px"
          h="36px"
          borderRadius="8px"
          p="10px 14px 10px 14px"
          bg={ocean_blue_600}
          onClick={onAddPenalizedError}
          gap="8px"
          justifyContent="center"
          alignContent="center"
        >
          <AppIcon name="plus" fill={blue_500} w="9.33px" h="9.33px" />
          <AppText color={blue_500} fontSize="13px" fontWeight={400}>
            Add
          </AppText>
        </HStack>
      )}
    </VStack>
  );
};

export default PenalizedErrors;
