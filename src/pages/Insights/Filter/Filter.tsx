import { HStack, Skeleton, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppButton from 'components/AppButton/AppButton';
import AppText from 'components/AppText/AppText';
import { SUCCESS_MESSAGES } from 'constants/messages';
import { AnimatePresence, motion } from 'framer-motion';
import { produce } from 'immer';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  insightSliceSelector,
  openFilterDrawer,
  addHotListIndicators,
  removeHotListIndicators,
  setStoreWarehouseOption,
  updateDashboardFilter,
  resetFilter,
  getFilterCountRequest
} from 'state/pages/insights/insightState';
import { showSuccessToast } from 'state/toast/toastState';
import { FilterLocalScopeI } from 'types/insight';
import { HotListIndicatorsT } from 'types/requests/insightRequest';
import { HotListIndicators } from 'utils/enum';

interface Props {
  resetFilterOptions: () => void;
  onClickApplyFilterHandler: () => void;
}

const Filter: FC<Props> = ({ resetFilterOptions, onClickApplyFilterHandler }) => {
  const { isOpen: isFilterOpen, onToggle: onFilterToggle, onOpen: onFilterOpen } = useDisclosure();
  const insightState: IInsight = useSelector(insightSliceSelector);
  const hotListIndicator: HotListIndicatorsT[] =
    insightState.dashboardFilter.filterOptions.hotListIndicator;
  const filterLocalScope: FilterLocalScopeI = insightState.dashboardFilter.filterLocalScope;
  const rightPanelRetainDataList =
    insightState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const filterMode = insightState.dashboardFilter.filterMode;

  const dispatch = useDispatch();

  const onClickMoreFilterHandler = () => {
    const _dashboardFilterOptions = produce(
      insightState.dashboardFilter,
      (draft: IInsight['dashboardFilter']) => {
        draft.filterLocalScope.beforeEditFilterOptionsLevel1 = rightPanelRetainDataList;
      }
    );
    dispatch(updateDashboardFilter(_dashboardFilterOptions));
    dispatch(openFilterDrawer());
  };

  const onClickHotListIndicatorHandler = (indicator: HotListIndicatorsT) => {
    if (
      hotListIndicator.length !== 1 &&
      hotListIndicator.includes(indicator) &&
      indicator !== HotListIndicators.ALL
    ) {
      dispatch(removeHotListIndicators(indicator));
    } else {
      if (hotListIndicator.includes(HotListIndicators.ALL) && indicator !== HotListIndicators.ALL) {
        dispatch(removeHotListIndicators(HotListIndicators.ALL));
      }
      if (!hotListIndicator.includes(indicator)) {
        dispatch(addHotListIndicators(indicator));
      }
    }
  };

  const onApplyFilter = () => {
    const _dashboardFilter = produce(
      insightState.dashboardFilter,
      (draft: IInsight['dashboardFilter']) => {
        draft.filterType = '';
      }
    );
    dispatch(updateDashboardFilter(_dashboardFilter));
    onClickApplyFilterHandler();
  };
  const onResetFilter = () => {
    dispatch(resetFilter({ filterMode: insightState.dashboardFilter.filterMode }));
    dispatch(getFilterCountRequest());
    resetFilterOptions();
    showSuccessToast(SUCCESS_MESSAGES.FILTER_RESET_COMPLETED);
  };

  return (
    <Skeleton
      w="full"
      height="full"
      borderRadius="10px"
      isLoaded={!insightState.isLoading}
      fadeDuration={1}
      speed={1}
    >
      <VStack w="full" bg="insights-section-bg-color" borderRadius="10px" userSelect="none">
        <HStack justify="space-between" px="22px" w="full" minH="64px">
          <HStack>
            <AppText fontSize="16px" fontWeight={600} lineHeight="24px">
              Filters
            </AppText>
            {filterMode === 'REPLENISHMENT_VIEW' && (
              <AppIconChakra
                name="filter"
                fill="#8C8C8C"
                w="18px"
                h="18px"
                cursor="pointer"
                onClick={() => onClickMoreFilterHandler()}
              />
            )}
          </HStack>
          {filterMode !== 'REPLENISHMENT_VIEW' && (
            <AppIconChakra
              name="chevronDown"
              fill="#8C8C8C"
              w="12px"
              h="8px"
              cursor="pointer"
              onClick={() => onFilterToggle()}
              transform={isFilterOpen ? 'rotate(180deg)' : 'rotate(0)'}
            />
          )}
        </HStack>
        <AnimatePresence>
          {(isFilterOpen || filterMode === 'REPLENISHMENT_VIEW') && (
            <HStack
              justify="space-between"
              px="22px"
              w="full"
              pb="26px"
              as={motion.div}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition=".3s"
            >
              <HStack>
                {filterMode !== 'REPLENISHMENT_VIEW' && (
                  <>
                    <VStack align="start" pr="23px">
                      <AppText fontSize="14px" fontWeight={500} lineHeight="22px">
                        Store/Warehouse
                      </AppText>
                      <HStack h="45px">
                        <AppButton
                          onClick={() => dispatch(setStoreWarehouseOption('store'))}
                          variant={filterLocalScope.isSelectedSore ? 'roundedSolid' : 'outline'}
                        >
                          Store
                        </AppButton>
                        <AppButton
                          onClick={() => dispatch(setStoreWarehouseOption('warehouse'))}
                          variant={
                            filterLocalScope.isSelectedWarehouse ? 'roundedSolid' : 'outline'
                          }
                        >
                          Warehouse
                        </AppButton>
                      </HStack>
                    </VStack>
                    <VStack align="start">
                      <AppText fontSize="14px" fontWeight={500} lineHeight="22px" px="23px">
                        Hot list indicator
                      </AppText>
                      <HStack borderX="1px solid #595959" px="23px" h="45px">
                        <AppButton
                          onClick={() => onClickHotListIndicatorHandler(HotListIndicators.ALL)}
                          variant={
                            hotListIndicator.includes(HotListIndicators.ALL)
                              ? 'roundedSolid'
                              : 'outline'
                          }
                        >
                          All
                        </AppButton>
                        <AppButton
                          onClick={() => onClickHotListIndicatorHandler(HotListIndicators.KVI)}
                          variant={
                            hotListIndicator.includes(HotListIndicators.KVI)
                              ? 'roundedSolid'
                              : 'outline'
                          }
                        >
                          KVI
                        </AppButton>
                        <AppButton
                          onClick={() => onClickHotListIndicatorHandler(HotListIndicators.WARM)}
                          variant={
                            hotListIndicator.includes(HotListIndicators.WARM)
                              ? 'roundedSolid'
                              : 'outline'
                          }
                        >
                          Warm
                        </AppButton>
                        <AppButton
                          onClick={() => onClickHotListIndicatorHandler(HotListIndicators.COLD)}
                          variant={
                            hotListIndicator.includes(HotListIndicators.COLD)
                              ? 'roundedSolid'
                              : 'outline'
                          }
                        >
                          Cold
                        </AppButton>
                        <AppButton
                          onClick={() => onClickHotListIndicatorHandler(HotListIndicators.OTHERS)}
                          variant={
                            hotListIndicator.includes(HotListIndicators.OTHERS)
                              ? 'roundedSolid'
                              : 'outline'
                          }
                        >
                          Other
                        </AppButton>
                      </HStack>
                    </VStack>
                    <VStack pl="23px" pt="30px">
                      <AppText
                        fontSize="14px"
                        fontWeight={500}
                        lineHeight="16px"
                        color="#F7CC45"
                        cursor="pointer"
                        onClick={onClickMoreFilterHandler}
                      >
                        More Filters
                      </AppText>
                    </VStack>
                  </>
                )}
              </HStack>
              <HStack gap="23px" pt="30px">
                <AppText
                  fontSize="14px"
                  fontWeight={500}
                  lineHeight="21px"
                  color="#F7CC45"
                  onClick={onResetFilter}
                  cursor="pointer"
                >
                  Reset
                </AppText>
                <AppButton
                  variant="solid"
                  onClick={onApplyFilter}
                  w="87px"
                  h="35px"
                  fontSize="14px"
                  fontWeight={400}
                  borderRadius="100px"
                  color="#000"
                >
                  Apply
                </AppButton>
              </HStack>
            </HStack>
          )}
        </AnimatePresence>
      </VStack>
    </Skeleton>
  );
};

export default Filter;
