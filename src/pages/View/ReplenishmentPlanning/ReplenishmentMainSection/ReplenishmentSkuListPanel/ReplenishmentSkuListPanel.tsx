import { Box, HStack, Skeleton, Tr, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { FC, useEffect } from 'react';
import { blue_500, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { IDFView, dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import {
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  IGroupConfigurationSlice,
  toggleDrawerFilter,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import {
  groupConfigSliceSelector,
  IGroupConfig
} from 'state/pages/shared/groupConfig/groupConfigState';
import { TableHeader } from 'types/responses/viewResponses';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import SkuSelectionFooter from 'pages/View/DemandForecasting/MainSection/SkuSelectionPanel/SkuSelectionFooter/SkuSelectionFooter';
import {
  IRPLView,
  getReplenishmentSkuDataRequest,
  resetViewRplPlanRightPanel,
  rplSkuSearchAction,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { produce } from 'immer';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface Props {
  onSkuListChange: (id: number) => void;
  onChangeAllHandler: (isSelected: boolean, id: number) => void;
  filterLabelTypes?: GroupLabelTypes;
}

const ReplenishmentSkuListPanel: FC<Props> = ({
  onSkuListChange,
  onChangeAllHandler,
  filterLabelTypes
}) => {
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);

  const searchKey = rplViewState.rplViewLocalScope.rplSkuSearchKey;
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterAppliedIndicator = groupConfigState.groupFilter.filterAppliedIndicator;
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;

  const rplSkuData = rplViewState.rplSkuDataList;
  const dataLoading = rplViewState.loading.data;
  const totalRplSkuCount = rplViewState.rplSkuDataList?.totalCount;

  const tableHeaders = rplViewState.rplSkuDataList?.headers as TableHeader[];
  const tableDataList = rplViewState.rplSkuDataList?.list;
  const isLoadData = rplViewState.isLoadData;

  useEffect(() => {
    if (isLoadData) {
      if (rplSkuData === null && selectedGroupKey) {
        dispatch(getReplenishmentSkuDataRequest({}));
      } else {
        dispatch(resetViewRplPlanRightPanel());
        dispatch(getReplenishmentSkuDataRequest({}));
      }
    }
  }, [selectedGroupKey, filterAppliedIndicator, isLoadData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(rplSkuSearchAction(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(resetViewRplPlanRightPanel());
      // if (!maximized) {
      dispatch(
        getReplenishmentSkuDataRequest({
          searchKey
        })
      );
    }
  };

  const renderSimpleGrid = () => {
    if (!tableHeaders) return null;

    let rowData: { id?: any; isSelected?: boolean; row: any[] }[] = [];

    rowData =
      tableDataList?.map((item) => ({
        id: item.anchorProdKey,
        isSelected: item.isSelected,
        row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
      })) || [];

    const isSelectedAll = tableDataList?.every((data) => data.isSelected);
    return (
      <AppSimpleGrid
        headers={tableHeaders}
        rows={rowData}
        maxW="100%"
        maxH="full"
        isEnableAction={true}
        onChangeHandler={onSkuListChange}
        isSelectedAll={isSelectedAll}
        onChangeAllHandler={onChangeAllHandler}
        isLastColExpandable
      />
    );
  };

  const onFilterClick = () => {
    dispatch(
      getLabelsRequest({
        labelTypes: filterLabelTypes || [
          'location',
          'product',
          'anchor',
          'predictor',
          'store',
          'vendor',
          'sku'
        ]
      })
    );
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.beforeEditFilterOptionsLevel1 =
            draft.filterLocalScope.rightPanelRetainDataList;
        }
      }
    );
    dispatch(updateGroupFilter(_groupFilter));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  useEffect(() => {
    if (rplViewState.rplSelectedSkuList.length === 0) {
      dispatch(resetViewRplPlanRightPanel());
    }
  }, [rplViewState.rplSelectedSkuList.length]);

  // useEffect(() => {
  //   dispatch(resetViewRplPlanRightPanel());
  // }, [sharedGroupState.selectedGroupKey]);

  return (
    <Skeleton
      w="full"
      height="full"
      borderRadius="10px"
      isLoaded={!dataLoading}
      fadeDuration={1}
      speed={1}
    >
      <VStack w="full" h="full" borderRadius="8px" bg={ocean_blue_600} p="16px" spacing="16px">
        <HStack w="full" h="36px" justify="space-between">
          <AppInputGroup
            placeholder="Search"
            value={searchKey}
            onChange={handleInputChange}
            fontSize="14px"
            variant="primary"
            inputSize="large"
            width="full"
            height="36px"
            onKeyDown={handleSearchFieldPress}
          />
          <AppTooltip label={'Filter'} noOfLines={1} placement="bottom-start">
            <HStack spacing="0px">
              <AppIconButton
                aria-label="filter"
                icon={<AppIcon transition="transform 0.25s ease" name="filter" fill={blue_500} />}
                variant="secondary"
                size="iconMedium"
                onClick={() => onFilterClick()}
                bg={ocean_blue_600}
              />
            </HStack>
          </AppTooltip>
        </HStack>
        <Box w="full" h={'calc(100vh - 235px)'}>
          {renderSimpleGrid()}
        </Box>
        <Box w="full" h="18px">
          <SkuSelectionFooter
            totalItems={totalRplSkuCount!}
            currentPage={1}
            footerLabel="SKU-locations"
          />
        </Box>
      </VStack>
    </Skeleton>
  );
};

export default ReplenishmentSkuListPanel;
