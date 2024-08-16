import { FC, useEffect, useMemo, useRef } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import {
  IAlert,
  alertSliceSelector,
  expandSelectedAlertEdit,
  updateAlertName
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import AlertConfigurationItem from '../../CreateAlerts/AlertCreationSteps/AlertConfiguration/AlertConfigurationItem';
import AppText from 'components/newTheme/AppText/AppText';
import AppInput from 'components/newTheme/AppInput/AppInput';
import AppButton from 'components/newTheme/AppButton/AppButton';
import {
  getFilterDataRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  updateGroupFilter,
  updateItemSelectionDrawerOpenFrom
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { produce } from 'immer';
import { storeInLocal } from 'utils/localStorage';
import FilterItemsSelectionDrawer from '../../CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import { neutral_200 } from 'theme/colors';

interface Props {}

const EditAlertMainSection: FC<Props> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const defaultAlertTypes = alertState.defaultAlertTypes;
  const alertDefinition = alertState.alertDefinition;
  const alertName = alertState.alertName;
  const errors = alertState.errors;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const selectedEditAlertTypeIndex = alertState.alertLocalScope.selectedEditAlertType;
  const enableScrolling = alertState.alertLocalScope.enableEditAlertScroll;
  const rightPanelRetainDataList =
    groupConfigurationState.groupFilter.filterLocalScope.rightPanelRetainDataList;
  const selectedTotalSkuCount =
    groupConfigurationState.groupFilter.filterLocalScope?.totalSelectedSkuCount ?? 0;
  const totalSkuCount = alertState.alertDefinition?.skuLocationCount;

  const scrollToRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const skuLocationCount = useMemo(() => {
    return (
      rightPanelRetainDataList.find(
        (filterItem) => filterItem.code === 1 && filterItem.type === 'sku'
      )?.selectedItems.length || 0
    );
  }, [rightPanelRetainDataList]);

  const onAlertTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAlertName(event.target.value));
  };

  const onClickModifySkuHandler = () => {
    onClickModifySku('sku', 1, 'SKU-locations');
    dispatch(updateItemSelectionDrawerOpenFrom('page'));
  };

  const onClickModifySku = (filterType: string, filterCode: number, drawerTitle: string) => {
    const _groupFilter = produce(
      groupConfigurationState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterType = filterType;
          draft.filterCode = filterCode;
          draft.filterLocalScope.isOpenItemSelectionDrawer = true;
          draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
        }
      }
    );

    dispatch(updateGroupFilter(_groupFilter));
    dispatch(
      getFilterDataRequest({
        filterType,
        filterCode,
        pageNumber: 1,
        viewFilter: false,
        isModifyAlertPage: true
      })
    );
    storeInLocal('insightDrawerTitle', drawerTitle);
  };

  const scrollToItem = (index: number) => {
    if (scrollToRef && scrollToRef.current) {
      const element = scrollToRef.current.children[index];
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (enableScrolling) {
      scrollToItem(selectedEditAlertTypeIndex);
      dispatch(expandSelectedAlertEdit(selectedEditAlertTypeIndex));
    }
  }, [selectedEditAlertTypeIndex, enableScrolling]);

  return (
    <>
      <FilterItemsSelectionDrawer
        okButtonName="Modify List"
        isOpen={!!groupConfigurationState.groupFilter?.filterLocalScope.isOpenItemSelectionDrawer}
        totalCount={totalSkuCount}
        isEnableSelectAll={false}
      />
      <VStack w="full" pt="20px" pb="40px">
        <VStack w="full" align="start" spacing="8px">
          <HStack spacing="1px">
            <AppText size="body2" color={neutral_200}>
              Alert Name
            </AppText>
            <AppText size="body2" color="#F8705E">
              *
            </AppText>
          </HStack>
          <AppInput
            placeholder="Enter Alert Name"
            value={alertName}
            onChange={onAlertTitleChange}
            variant="primary"
            size="small"
            fontSize="14px"
            w="796px"
            error={errors?.alertName}
            maxLength={40}
          />
        </VStack>
        <HStack w="full" spacing="20px" pb="40px" pt="32px">
          <VStack align="start">
            <AppText fontSize="32px" h="35px" color="#fff" fontWeight={400}>
              {selectedTotalSkuCount}
            </AppText>
            <AppText color="#bbb" fontSize="12px" h="15px">
              SKU Locations
            </AppText>
          </VStack>
          <VStack h="full" alignSelf="end">
            <AppButton
              variant="secondary"
              size="medium"
              onClick={onClickModifySkuHandler}
              px="14px"
            >
              Modify SKU List
            </AppButton>
          </VStack>
        </HStack>
        <VStack w="full" spacing="8px" userSelect="none" ref={scrollToRef}>
          {defaultAlertTypes &&
            defaultAlertTypes.map((alertType, index) => (
              <HStack key={index} w="full">
                <AlertConfigurationItem alertTypeData={alertType} key={alertType.type} />
              </HStack>
            ))}
        </VStack>
      </VStack>
    </>
  );
};

export default EditAlertMainSection;
