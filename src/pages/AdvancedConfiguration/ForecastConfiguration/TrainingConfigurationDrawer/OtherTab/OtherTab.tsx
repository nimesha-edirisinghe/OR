import { HStack, VStack, Box } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { FC } from 'react';
import ExemptionPeriods from './ExemptionPeriods';
import RadioBoxWithText from './RadioBoxWithText';
import PenalizedErrors from './PenalizedErrors';
import { useDispatch, useSelector } from 'react-redux';
import {
  fcConfigPageSliceSelector,
  changeModelSelectionCriteria,
  toggleExemptionCheckBox,
  toggleOtherConfigurationCheckBox,
  updateTrainModelFrom,
  toggleTrainModelFromCheckBox
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';
import { format } from 'date-fns';
import AppDatePicker from 'components/AppDateCalendar/Pickers/AppDatePicker';
import { blue_500, neutral_200, ocean_blue_500 } from 'theme/colors';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { scrollbarYStyles } from 'theme/styles';
import AppText from 'components/newTheme/AppText/AppText';
import useScrollState from 'hooks/useScrollState';
import { motion } from 'framer-motion';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';
import { AccessPermissionEnum, MenuItems } from 'utils/enum';

export type OtherConfigCheckBoxName =
  | 'cross_validation'
  | 'outlier_detection'
  | 'exemption_periods'
  | 'train_model_from';

export type BestFitCriteriaRadioName = 'RMSE' | 'MAD' | 'MAPE' | 'WMAD' | 'PENALIZED_ERROR';

interface ExemptionPeriod {
  start: Date | null;
  end: Date | null;
}

interface Props {
  exemptionPeriods?: ExemptionPeriod[];
}

const OtherTab: FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const trainingConfigState = useSelector(fcConfigPageSliceSelector);
  const trainingConfigData = trainingConfigState.trainingConfigData;
  const trainingConfigLocalScope = trainingConfigState.trainingConfigLocalScope;
  const advanceConfiguration = trainingConfigData.algorithmSettings.advanced_configurations;
  const [scroll, handleMouseEnter, handleMouseLeave] = useScrollState();

  const accessType = useAccessType(MenuItems.FORECASTING_SETUP_AND_SCHEDULING);
  const accessNotAllowed = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const onChangeOtherConfigurationCheckBox = (name: OtherConfigCheckBoxName, value: boolean) => {
    switch (name) {
      case 'cross_validation':
        dispatch(toggleOtherConfigurationCheckBox({ algo: name }));
        break;
      case 'exemption_periods':
        dispatch(toggleExemptionCheckBox(value));
        break;
      case 'outlier_detection':
        dispatch(toggleOtherConfigurationCheckBox({ algo: name }));
        break;
      case 'train_model_from':
        dispatch(toggleOtherConfigurationCheckBox({ algo: name }));
        break;
    }
  };

  const onChangeBestFitCriteriaRadio = (name: BestFitCriteriaRadioName, value: boolean) => {
    dispatch(changeModelSelectionCriteria(name));
  };

  const onToggleTrainModelFromCheckBox = () => {
    dispatch(toggleTrainModelFromCheckBox());
  };

  return (
    <VStack
      w="full"
      align="start"
      gap="20px"
      maxH="71vh"
      overflowX="hidden"
      overflowY={scroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      __css={scrollbarYStyles}
    >
      <VStack align="start" transition="all 2s ease" spacing="8px" w="full">
        <AppText fontSize="13px" fontWeight="600" color={neutral_200}>
          Other Configuration
        </AppText>
        <AppCheckbox
          id={0}
          label="Advanced Cross Validation for Noisy Data"
          isChecked={advanceConfiguration.cross_validation}
          onChange={(checked: boolean, id: number) =>
            onChangeOtherConfigurationCheckBox('cross_validation', checked)
          }
          py="0"
          isDisabled={accessNotAllowed}
        />
        <AppCheckbox
          id={1}
          label="Automatic Outlier Detection"
          isChecked={advanceConfiguration.outlier_detection}
          onChange={(checked: boolean, id: number) =>
            onChangeOtherConfigurationCheckBox('outlier_detection', checked)
          }
          py="0"
          isDisabled={accessNotAllowed}
        />
        <AppCheckbox
          id={2}
          label="Exemption Periods"
          isChecked={trainingConfigLocalScope.exemptionPeriodsCheckboxChecked}
          onChange={(checked: boolean, id: number) =>
            onChangeOtherConfigurationCheckBox('exemption_periods', checked)
          }
          py="0"
          isDisabled={accessNotAllowed}
        />
        <ExemptionPeriods isDisabled={accessNotAllowed} />
      </VStack>

      <VStack align="start" transition="all 0.05s ease" spacing="8px" w="full">
        <AppText size="h4Semibold">Best Fit Selection Criteria</AppText>
        <RadioBoxWithText
          text="RMSE"
          isChecked={advanceConfiguration.model_selection_criteria === 'RMSE'}
          onChange={onChangeBestFitCriteriaRadio}
          name="RMSE"
          lineHeight="0px"
          isDisabled={accessNotAllowed}
        />
        <RadioBoxWithText
          text="MAD"
          isChecked={advanceConfiguration.model_selection_criteria === 'MAD'}
          onChange={onChangeBestFitCriteriaRadio}
          name="MAD"
          lineHeight="0px"
          isDisabled={accessNotAllowed}
        />
        <RadioBoxWithText
          text="MAPE"
          isChecked={advanceConfiguration.model_selection_criteria === 'MAPE'}
          onChange={onChangeBestFitCriteriaRadio}
          name="MAPE"
          lineHeight="0px"
          isDisabled={accessNotAllowed}
        />
        <RadioBoxWithText
          text="WMAD"
          isChecked={advanceConfiguration.model_selection_criteria === 'WMAD'}
          onChange={onChangeBestFitCriteriaRadio}
          name="WMAD"
          lineHeight="0px"
          isDisabled={accessNotAllowed}
        />
        <RadioBoxWithText
          text="PENALIZED ERROR"
          isChecked={advanceConfiguration.model_selection_criteria === 'PENALIZED_ERROR'}
          onChange={onChangeBestFitCriteriaRadio}
          name="PENALIZED_ERROR"
          lineHeight="0px"
          isDisabled={accessNotAllowed}
        />
        <Box w="full" pr="2px">
          <PenalizedErrors isDisabled={accessNotAllowed} />
        </Box>
      </VStack>

      <VStack align="start" transition="all 2s ease" gap="8px">
        <AppCheckbox
          id={3}
          label="Train Model from"
          onChange={onToggleTrainModelFromCheckBox}
          isChecked={trainingConfigLocalScope.trainModelFromCheckBoxChecked || false}
          isDisabled={accessNotAllowed}
        />
        <VStack align="start">
          <AppText w="120px" fontSize="12px" fontWeight="400" color="#969696">
            Date
          </AppText>
          <HStack position="relative">
            <AppInput
              w="544px"
              h="36px"
              fontSize="12px"
              borderRadius="8px"
              p="10px 8px 10px 12px"
              bg={ocean_blue_500}
              isDisabled={
                !trainingConfigLocalScope.trainModelFromCheckBoxChecked || accessNotAllowed
              }
              onChange={(e) => dispatch(updateTrainModelFrom(e.target.value))}
              value={trainingConfigData.algorithmSettings.start_date || ''}
            />
            {trainingConfigLocalScope.trainModelFromCheckBoxChecked && (
              <Box position="absolute" right={2} zIndex={2}>
                <AppDatePicker
                  onDateSelect={(date) =>
                    dispatch(updateTrainModelFrom(format(date, 'yyyy-MM-dd')))
                  }
                  children={<AppIconChakra name="calender" fill={blue_500} />}
                  prePos={{ x: -220, y: -280 }}
                  isDisabled={accessNotAllowed}
                />
              </Box>
            )}
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default OtherTab;
