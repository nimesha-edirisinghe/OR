import { Box, HStack, Skeleton, Tr, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { FC, useEffect } from 'react';
import { blue_500, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
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
  IRPLWhView,
  getReplenishmentWHSkuDataRequest,
  resetViewWhRplPlanRightPanel,
  rplWHViewSliceSelector,
  whRplSkuSearchAction
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { produce } from 'immer';

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
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);

  const searchKey = rplWhViewState.rplWhViewLocalScope.rplWhSkuSearchKey;
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const filterAppliedIndicator = groupConfigState.groupFilter.filterAppliedIndicator;
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const selectedGroupKey = sharedGroupState.selectedGroupKey;

  const rplSkuData = rplWhViewState.rplWhSkuDataList;
  const dataLoading = rplWhViewState.loading.data;
  const totalRplSkuCount = rplWhViewState.rplWhSkuDataList?.totalCount;

  const tableHeaders = rplWhViewState.rplWhSkuDataList?.headers as TableHeader[];
  const tableDataList = rplWhViewState.rplWhSkuDataList?.list;
  const isLoadWhData = rplWhViewState.isLoadWhData;

  useEffect(() => {
    if (isLoadWhData && rplSkuData === null && selectedGroupKey) {
      dispatch(getReplenishmentWHSkuDataRequest({}));
    }
  }, [selectedGroupKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(whRplSkuSearchAction(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(resetViewWhRplPlanRightPanel());
      dispatch(
        getReplenishmentWHSkuDataRequest({
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
    dispatch(getFilterCountRequest({ whFlag: 1 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  useEffect(() => {
    if (rplWhViewState.rplWhSelectedSkuList.length === 0) {
      dispatch(resetViewWhRplPlanRightPanel());
    }
  }, [rplWhViewState.rplWhSelectedSkuList.length]);

  useEffect(() => {
    if (isLoadWhData) {
      dispatch(resetViewWhRplPlanRightPanel());
      dispatch(getReplenishmentWHSkuDataRequest({ }));
    }
  }, [filterAppliedIndicator, isLoadWhData]);

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
        <Box w="full" h={'calc(100vh - 235px)'}>
          {renderSimpleGrid()}
        </Box>
        <Box w="full" h="18px">
          <SkuSelectionFooter totalItems={totalRplSkuCount!} currentPage={1} />
        </Box>
      </VStack>
    </Skeleton>
  );
};

export default ReplenishmentSkuListPanel;
