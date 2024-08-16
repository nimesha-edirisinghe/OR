import { FC, useEffect, useState } from 'react';
import { Box, Center, HStack, Skeleton, VStack, usePrevious } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { neutral_500, ocean_blue_600, ocean_blue_500, red_500 } from 'theme/colors';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import ActionBar from './ActionBar/ActionBar';
import ParameterPanel from './ParameterPanel/ParameterPanel';
import PlanTablePanel from './PlanTablePanel/PlanTablePanel';
import ReplenishmentInfoTable from './ReplenishmentInfoTable/ReplenishmentInfoTable';
import ReplenishmentSkuListPanel from './ReplenishmentSkuListPanel/ReplenishmentSkuListPanel';
import {
  IRPLView,
  addOrRemoveFromSelectedRplSkuList,
  getRplPlanDetailsRequest,
  rplAlertTypeRequest,
  rplViewSliceSelector,
  setReplEditable,
  setSelectedRplSkuAction,
  updateRplSkuListSelectedStatus
} from 'state/pages/view/replenishmentView/rplViewPageState';
import MaximizedRplInfoPanel from './MaximizedRplInfoPanel/MaximizedRplInfoPanel';
import AppText from 'components/AppText/AppText';
import useNavigator from 'hooks/useNavigator';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import ReplenishmentHeader from '../ReplenishmentHeader/ReplenishmentHeader';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useNavigate } from 'react-router-dom';
import { scrollbarYStyles } from 'theme/styles';

interface Props {
  filterLabelTypes?: GroupLabelTypes;
}

