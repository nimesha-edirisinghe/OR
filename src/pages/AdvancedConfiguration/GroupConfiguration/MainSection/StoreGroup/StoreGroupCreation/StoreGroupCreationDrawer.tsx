import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfluencingFactorsPicker from './InfluencingFactorsPicker/InfluencingFactorsPicker';
import { StepItem } from 'components/AppStepper/AppStepper';
import SaveGroup from './SaveGroup/SaveGroup';
import FilterTypeItemList from './AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import {
  IGroupConfigurationSlice,
  closeGroupConfigDrawer,
  createGroupRequest,
  groupConfigurationSliceSelector,
  resetGroupFilter,
  selectPredictor,
  setGroupDetails
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupDetailsKeyT, InfluencingFactorTypes } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { predictorsSelectionValidator } from './InfluencingFactorsPicker/Helpers/InfluencingFactorValidatorHelper';
import { groupDetailsValidator } from './SaveGroup/Helpers/groupDetailsValidatorHelper';
import { CreateGroupStepsEnum } from 'utils/enum';
import { showErrorToast } from 'state/toast/toastState';
import { ERROR_MESSAGES } from 'constants/messages';
import { getSelectedAnchorCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import AppStepper from 'components/newTheme/AppStepper/AppStepper';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppText from 'components/newTheme/AppText/AppText';

interface Props {
  isOpen: boolean;
}

const steps: StepItem[] = [
  {
    label: CreateGroupStepsEnum.FIRST_STEP
  },
  {
    label: CreateGroupStepsEnum.SECOND_STEP
  },
  {
    label: CreateGroupStepsEnum.THIRD_STEP
  }
];

const StoreGroupCreationDrawer: FC<Props> = ({ isOpen }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const {
    isOpen: isOpenCancelPrompt,
    onClose: onCloseCancelPrompt,
    onOpen: onOpenCancelPrompt
  } = useDisclosure();
  const dispatch = useDispatch();
  const {
    isOpen: isOpenSavePrompt,
    onClose: onCloseSavePrompt,
    onOpen: onOpenSavePrompt
  } = useDisclosure();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const groupFilter = groupConfigurationState.groupFilter;
  const groupDetailsState = groupConfigurationState.groupDetails;
  const predictors =
    groupConfigurationState.groupLabels?.filter((x) => x.name === 'predictor') ?? [];

  const onDrawerClose = () => {
    dispatch(resetGroupFilter());
    dispatch(closeGroupConfigDrawer());
    setActiveStep(0);
  };

  const onCancelHandler = () => {
    onDrawerClose();
    onCloseCancelPrompt();
  };

  const onStepChangeHandler = (step: number) => {
    if (activeStep === 0) {
      const anchorCount = getSelectedAnchorCount(groupFilter, 'anchor', 2);
      if (!anchorCount) {
        showErrorToast(ERROR_MESSAGES.ERROR_SELECT_ANCHOR);
        return;
      }
    }
    if (step === 2) {
      const isValidSelection = predictorsSelectionValidator(predictors);
      if (!isValidSelection) {
        return;
      }
    }
    setActiveStep(step);
  };

  const onNextHandler = () => {
    if (activeStep === 0) {
      const anchorCount = getSelectedAnchorCount(groupFilter, 'anchor', 2);
      if (!anchorCount) {
        showErrorToast(ERROR_MESSAGES.ERROR_SELECT_ANCHOR);
        return;
      }
    }
    if (activeStep === 1) {
      const isValidSelection = predictorsSelectionValidator(predictors);
      if (!isValidSelection) {
        return;
      }
    }
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const onValidationHandler = () => {
    const isValid = groupDetailsValidator(groupDetailsState);
    if (isValid) {
      onSaveHandler();
    }
  };

  const onSaveHandler = () => {
    const isValidGroupDetails = groupDetailsValidator(groupDetailsState);
    if (isValidGroupDetails) {
      dispatch(
        createGroupRequest({
          isWarehouseGroup: false
        })
      );
      dispatch(closeGroupConfigDrawer());
      setActiveStep(0);
    } else {
      setActiveStep(2);
    }

    onCloseSavePrompt();
  };

  const onPreviousHandler = () => {
    if (activeStep !== 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const onChangeGroupDetails = (key: GroupDetailsKeyT, value: string | number | ScheduleType) => {
    dispatch(
      setGroupDetails({
        key,
        value
      })
    );
  };

  const onChangeFrequencyHandler = (selectedOption: { key: string; value: string }) => {
    dispatch(
      setGroupDetails({
        key: 'frequency',
        value: selectedOption.key as ScheduleType
      })
    );
  };

  const onChangeHandler = (factorName: string, type: InfluencingFactorTypes, checked: boolean) => {
    dispatch(
      selectPredictor({
        factorName,
        type,
        checked
      })
    );
  };

  const renderStepDrawer = useCallback(() => {
    switch (activeStep) {
      case 0:
        return <FilterTypeItemList viewFilter={false} />;
      case 1:
        return (
          <InfluencingFactorsPicker
            influencingFactors={predictors}
            onChangeHandler={onChangeHandler}
          />
        );
      case 2:
        return (
          <SaveGroup
            onChangeHandler={onChangeGroupDetails}
            detailsObj={groupDetailsState}
            onChangeOption={onChangeFrequencyHandler}
          />
        );
      default:
        break;
    }
  }, [activeStep, predictors, groupDetailsState]);

  const cancelConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">The changes you have made in filters will be discarded.</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Cancel Changes"
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
        children={renderBody()}
      />
    );
  }, [isOpenCancelPrompt]);

  const saveConfirmationPrompt = useCallback(() => {
    const renderBody = () => {
      return (
        <>
          <AppText size="usm">New store group will be created with this details</AppText>
          <AppText size="usm" mt={2}>
            Are you sure you want to continue?
          </AppText>
        </>
      );
    };

    return (
      <AppUserInputPrompt
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="NO"
        rightBtnName="YES"
        title="Store group creation"
        onConfirmHandler={onSaveHandler}
        onCloseHandler={onCloseSavePrompt}
        children={renderBody()}
      />
    );
  }, [isOpenSavePrompt]);

  const handleClick = activeStep === 2 ? onValidationHandler : onNextHandler;
  const buttonLabel = activeStep === 2 ? 'Save' : 'Next';
  const isDisabledButton = activeStep === 0 ? true : false;

  return (
    <>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
      <Drawer isOpen={isOpen} placement="right" onClose={onOpenCancelPrompt}>
        <DrawerOverlay />
        <DrawerContent
          maxH="100vh"
          bg={ocean_blue_600}
          w="600px"
          maxW="600px"
          borderRadius="12px 0px 0px 12px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          pl="16px"
          pr="16px"
          pt="22px"
          userSelect="none"
        >
          <DrawerCloseButton mt="10px" color={blue_500} />

          <HStack>
            <VStack align="left">
              <AppText lineHeight="28px" size="body1" fontWeight="600" fontStyle="normal">
                Create Group - Store
              </AppText>
            </VStack>
          </HStack>
          <Divider color="#595959" h="1px" mt="8px" />
          <DrawerBody p={0} overflow="hidden">
            <VStack pt="16px">
              <Box h="50px" w="full" mb="30px">
                <AppStepper
                  steps={steps}
                  activeStep={activeStep}
                  onStepChange={onStepChangeHandler}
                />
              </Box>
              {renderStepDrawer()}
            </VStack>
          </DrawerBody>

          <DrawerFooter p={0}>
            <Flex direction="column" w="full" pb="15px">
              <Divider color="#595959" h="1px" mt="8px" mb="20px" />
              <HStack w="full" justify="end">
                <AppButton
                  variant="secondary"
                  isDisabled={isDisabledButton}
                  size="medium"
                  onClick={onPreviousHandler}
                  px="25px"
                >
                  Previous
                </AppButton>
                <AppButton variant="primary" size="medium" onClick={handleClick} px="25px">
                  {buttonLabel}
                </AppButton>
              </HStack>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StoreGroupCreationDrawer;
