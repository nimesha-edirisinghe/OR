import { FC, useEffect, useState } from 'react';
import { Box, Center, HStack, Skeleton, VStack, usePrevious } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import ActionBar from './ActionBar/ActionBar';
import ParameterPanel from './ParameterPanel/ParameterPanel';
import PlanTablePanel from './PlanTablePanel/PlanTablePanel';
import ReplenishmentInfoTable from './ReplenishmentInfoTable/ReplenishmentInfoTable';
import ReplenishmentSkuListPanel from './ReplenishmentSkuListPanel/ReplenishmentSkuListPanel';
import MaximizedRplInfoPanel from './MaximizedRplInfoPanel/MaximizedRplInfoPanel';
import AppText from 'components/AppText/AppText';
import {
  IRPLWhView,
  addOrRemoveFromSelectedRplWHSkuList,
  getRplWHPlanDetailsRequest,
  rplWHViewSliceSelector,
  setSelectedRplWHSkuAction,
  updateRplWHSkuListSelectedStatus
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import useNavigator from 'hooks/useNavigator';
import { ReplenishmentSkuListItem } from 'types/responses/viewResponses';
import { resetViewRplPlanRightPanel } from 'state/pages/view/replenishmentView/rplViewPageState';
import WHReplenishmentHeader from '../WHReplenishmentHeader/WHReplenishmentHeader';
import { IUser, userSliceSelector } from 'state/user/userState';
import { useNavigate } from 'react-router-dom';

interface Props {
  filterLabelTypes?: GroupLabelTypes;
}

const WHReplenishmentMainSection: FC<Props> = ({ filterLabelTypes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [maximizedInfo, setMaximizedInfo] = useState<boolean>(false);
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const rplTableDataList = rplWhViewState.rplWhSkuDataList?.list;
  const rplSelectedSku = rplWhViewState.rplWhSelectedSku;
  const isSelectedAll = rplWhViewState.rplWhViewLocalScope.globalRplWhSkuSelected;
  const rplSelectedSkuList = rplWhViewState.rplWhSelectedSkuList;
  const previousSelectedRplSkuList = usePrevious(rplSelectedSkuList);
  const orderQtyDetailsList = rplWhViewState.rplWhPlanDetails?.orderQtyDetails?.list!;
  const stockMovementList = rplWhViewState.rplWhPlanDetails?.stockMovement?.list!;
  const planNavigator = useNavigator(rplSelectedSkuList);
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const [initialOrgKey, setInitialOrgKey] = useState<number>(selectedOrgKey);
  const [newOrgKey, setNewOrgKey] = useState<number>();

  const requestReplenishmentPlan = (selectedSku: ReplenishmentSkuListItem) => {
    if (!rplSelectedSkuList.length) {
      planNavigator.setCurrentStepIndex(0);
    }
    dispatch(setSelectedRplWHSkuAction(selectedSku));
    dispatch(getRplWHPlanDetailsRequest());
  };

  useEffect(() => {
    setNewOrgKey(selectedOrgKey);
  }, [selectedOrgKey]);

  useEffect(() => {
    if (rplTableDataList !== null && newOrgKey && initialOrgKey !== newOrgKey) {
      navigate('/app/wh-replenishment');
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
  }, [planNavigator.currentStepIndex]);

  const onMaxMinHandler = () => {
    setMaximizedInfo((prev) => !prev);
  };

  const onChangeAllHandler = (isSelected: boolean, id: number) => {
    if (!isSelected) {
      dispatch(resetViewRplPlanRightPanel());
    }
    dispatch(
      updateRplWHSkuListSelectedStatus({
        id,
        type: 'all'
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
    dispatch(updateRplWHSkuListSelectedStatus({ id: anchorProdKey }));
    dispatch(addOrRemoveFromSelectedRplWHSkuList({ data: _selectedSku, selectedType: '' }));
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
    } catch (e) {
      console.log('Sku list update error ', e);
    }
  };

  return (
    <>
      <MaximizedRplInfoPanel
        onMaxMinHandler={onMaxMinHandler}
        isOpenPanel={maximizedInfo}
        navigator={planNavigator}
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
          spacing="16px"
          borderBottomRadius="8px"
        >
          <HStack h="36px" w="full">
            <WHReplenishmentHeader />
          </HStack>
          {rplWhViewState.rplWhSelectedSkuList?.length > 0 && (
            <Skeleton
              w="full"
              height="full"
              borderRadius="10px"
              isLoaded={!rplWhViewState.loading.planDetails}
              fadeDuration={1}
              speed={1}
            >
              <VStack w="full" h="full" spacing={0}>
                <Box bg={ocean_blue_500} h="52px" w="full" borderTopRadius="8px">
                  <ActionBar onMaxMinHandler={onMaxMinHandler} navigator={planNavigator} />
                </Box>
                <VStack
                  w="full"
                  h="full"
                  bg={ocean_blue_600}
                  p="12px"
                  spacing="12px"
                  borderBottom="8px"
                >
                  <Box h="45px" w="full" minH="45px">
                    <ParameterPanel />
                  </Box>
                  <Box h="151px" w="full" borderRadius="8px">
                    {orderQtyDetailsList?.length > 0 ? (
                      <PlanTablePanel tableHeight="151px" />
                    ) : (
                      <Center h="full" w="full" bg={ocean_blue_500} borderRadius="8px">
                        <AppText size="body2" color={neutral_500} fontStyle="italic">
                          No proposed orders for the current planning period.
                        </AppText>
                      </Center>
                    )}
                  </Box>
                  <Box h="calc(100vh - 460px)" w="full" borderRadius="8px">
                    {stockMovementList?.length > 0 ? (
                      <ReplenishmentInfoTable tableHeight="calc(100vh - 460px)" />
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

          {rplWhViewState?.rplWhSelectedSkuList?.length === 0 && (
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

export default WHReplenishmentMainSection;
