import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { FC, useEffect } from 'react';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import SkuSelectionFooter from './SkuSelectionFooter/SkuSelectionFooter';
import {
  IWhDFView,
  whDfViewSliceSelector,
  getDemandForecastDataRequest,
  skuSearchAction,
  resetViewForecastRightPanel,
  getDemandForecastSkuListRequest
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
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
import { produce } from 'immer';
import { removeAllSelectedItems } from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/Helpers/addOrRemoveItemHelper';

interface SkuSelectionPanelProps {
  maximized: boolean;
  onSkuListChange: (id: number) => void;
  onChangeAllHandler: (isSelected: boolean, id: number) => void;
  filterLabelTypes?: GroupLabelTypes;
}

const SkuSelectionPanel: FC<SkuSelectionPanelProps> = ({
  maximized,
  onSkuListChange,
  onChangeAllHandler,
  filterLabelTypes
}) => {
  const dispatch = useDispatch();
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const tableHeaders = dfViewState.skuListData?.headers as TableHeader[];
  const minimizedTableHeaders = dfViewState.skuListData?.headers as TableHeader[];
  const tableDataList = dfViewState.skuListData?.list;
  const maximizedTableDataList = dfViewState.skuListData?.list;
  const dataLoading = dfViewState.loading.skuDataLoading;
  const searchKey = dfViewState.dfViewLocalScope.skuSearchKey;
  const skuData = dfViewState.skuListData;
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterAppliedIndicator = groupConfigState.groupFilter.filterAppliedIndicator;
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;
  const shouldReloadData = dfViewState.dfViewLocalScope.shouldReloadData;
  const groupFilter = groupConfigState.groupFilter;

  useEffect(() => {
    if (skuData === null && selectedGroupKey) {
      dispatch(getDemandForecastSkuListRequest({ searchKey }));
    }
  }, [selectedGroupKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(skuSearchAction(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(resetViewForecastRightPanel());
      if (!maximized) {
        dispatch(getDemandForecastSkuListRequest({ searchKey }));
      } else {
        dispatch(getDemandForecastDataRequest({ searchKey }));
      }
    }
    removeAllSelectedItems(1, 'sku', groupFilter, dispatch);
  };

  const renderSimpleGrid = () => {
    if (!tableHeaders || !minimizedTableHeaders) return null;

    let rowData: { id?: any; isSelected?: boolean; row: any[] }[] = [];

    if (maximized) {
      rowData =
        tableDataList?.map((item) => ({
          id: item.anchorProdKey,
          isSelected: item.isSelected,
          row: (tableHeaders.length && tableHeaders.map((header) => item[header.key])) || []
        })) || [];
    } else {
      rowData =
        maximizedTableDataList?.map((item) => ({
          id: item.anchorProdKey,
          isSelected: item.isSelected,
          row: minimizedTableHeaders?.map((header) => item[header.key]) || []
        })) || [];
    }

    const isSelectedAll = tableDataList?.every((data) => data.isSelected);
    const freezeCols = maximized ? [0, 1, 2, 3] : [];
    return (
      <AppSimpleGrid
        headers={maximized ? tableHeaders : minimizedTableHeaders}
        rows={rowData}
        maxW="100%"
        maxH="full"
        isEnableAction={true}
        onChangeHandler={onSkuListChange}
        isSelectedAll={isSelectedAll}
        onChangeAllHandler={onChangeAllHandler}
        freezedColumns={freezeCols}
      />
    );
  };

  const onFilterClick = () => {
    dispatch(
      getLabelsRequest({
        labelTypes: filterLabelTypes || ['location', 'product', 'anchor', 'store', 'sku']
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
    dispatch(getFilterCountRequest({ whFlag: 1 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  useEffect(() => {
    if (shouldReloadData) {
      if (dfViewState.selectedSkuList.length === 0) {
        dispatch(resetViewForecastRightPanel());
      }
    }
  }, [dfViewState.selectedSkuList.length]);

  useEffect(() => {
    if (shouldReloadData) {
      dispatch(resetViewForecastRightPanel());
    }
  }, [sharedGroupState.selectedGroupKey]);

  useEffect(() => {
    if (shouldReloadData) {
      dispatch(resetViewForecastRightPanel());
      if (maximized) {
        dispatch(getDemandForecastDataRequest({ searchKey }));
      } else {
        dispatch(getDemandForecastSkuListRequest({ searchKey }));
      }
    }
  }, [filterAppliedIndicator, shouldReloadData]);

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
            width={maximized ? '306px' : 'full'}
            height="36px"
            onKeyDown={handleSearchFieldPress}
          />
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
        </HStack>
        <Box w="full" h={'calc(100vh - 230px)'}>
          {renderSimpleGrid()}
        </Box>
        <Box w="full" h="18px">
          <SkuSelectionFooter totalItems={totalSkuCount!} currentPage={1} />
        </Box>
      </VStack>
    </Skeleton>
  );
};

export default SkuSelectionPanel;
