import { HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  updateRightPanelRetainDataList
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import {
  IGroupConfigurationSlice,
  createGroupRequest,
  getFilterCountRequest,
  groupConfigurationSliceSelector,
  resetGroupDetail,
  setGroupDetails
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupDetailsKeyT } from 'types/groupConfig';
import { ScheduleType } from 'types/responses/jobScheduleResponses';
import { groupDetailsValidator } from '../../StoreGroup/StoreGroupCreation/SaveGroup/Helpers/groupDetailsValidatorHelper';
import { ocean_blue_500, neutral_200, white, ocean_blue_300, yellow_500 } from 'theme/colors';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import AppInput from 'components/AppInput/AppInput';
import { repeatDurationOptions } from 'utils/utility';
import { getResponseAnchorAndSkuCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopup from 'components/newTheme/AppPopup/AppPopup';
import { IUser, userSliceSelector } from 'state/user/userState';

interface Props {}

const WarehouseGroupCreation: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isOpen: isOpenSavePrompt,
    onClose: onCloseSavePrompt,
    onOpen: onOpenSavePrompt
  } = useDisclosure();
  const {
    isOpen: isOpenCancelPrompt,
    onClose: onCloseCancelPrompt,
    onOpen: onOpenCancelPrompt
  } = useDisclosure();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const userState: IUser = useSelector(userSliceSelector);
  const [groupName, setGroupName] = useState<string>('');
  const [forecastHorizon, setForecastHorizon] = useState<string>('');
  const [anchorCount, setAnchorCount] = useState(0);
  const [skuCount, setSkuCount] = useState(0);

  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const beforeEditFilterOptionsLevel1 =
    activityLogState.dashboardFilter.filterLocalScope.beforeEditFilterOptionsLevel1;
  const groupDetailsState = groupConfigurationState.groupDetails;
  const groupFilter = groupConfigurationState.groupFilter;
  const options: string[] = repeatDurationOptions.map(
    (obj: { key: string; value: string }) => obj.key
  );

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(resetGroupDetail());
        dispatch(getFilterCountRequest({ whFlag: 1 }));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('Group details fetching error ', error);
    }
  }, [selectedOrgKey]);

  useEffect(() => {
    if (groupDetailsState.horizon !== 0) setForecastHorizon(groupDetailsState.horizon.toString());
  }, [groupDetailsState.horizon]);

  useEffect(() => {
    const count = getResponseAnchorAndSkuCount(groupFilter);
    setAnchorCount(count.anchor);
    setSkuCount(count.sku);
  }, [groupFilter.filterTotalItemsCount]);

  const onCancelHandler = () => {
    onCloseCancelPrompt();
    dispatch(resetGroupDetail());
    navigate('/app/group-config');
    dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1));
  };

  const onValidationHandler = () => {
    const isValid = groupDetailsValidator(groupDetailsState);
    if (isValid) {
      onOpenSavePrompt();
    }
  };

  const onSaveConfirmHandler = () => {
    const isValidGroupDetails = groupDetailsValidator(groupDetailsState);
    if (isValidGroupDetails) {
      dispatch(
        createGroupRequest({
          isWarehouseGroup: true
        })
      );
      dispatch(resetGroupDetail());
      navigate('/app/group-config');
      dispatch(updateRightPanelRetainDataList(beforeEditFilterOptionsLevel1));
    }
    onCloseSavePrompt();
  };

  const onChangeGroupDetails = (key: GroupDetailsKeyT, value: string | number | ScheduleType) => {
    let isValid = true;
    if (key === 'name') {
      setGroupName(value as string);
    }
    if (key === 'horizon') {
      const horizon = value as number;
      const isHorizonValid = /^\d+$/.test(horizon.toString()) || horizon.toString() === '';
      if (isHorizonValid) setForecastHorizon(value as string);
      else isValid = false;
    }
    if (isValid) {
      dispatch(
        setGroupDetails({
          key,
          value
        })
      );
    }
  };

  const onChangeFrequencyHandler = (selectedOption: { key: string; value: string }) => {
    dispatch(
      setGroupDetails({
        key: 'frequency',
        value: selectedOption.key as ScheduleType
      })
    );
  };

  const cancelConfirmationPrompt = useCallback(() => {
    return (
      <AppPopup
        isOpen={isOpenCancelPrompt}
        onClose={onCloseCancelPrompt}
        leftBtnName="Yes"
        rightBtnName="No"
        title="Cancel Changes"
        infoMessage={`The changes you have made will be discarded.Are you sure you want to continue?`}
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
        leftBtnName="No"
        rightBtnName="Yes"
        title="Warehouse group creation"
        infoMessage={`New warehouse group will be created with this details.Are you sure you want to continue?`}
        onConfirmHandler={onCloseSavePrompt}
        onCloseHandler={onSaveConfirmHandler}
        icon={<AppIcon name="warningPrompt" fill={yellow_500} width="54px" height="54px" />}
      />
    );
  }, [isOpenSavePrompt]);

  return (
    <>
      {cancelConfirmationPrompt()}
      {saveConfirmationPrompt()}

      <VStack w="full" pt="20px" justify={'center'}>
        <AppText textAlign={'center'} w={'full'} fontSize={'20px'} color={white} fontWeight={600}>
          Create Product-Warehouse Group
        </AppText>
        <AppText textAlign={'center'} w={'full'} size={'body3'} color={white} fontWeight={400}>
          Provide the Group Name, Forecasting frequency, and horizon to create the Groups
        </AppText>
        <VStack w={'636px'} gap="20px">
          <VStack w={'full'}>
            <AppText w={'full'} size={'body2'} color={neutral_200} fontWeight={'400'}>
              Group Name
            </AppText>
            <AppInput
              onChange={(e) => onChangeGroupDetails('name', e.target.value)}
              value={groupName}
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
              handleItemClick={(value) => onChangeFrequencyHandler({ key: value, value })}
              selectedItem={groupDetailsState.frequency!}
            />
          </VStack>
          <VStack w={'full'}>
            <AppText size={'body2'} w={'full'} color={neutral_200} fontWeight={'400'}>
              Forecasting Horizon
            </AppText>
            <AppInput
              type="text"
              onChange={(e) => onChangeGroupDetails('horizon', e.target.value)}
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
          <HStack w={'full'} justify={'space-between'}>
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
            <HStack>
              <AppButton variant="secondary" size="medium" onClick={onOpenCancelPrompt} px="25px">
                Cancel
              </AppButton>
              <AppButton variant="primary" size="medium" onClick={onValidationHandler} px="25px">
                Create group
              </AppButton>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default WarehouseGroupCreation;
