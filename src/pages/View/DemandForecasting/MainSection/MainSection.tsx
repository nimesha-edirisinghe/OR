import { FC, useCallback, useEffect, useState } from 'react';
import { Box, HStack, usePrevious, VStack } from '@chakra-ui/react';
import SkuSelectionPanel from './SkuSelectionPanel/SkuSelectionPanel';
import {
  addOrRemoveFromSelectedSkuList,
  demandForecastChartRequest,
  dfViewSliceSelector,
  getPredictorsRequest,
  updateSkuListSelectedStatus,
  setSelectedSkuAction,
  setAggregateOption
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import useNavigator from 'hooks/useNavigator';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import AppTab from 'components/newTheme/AppTab/AppTab';
import IndividualViewTab from './Tabs/IndividualViewTab/IndividualViewTab';
import AggregateViewTab from './Tabs/AggregateViewTab/AggregateViewTab';
import ForecastingHeader from '../ForecastingHeader/ForecastingHeader';
import { ForecastType } from 'utils/enum';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { addOrRemoveItemHelper } from 'pages/MonitoringResolution/PredictiveAlerts/CreateAlerts/AlertCreationSteps/AnchorLocationFilter/FilterItemsSelectionDrawer/Helpers/addOrRemoveItemHelper';
import { KeyValueI } from 'types/responses/insightResponses';
import { produce } from 'immer';

interface MainSectionProps {
  skuMaximized: boolean;
  filterLabelTypes?: GroupLabelTypes;
  maximizedHandler: () => void;
}

const MainSection: FC<MainSectionProps> = ({
  skuMaximized,
  filterLabelTypes,
  maximizedHandler
}) => {
  const dispatch = useDispatch();
  const dfViewState = useSelector(dfViewSliceSelector);
  const leftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const tableDataList = dfViewState.skuListData?.list;
  const selectedSkuList = dfViewState.selectedSkuList;
  const selectedSkuForChart = dfViewState.selectedSku;
  const graphNavigator = useNavigator(selectedSkuList);
  const previousSelectedSkuList = usePrevious(selectedSkuList);
  const isSelectedAll = dfViewState.dfViewLocalScope.globalSkuSelected;
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;

  const skuSelectorWidth = useCallback(() => {
    if (skuMaximized) return 'full';

    if (!leftMenuOpen) return 'calc(100vw/3)';
    else return 'calc(100vw/4)';
  }, [leftMenuOpen, skuMaximized]);

  const requestViewForecastChart = (currentStepIndex?: number) => {
    dispatch(
      setSelectedSkuAction(
        currentStepIndex !== undefined ? currentStepIndex : graphNavigator.currentStepIndex
      )
    );
    dispatch(demandForecastChartRequest({ chartType: dfViewState.selectedChartType }));
    dispatch(getPredictorsRequest());
  };

  useEffect(() => {
    if (
      selectedSkuList &&
      previousSelectedSkuList &&
      previousSelectedSkuList.length &&
      selectedSkuList.length === previousSelectedSkuList.length
    ) {
      requestViewForecastChart();
    }
  }, [graphNavigator.currentStepIndex]);

  const onChangeAllHandler = (isSelected: boolean, id: number) => {
    dispatch(
      updateSkuListSelectedStatus({
        id: 1,
        type: 'all'
      })
    );
    dispatch(
      addOrRemoveFromSelectedSkuList({
        isSelectedAll: isSelected,
        selectedType: 'all'
      })
    );
    !isSelectedAll && requestViewForecastChart();
    updateFilter();
  };

  const updateFilter = () => {
    const skuProdKeys: KeyValueI[] =
      tableDataList?.map((item) => {
        return { key: item.anchorProdKey.toString(), value: '' };
      }) || [];

    const _groupFilter = produce(groupFilter, (draft) => {
      const filteredItem = draft.filterLocalScope.rightPanelRetainDataList.find(
        (item) => item.code === 1 && item.type === 'sku'
      );
      if (filteredItem) {
        filteredItem.selectedItems = isSelectedAll ? [] : skuProdKeys;
      } else {
        const ft = {
          code: 1,
          isSelectAll: false,
          search: null,
          selectedItems: skuProdKeys,
          outOfCount: 0,
          type: 'sku'
        };
        draft.filterLocalScope.rightPanelRetainDataList.push(ft);
      }
    });
    dispatch(updateGroupFilter(_groupFilter));
  };

  const updateSelectedListAndSkuStates = (
    isSelected: boolean,
    anchorProdKey: number,
    _selectedSku: DemandForecastSkuListItem
  ) => {
    dispatch(updateSkuListSelectedStatus({ id: anchorProdKey }));
    dispatch(addOrRemoveFromSelectedSkuList({ data: _selectedSku, selectedType: '' }));
  };

  const onSkuListChange = (id: number) => {
    try {
      const _selectedSku = tableDataList?.find((skuObj) => skuObj.anchorProdKey === id)!;
      const isSelected = _selectedSku.isSelected;
      const item: KeyValueI = {
        key: id.toString(),
        value: ''
      };

      if (!isSelected) {
        updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
        graphNavigator.setCurrentStepIndex(selectedSkuList.length);
        requestViewForecastChart(selectedSkuList.length);
        addOrRemoveItemHelper(1, 'sku', true, item, groupFilter, dispatch);
      } else {
        const idx = selectedSkuList.findIndex(
          (skuListItem) => skuListItem.anchorProdKey === _selectedSku?.anchorProdKey
        );
        graphNavigator.removeStep(idx);
        if (id === selectedSkuForChart?.anchorProdKey && selectedSkuList.length > 1) {
          updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
          requestViewForecastChart(idx === 0 ? 0 : idx - 1);
        } else {
          updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
        }
        addOrRemoveItemHelper(1, 'sku', false, item, groupFilter, dispatch);
      }
    } catch (e) {
      console.log('Sku list update error ', e);
    }
  };

  const onSelectTabHandler = (index: number) => {
    const tabName = index === ForecastType.INDIVIDUAL ? 'sku' : 'aggregate';
    setSelectedTab(index);
    dispatch(
      setAggregateOption({
        type: '',
        item: tabName
      })
    );
  };

  return (
    <HStack w="full" spacing={'20px'}>
      <Box w={skuSelectorWidth()} h="full" transition="all 0.1s ease-in">
        <SkuSelectionPanel
          maximized={skuMaximized}
          onSkuListChange={onSkuListChange}
          onChangeAllHandler={onChangeAllHandler}
          filterLabelTypes={filterLabelTypes}
        />
      </Box>
      {!skuMaximized && (
        <VStack w="full" h="calc(100vh - 115px)" overflow={'hidden'}>
          <HStack h="36px" w="full">
            <ForecastingHeader maximizedHandler={maximizedHandler} skuMaximized={skuMaximized} />
          </HStack>
          <Box h="calc(100vh - 165px)" w="full" alignItems={'start'}>
            <AppTab
              tabs={[
                {
                  label: 'Individual',
                  content: <IndividualViewTab skuMaximized={skuMaximized} />
                },
                { label: 'Aggregate', content: <AggregateViewTab skuMaximized={skuMaximized} /> }
              ]}
              selectedTab={selectedTab}
              onSelectTab={onSelectTabHandler}
              variant="primary"
            />
          </Box>
        </VStack>
      )}
    </HStack>
  );
};

export default MainSection;
