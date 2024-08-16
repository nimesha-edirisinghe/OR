import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfluencingFactorsPicker from './InfluencingFactorsPicker/InfluencingFactorsPicker';
import { StepItem } from 'components/AppStepper/AppStepper';
import SaveGroup from './SaveGroup/SaveGroup';
import FilterTypeItemList from './AnchorLocationFilter/FilterDrawer/FilterTypeItemList';
import {
  IGroupConfigurationSlice,
  createGroupRequest,
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  resetGroupDetail,
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
import {
  getResponseAnchorAndSkuCount,
  getSelectedAnchorCount
} from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { yellow_500 } from 'theme/colors';
import AppStepper from 'components/newTheme/AppStepper/AppStepper';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppText from 'components/newTheme/AppText/AppText';
import { scrollbarYStyles } from 'theme/styles';
import AnchorLocationFilter from './AnchorLocationFilter/AnchorLocation/AnchorLocationFilter';
import { useNavigate } from 'react-router-dom';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { IUser, userSliceSelector } from 'state/user/userState';

interface Props {}

const steps: StepItem[] = [
  {
    label: CreateGroupStepsEnum.FIRST_STEP
  },
  {
    label: CreateGroupStepsEnum.SECOND_STEP
  },
  {
    label: CreateGroupStepsEnum.THIRD_STEP
  },
  {
    label: CreateGroupStepsEnum.FOURTH_STEP
  }
];

const StoreGroupCreationStepper: FC<Props> = () => {
  const navigate = useNavigate();
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
  const userState: IUser = useSelector(userSliceSelector);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [anchorCount, setAnchorCount] = useState(0);
  const [skuCount, setSkuCount] = useState(0);
  const groupFilter = groupConfigurationState.groupFilter;
  const groupDetailsState = groupConfigurationState.groupDetails;
  const predictors =
    groupConfigurationState.groupLabels?.filter((x) => x.name === 'predictor') ?? [];
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(resetGroupFilter());
        dispatch(resetGroupDetail());
        dispatch(getFilterCountRequest({ whFlag: 0 }));
        dispatch(
          getLabelsRequest({ labelTypes: ['location', 'product', 'anchor', 'predictor', 'store'] })
        );
        setActiveStep(0);
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Group details fetching error ', error);
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    const count = getResponseAnchorAndSkuCount(groupFilter);
    setAnchorCount(count.anchor);
    setSkuCount(count.sku);
  }, [groupFilter.filterTotalItemsCount]);

  const onCancelHandler = () => {
    dispatch(resetGroupFilter());
    dispatch(resetGroupDetail());
    setActiveStep(0);
    onCloseCancelPrompt();
    navigate('/app/group-config');
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
    if (activeStep === 1) {
      const anchorCount = getSelectedAnchorCount(groupFilter, 'anchor', 2);
      if (!anchorCount) {
        showErrorToast(ERROR_MESSAGES.ERROR_SELECT_ANCHOR);
        return;
      } else dispatch(getFilterCountRequest({ whFlag: 0 }));
    }
    if (activeStep === 2) {
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
      onOpenSavePrompt();
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
      dispatch(resetGroupFilter());
      setActiveStep(0);
      navigate('/app/group-config');
    }
    onCloseSavePrompt();
  };

  const onPreviousHandler = () => {
    if (activeStep !== 0) {
      setActiveStep((prevStep) => prevStep - 1);
    } else {
      onOpenCancelPrompt();
    }
    if (activeStep === 1) dispatch(getFilterCountRequest({ whFlag: 0 }));
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
        return <AnchorLocationFilter />;
      case 2:
        return (
          <InfluencingFactorsPicker
            influencingFactors={predictors}
            onChangeHandler={onChangeHandler}
          />
        );
      case 3:
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
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="Yes"
        rightBtnName="No"
        title="Cancel Changes"
        infoMessage={`The changes you have made in filters will be discarded.Are you sure you want to continue?`}
        onConfirmHandler={onCancelHandler}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  const saveConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenSavePrompt}
        onClose={onCloseSavePrompt}
        leftBtnName="NO"
        rightBtnName="Yes"
        title="Store group creation"
        infoMessage={`New store group will be created with this details.Are you sure you want to continue?`}
        onConfirmHandler={onCloseSavePrompt}
        onCloseHandler={onSaveHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenSavePrompt]);

  const handleClick = activeStep === 3 ? onValidationHandler : onNextHandler;
  const rightButtonLabel = activeStep === 3 ? 'Create group' : 'Next';
  const leftButtonLabel = activeStep === 0 ? 'Cancel' : 'Back';
  const isCreateGroupPage = activeStep === 3;

  return (
    <>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}
      <VStack w="full" transition=".2s ease-in" overflowY="auto" py="20px" __css={scrollbarYStyles}>
        <VStack borderRadius="10px" pb="18px" align="center" justify="center">
          <Box h="50px" mb="30px">
            <AppStepper steps={steps} activeStep={activeStep} onStepChange={onStepChangeHandler} />
          </Box>
          {renderStepDrawer()}
          <HStack w="full" justify="space-between" pt={'15px'}>
            {isCreateGroupPage ? (
              <HStack>
                <HStack>
                  <AppText size={'body3'} fontWeight={'400'} color={'#57809A'}>
                    Anchors-locations:
                  </AppText>
                  <AppText fontSize="13px" fontWeight={'600'} color={'#57809A'}>
                    {anchorCount}
                  </AppText>
                </HStack>
                <HStack>
                  <AppText size={'body3'} fontWeight={'400'} color={'#57809A'}>
                    SKU-locations:
                  </AppText>
                  <AppText fontSize="13px" fontWeight={'600'} color={'#57809A'}>
                    {skuCount}
                  </AppText>
                </HStack>
              </HStack>
            ) : (
              <HStack></HStack>
            )}
            <HStack>
              <AppButton variant="secondary" size="medium" onClick={onPreviousHandler} px="25px">
                {leftButtonLabel}
              </AppButton>
              <AppButton variant="primary" size="medium" onClick={handleClick} px="25px">
                {rightButtonLabel}
              </AppButton>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default StoreGroupCreationStepper;
