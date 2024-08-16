import { Box, HStack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { AlertCreationStepsEnum } from 'utils/enum';
import FilterSkuLocations from './AlertCreationSteps/FilterSkuLocations/FilterSkuLocations';
import SelectSkuLocations from './AlertCreationSteps/SelectSkuLocations/SelectSkuLocations';
import AlertConfiguration from './AlertCreationSteps/AlertConfiguration/AlertConfiguration';
import { useNavigate } from 'react-router-dom';
import { scrollbarYStyles } from 'theme/styles';
import { produce } from 'immer';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  getFilterDataRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  resetGroupFilter,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  IAlert,
  alertSliceSelector,
  createAlertRequest,
  alertFormValidator,
  clearAlertErrorsMessages,
  createAlertSuccess
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { isValidAlertConfigs } from './AlertCreationSteps/AlertConfiguration/Helpers/AlertConfigurationValidator';
import { showErrorToast } from 'state/toast/toastState';
import { ERROR_MESSAGES } from 'constants/messages';
import { getSelectedAnchorCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import AppStepper, { StepItem } from 'components/newTheme/AppStepper/AppStepper';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { storeInLocal } from 'utils/localStorage';

interface Props {}

const CreateAlerts: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const [activeStep, setActiveStep] = useState<number>(0);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const defaultAlertTypes = alertState.defaultAlertTypes;
  const groupFilter = groupConfigState.groupFilter;

  const steps: StepItem[] = [
    {
      label: AlertCreationStepsEnum.FIRST_STEP
    },
    {
      label: AlertCreationStepsEnum.SECOND_STEP
    },
    {
      label: AlertCreationStepsEnum.THIRD_STEP
    }
  ];

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(createAlertSuccess());
        dispatch(resetGroupFilter());
        dispatch(getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'store'] }));
        dispatch(getFilterCountRequest({ whFlag: 0 }));
        dispatch(clearAlertErrorsMessages(null));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('', error);
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    try {
      setActiveStep(0);
      dispatch(resetGroupFilter());
      dispatch(getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'store'] }));
      dispatch(getFilterCountRequest({ whFlag: 0 }));
      dispatch(clearAlertErrorsMessages(null));
    } catch (error) {
      console.error('', error);
    }
  }, [userState.selectedOrg]);

  const onStepChangeHandler = (step: number) => {
    if (activeStep === 0) {
      const alertName = alertState.alertName;
      if (alertName === '') {
        showErrorToast(ERROR_MESSAGES.ALERT_NAME_MANDATORY);
        return;
      }
    }
    if (step === 2) {
      const anchorCount = getSelectedAnchorCount(groupFilter, 'sku', 1);
      if (!anchorCount) {
        showErrorToast(ERROR_MESSAGES.SKU_LOCATION_SELECTION_REQUIRED);
        return;
      }
    }
    setActiveStep(step);
  };

  const fetchSkuSelectionDetails = () => {
    const filterType = 'sku';
    const filterCode = 1;

    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterType = filterType;
          draft.filterCode = filterCode;
        }
      }
    );

    dispatch(updateGroupFilter(_groupFilter));
    dispatch(getFilterDataRequest({ filterType, filterCode, pageNumber: 1, viewFilter: false }));
  };

  const renderStepPanel = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <FilterSkuLocations />;
      case 1:
        storeInLocal('insightDrawerTitle', 'SKU locations');
        return <SelectSkuLocations />;
      case 2:
        return <AlertConfiguration />;
      default:
        break;
    }
  }, [activeStep]);

  const onNextHandler = () => {
    if (activeStep === 0) {
      dispatch(alertFormValidator());
      const alertName = alertState.alertName;
      if (alertName === '') {
        // showErrorToast(ERROR_MESSAGES.ALERT_NAME_MANDATORY);
        return;
      }
    }
    if (activeStep === 1) {
      const anchorCount = getSelectedAnchorCount(groupFilter, 'sku', 1);
      if (!anchorCount) {
        showErrorToast(ERROR_MESSAGES.SKU_LOCATION_SELECTION_REQUIRED);
        return;
      }
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => {
        const curStep = prevStep + 1;
        if (curStep === 1) {
          fetchSkuSelectionDetails();
        }
        return curStep;
      });
    }
  };

  const onPreviousHandler = () => {
    if (activeStep !== 0) {
      setActiveStep((prevStep) => {
        const curStep = prevStep - 1;
        if (curStep === 1) {
          fetchSkuSelectionDetails();
        }
        return curStep;
      });
    }
  };

  const onCreateAlertHandler = () => {
    dispatch(alertFormValidator());
    const isValidConfig = isValidAlertConfigs(defaultAlertTypes);
    if (isValidConfig.status) {
      dispatch(createAlertRequest({ cb: onCreateSuccessCb }));
    } else {
      showErrorToast(isValidConfig.message);
    }
  };

  const onCreateSuccessCb = () => {
    dispatch(resetGroupFilter());
    navigate('/app/predictive-alerts');
  };

  const btnClickHandler = activeStep === 2 ? onCreateAlertHandler : onNextHandler;
  const buttonLabel = activeStep === 2 ? 'Create Alert' : 'Next';
  const isDisabledButton = activeStep === 0 ? true : false;

  return (
    <Box
      maxH="88vh"
      w="full"
      transition=".2s ease-in"
      overflowX="hidden"
      overflowY="auto"
      py="20px"
      minW="200px"
      __css={scrollbarYStyles}
      userSelect="none"
    >
      <VStack
        // minH="calc(100vh - 120px)"
        h="auto"
        borderRadius="10px"
        pb="18px"
        align="center"
        justify="center"
        w="full"
        spacing="20px"
      >
        <Box w="256px" py="20px">
          <AppStepper steps={steps} activeStep={activeStep} onStepChange={onStepChangeHandler} />
        </Box>
        <Box h="auto" minH="calc(100vh - 285px)">
          {renderStepPanel()}
          <HStack w="full" justify="end" pt="20px">
            <AppButton
              variant="secondary"
              size="medium"
              // isDisabled={isDisabledButton}
              onClick={
                isDisabledButton ? () => navigate('/app/predictive-alerts') : onPreviousHandler
              }
              px="25px"
            >
              Back
            </AppButton>

            <AppButton variant="primary" size="medium" onClick={btnClickHandler} px="25px">
              {buttonLabel}
            </AppButton>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default CreateAlerts;
