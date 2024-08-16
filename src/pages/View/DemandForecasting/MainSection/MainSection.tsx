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
  setAggregateOption,
  getAlertTypeRequest,
  updateTabType
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
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { KeyValueI } from 'types/responses/insightResponses';

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
  const isAggregated = dfViewState.aggregateOption.selectedAggregateOption === 'aggregate';

  const skuSelectorWidth = useCallback(() => {
    if (skuMaximized) return 'full';

    if (!leftMenuOpen) return 'calc(100vw/3)';
    else return 'calc(100vw/4)';
  }, [leftMenuOpen, skuMaximized]);

  const requestViewForecastChart = (currentStepIndex?: number) => {
    const graphNav = graphNavigator.currentStepIndex < 0 ? 0 : graphNavigator.currentStepIndex;
    dispatch(setSelectedSkuAction(currentStepIndex !== undefined ? currentStepIndex : graphNav));
    dispatch(
      demandForecastChartRequest({ chartType: dfViewState.aggregateOption.selectedAggregateOption })
    );

    if (!isAggregated) {
      dispatch(getAlertTypeRequest());
      dispatch(getPredictorsRequest());
    }
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

  useEffect(() => {
    const tabName = selectedTab === ForecastType.INDIVIDUAL ? 'sku' : 'aggregate';
    if (selectedTab === ForecastType.INDIVIDUAL && selectedSkuList.length > 0) {
      dispatch(getAlertTypeRequest());
      dispatch(getPredictorsRequest());
    }
    dispatch(
      setAggregateOption({
        type: '',
        item: tabName
      })
    );
  }, [selectedTab]);

  const onChangeAllHandler = (isSelected: boolean, id: number) => {
    graphNavigator.resetNavigator();
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
      } else {
        const idx = selectedSkuList.findIndex(
          (skuListItem) => skuListItem.anchorProdKey === _selectedSku?.anchorProdKey
        );
        graphNavigator.removeStep(idx);
        if (isAggregated) {
          graphNavigator.setCurrentStepIndex(selectedSkuList.length - 2);
          updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
          requestViewForecastChart(selectedSkuList.length - 2);
        } else {
          if (id === selectedSkuForChart?.anchorProdKey && selectedSkuList.length > 1) {
            updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
            requestViewForecastChart(idx === 0 ? 0 : idx - 1);
          } else {
            updateSelectedListAndSkuStates(isSelected, id, _selectedSku);
          }
        }
      }
    } catch (e) {
      console.log('Sku list update error ', e);
    }
  };

  const onSelectTabHandler = (index: number) => {
    setSelectedTab(index);
    dispatch(updateTabType(index));
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
                  content: (
                    <IndividualViewTab
                      skuMaximized={skuMaximized}
                      graphNavigator={graphNavigator}
                    />
                  )
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