const ReplenishmentMainSection: FC<Props> = ({ filterLabelTypes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maximizedInfo, setMaximizedInfo] = useState<boolean>(false);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const rplTableDataList = rplViewState.rplSkuDataList?.list;
  const rplSelectedSku = rplViewState.rplSelectedSku;
  const rplSelectedSkuList = rplViewState.rplSelectedSkuList;
  const isSelectedAll = rplViewState.rplViewLocalScope.globalRplSkuSelected;
  const previousSelectedRplSkuList = usePrevious(rplSelectedSkuList);
  const planNavigator = useNavigator(rplSelectedSkuList);
  const orderQtyDetailsList = rplViewState.rplPlanDetails?.orderQtyDetails?.list!;
  const stockMovementList = rplViewState.rplPlanDetails?.stockMovement?.list!;
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const [initialOrgKey, setInitialOrgKey] = useState<number>(selectedOrgKey);
  const [newOrgKey, setNewOrgKey] = useState<number>();

  const requestReplenishmentPlan = (selectedSku: ReplenishmentSkuListItem) => {
    if (!rplSelectedSkuList.length) {
      planNavigator.setCurrentStepIndex(0);
    }
    dispatch(setSelectedRplSkuAction(selectedSku));
    dispatch(getRplPlanDetailsRequest());
  };

  useEffect(() => {
    setNewOrgKey(selectedOrgKey);
  }, [selectedOrgKey]);

  useEffect(() => {
    if (rplTableDataList !== null && newOrgKey && initialOrgKey !== newOrgKey) {
      navigate('/app/replenishment-planning');
    }
  }, [selectedOrgKey, newOrgKey]);

  useEffect(() => {
    if (
      rplSelectedSkuList &&
      previousSelectedRplSkuList &&
      previousSelectedRplSkuList.length &&
      rplSelectedSkuList.length === previousSelectedRplSkuList.length
    ) {
      requestReplenishmentPlan(rplSelectedSkuList[planNavigator.currentStepIndex]);
    }
  }, [planNavigator.currentStepIndex, maximizedInfo]);

  const onMaxMinHandler = () => {
    setMaximizedInfo((prev) => {
      if (prev) {
        dispatch(setReplEditable(false));
      }
      return !prev;
    });
  };

  const onChangeAllHandler = (isSelected: boolean, id: number) => {
    dispatch(
      updateRplSkuListSelectedStatus({
        id: 1,
        type: 'all'
      })
    );
    dispatch(
      addOrRemoveFromSelectedRplSkuList({
        isSelectedAll: isSelected,
        selectedType: 'all'
      })
    );
    !isSelectedAll && rplTableDataList && requestReplenishmentPlan(rplTableDataList[0]);
    planNavigator.setCurrentStepIndex(0);
  };

  const updateSelectedListAndSkuStates = (
    isSelected: boolean,
    anchorProdKey: number,
    _selectedSku: ReplenishmentSkuListItem
  ) => {
    dispatch(updateRplSkuListSelectedStatus({ id: anchorProdKey }));
    dispatch(addOrRemoveFromSelectedRplSkuList({ data: _selectedSku, selectedType: '' }));
  };

  const onSkuListChange = (id: number) => {
    try {
      const _selectedSku = rplTableDataList?.find((skuObj, index) => skuObj.anchorProdKey === id)!;
      const isSelected = _selectedSku.isSelected;

      if (!isSelected) {
        updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
        planNavigator.setCurrentStepIndex(rplSelectedSkuList.length);
        requestReplenishmentPlan(_selectedSku);
      } else {
        const idx = rplSelectedSkuList.findIndex(
          (skuListItem) => skuListItem.anchorProdKey === _selectedSku?.anchorProdKey
        );

        planNavigator.removeStep(idx);
        if (id === rplSelectedSku?.anchorProdKey && rplSelectedSkuList.length > 1) {
          updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
          const _ss = idx === 0 ? rplSelectedSkuList[1] : rplSelectedSkuList[idx - 1];
          requestReplenishmentPlan(_ss);
        } else {
          updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
        }
      }
      dispatch(rplAlertTypeRequest());
    } catch (e) {
      console.log('Sku list update error ', e);
    }
  };

  useEffect(() => {
    if (rplSelectedSkuList?.length) dispatch(rplAlertTypeRequest());
  }, [planNavigator.currentStepIndex]);

  return (
    <>
      <MaximizedRplInfoPanel
        onMaxMinHandler={onMaxMinHandler}
        isOpenPanel={maximizedInfo}
        planNavigator={planNavigator}
      />
      <HStack spacing="20px" h="full" w="full">
        <Box w="calc(100vw/4)" h="full" transition="all 0.1s ease-in">
          <ReplenishmentSkuListPanel
            onSkuListChange={onSkuListChange}
            onChangeAllHandler={onChangeAllHandler}
            filterLabelTypes={filterLabelTypes}
          />
        </Box>
        <VStack
          w="full"
          h="calc(100vh - 115px)"
          overflow="hidden"
          transition="all 0.1s ease-in"
          borderBottomRadius="8px"
          spacing="16px"
        >
          <HStack h="36px" w="full">
            <ReplenishmentHeader />
          </HStack>
          {rplViewState.rplSelectedSkuList?.length > 0 && (
            <Skeleton
              w="full"
              height="full"
              borderRadius="10px"
              isLoaded={!rplViewState.loading.planDetails}
              fadeDuration={1}
              speed={1}
            >
              <VStack w="full" h="full" spacing={0}>
                <Box bg={ocean_blue_500} h="52px" w="full" borderTopRadius="8px">
                  <ActionBar
                    onMaxMinHandler={onMaxMinHandler}
                    navigator={planNavigator}
                    isOpenPanel={maximizedInfo}
                    callBack={setMaximizedInfo}
                  />
                </Box>
                <VStack
                  w="full"
                  h="full"
                  bg={ocean_blue_600}
                  p="12px"
                  pr="8px"
                  gap="12px"
                  overflowY="scroll"
                  __css={scrollbarYStyles}
                >
                  <HStack w="full" spacing="8px">
                    {rplViewState.AlertType?.alertTypeDisplayName?.map((item) => (
                      <HStack
                        bg="#F4312A1A"
                        border="0px 0px 0px 1px"
                        borderRadius="23px"
                        h="26px"
                        padding="4px 12px 4px 12px"
                      >
                        <AppText
                          fontSize="12px"
                          fontWeight={400}
                          color={red_500}
                          textAlign={'center'}
                          textTransform={'capitalize'}
                        >
                          {item} Alert
                        </AppText>
                      </HStack>
                    ))}
                  </HStack>
                  <Box h="45px" w="full">
                    <ParameterPanel />
                  </Box>
                  <Box h="151px" w="full">
                    {orderQtyDetailsList?.length > 0 ? (
                      <PlanTablePanel tableHeight="151px" maximized={false} />
                    ) : (
                      <Center h="151px" w="full" bg={ocean_blue_500} borderRadius="16px">
                        <AppText size="body2" color={neutral_500} fontStyle="italic">
                          No proposed orders for the current planning period.
                        </AppText>
                      </Center>
                    )}
                  </Box>
                  <Box h="full" w="full" borderRadius="8px" pb="50px">
                    {stockMovementList?.length > 0 ? (
                      <ReplenishmentInfoTable tableHeight="100%" maximized={false} />
                    ) : (
                      <Center h="full" bg={ocean_blue_500} borderRadius="8px">
                        <AppText size="body2" color={neutral_500} fontStyle="italic">
                          No proposed orders for the current planning period.
                        </AppText>
                      </Center>
                    )}
                  </Box>
                </VStack>
              </VStack>
            </Skeleton>
          )}

          {rplViewState.rplSelectedSkuList?.length === 0 && (
            <VStack
              w="full"
              h="full"
              overflow="hidden"
              transition="all 0.1s ease-in"
              spacing="8px"
              borderRadius="8px"
              bg={ocean_blue_500}
            >
              <Center h="full">
                <AppText size="body2" color={neutral_500} fontStyle="italic">
                  Please select a SKU-location to view the replenishment schedule here
                </AppText>
              </Center>
            </VStack>
          )}
        </VStack>
      </HStack>
    </>
  );
};

export default ReplenishmentMainSection;
