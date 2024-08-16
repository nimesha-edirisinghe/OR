import { FC, useCallback } from 'react';
import { HStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { neutral_300, ocean_blue_600, yellow_500 } from 'theme/colors';
import AppButton from 'components/newTheme/AppButton/AppButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertFormValidator,
  alertSliceSelector,
  getAlertDefinitionRequest,
  IAlert,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey,
  updateAlertRequest
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  resetGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { isValidAlertConfigs } from '../../CreateAlerts/AlertCreationSteps/AlertConfiguration/Helpers/AlertConfigurationValidator';
import { showErrorToast } from 'state/toast/toastState';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { ERROR_MESSAGES } from 'constants/messages';
import { getSelectedAnchorCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { updateRightPanelRetainDataList } from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

interface Props {}

const EditAlertHeader: FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alertState: IAlert = useSelector(alertSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const rightPanelRetainPrevDataList =
    groupConfigurationState.groupFilter.filterLocalScope.beforeEditFilterOptionsLevel1;

  const defaultAlertTypes = alertState.defaultAlertTypes;
  const {
    isOpen: isOpenCancelPrompt,
    onToggle: onToggleCancelPrompt,
    onClose: onCloseCancelPrompt
  } = useDisclosure();

  const onEditSuccessCb = () => {
    dispatch(resetGroupFilter());
    navigate('/app/predictive-alerts');
  };

  const onEditPageSave = () => {
    const skuLocationCount = getSelectedAnchorCount(groupConfigurationState.groupFilter, 'sku', 1);
    if (!skuLocationCount) {
      showErrorToast(ERROR_MESSAGES.SKU_LOCATION_SELECTION_REQUIRED);
      return;
    }
    dispatch(alertFormValidator());
    const isValidConfig = isValidAlertConfigs(defaultAlertTypes);
    if (isValidConfig.status) {
      if (!(alertState.alertName === '' || alertState.alertName === null)) {
        dispatch(updateAlertRequest({ cb: onEditSuccessCb }));
      }
    } else {
      showErrorToast(isValidConfig.message);
    }
  };

  const onCancelEdit = () => {
    dispatch(getAlertDefinitionRequest());
  };

  const onBackButtonClicked = () => {
    if (alertState.errors.isFormDirty) {
      onToggleCancelPrompt();
    } else {
      dispatch(setAlertDefinitionSearchKey(''));
      dispatch(setAlertDefinitionPaginationPageNo(1));
      dispatch(updateRightPanelRetainDataList(rightPanelRetainPrevDataList || []));

      backNavigation();
    }
  };

  const backNavigation = () => {
    navigate('/app/predictive-alerts/definition');
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="YES"
        rightBtnName="NO"
        infoMessage="The changes you have made will be discarded. Are you sure you want to continue?"
        onConfirmHandler={() => backNavigation()}
        onCloseHandler={onCloseCancelPrompt}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenCancelPrompt]);

  return (
    <>
      {cancelConfirmationPrompt()}
      <HStack
        w="full"
        height="36px"
        borderRadius="10px"
        py="2px"
        userSelect="none"
        justifyContent="space-between"
      >
        <HStack spacing="8px">
          <AppIconButton
            aria-label="next"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="chevronLeft"
                width="7px"
                height="11px"
                fill={neutral_300}
              />
            }
            variant="secondary"
            size="iconMedium"
            onClick={onBackButtonClicked}
            bg={ocean_blue_600}
          />
        </HStack>
        <HStack spacing="12px">
          <AppButton variant="secondary" size="medium" onClick={onCancelEdit} px="14px">
            Restore
          </AppButton>
          <AppButton variant="primary" size="medium" onClick={onEditPageSave} px="14px">
            Save Changes
          </AppButton>
        </HStack>
      </HStack>
    </>
  );
};

export default EditAlertHeader;
