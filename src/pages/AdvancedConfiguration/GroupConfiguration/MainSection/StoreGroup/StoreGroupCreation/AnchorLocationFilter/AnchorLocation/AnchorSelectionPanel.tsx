import { Box, HStack, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import PanelHeader from '../FilterItemsSelectionDrawer/LeftPanel/PanelHeader';
import LeftPanel from '../FilterItemsSelectionDrawer/LeftPanel/LeftPanel';
import RightPanel from '../FilterItemsSelectionDrawer/RightPanel/RightPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getFilterDataRequest,
  groupConfigurationSliceSelector,
  updateGroupFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import { getSelectedRightSideItem } from '../FilterItemsSelectionDrawer/Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from '../FilterItemsSelectionDrawer/Helpers/leftPanelListUpdateHelper';
import { addOrRemoveItemHelper } from '../FilterItemsSelectionDrawer/Helpers/addOrRemoveItemHelper';
import { KeyValueI } from 'types/responses/insightResponses';
import { produce } from 'immer';
import AppText from 'components/AppText/AppText';
import { white } from 'theme/colors';
import { storeInLocal } from 'utils/localStorage';
import { INSTRUCTION_MESSAGES } from 'constants/messages';

interface SkuSelectionPanelProps {}

const AnchorSelectionPanel: FC<SkuSelectionPanelProps> = () => {
  const dispatch = useDispatch();
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<RightFilterItemContentI>();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const filterItemListData = groupFilter?.filterItemListData;
  const viewFilter = groupFilter.filterLocalScope.viewFilter;
  const rightPanelRetainDataList = groupFilter?.filterLocalScope.rightPanelRetainDataList;

  useEffect(() => {
    const _selectedRightSideItem = getSelectedRightSideItem(
      filterCode,
      filterType,
      groupFilter
    ) as RightFilterItemContentI;

    setSelectedRightSideItem(_selectedRightSideItem);
    if (!_selectedRightSideItem?.isSelectAll) {
      leftPanelListUpdateHelper(_selectedRightSideItem, groupFilter, dispatch);
    }
  }, [rightPanelRetainDataList, filterItemListData && filterItemListData.length, filterType]);

  useEffect(() => {
    storeInLocal('insightDrawerTitle', 'Anchor-locations');
    const _groupFilter = produce(
      groupConfigState.groupFilter,
      (draft: IGroupConfigurationSlice['groupFilter']) => {
        if (draft) {
          draft.filterLocalScope.beforeEditFilterOptionsLevel2 = rightPanelRetainDataList;
          draft.filterType = 'anchor';
          draft.filterCode = 2;
        }
      }
    );

    const filter = {
      filterType: 'anchor',
      filterCode: 2,
      pageNumber: 1,
      viewFilter
    };

    dispatch(updateGroupFilter(_groupFilter));
    dispatch(getFilterDataRequest(filter));
  }, []);

  const addOrRemoveItem = (status: boolean, item: KeyValueI) => {
    addOrRemoveItemHelper(filterCode, filterType, status, item, groupFilter, dispatch);
  };

  return (
    <VStack h="full" spacing="20px" w="full" justify={'center'}>
      <AppText w="full" textAlign={'center'} size={'body3'} fontWeight={'400'} color={white}>
        {INSTRUCTION_MESSAGES.STORE_ANCHOR_LOCATION_MESSAGE}
      </AppText>
      <HStack w="full" justify={'center'}>
        <PanelHeader
          selectedRightSideItem={selectedRightSideItem}
          viewFilter={viewFilter}
          width="634px"
          title="your Anchor-locations"
        />
      </HStack>
      <HStack h="full" w={'full'} spacing="15px" pt="11px" align="start">
        <Box flex={1} h={'calc(100vh - 200px)'}>
          <LeftPanel
            viewFilter={false}
            addOrRemoveItem={addOrRemoveItem}
            selectedRightSideItem={selectedRightSideItem}
          />
        </Box>
        <Box flex={1} h="calc(100vh - 200px)">
          <RightPanel
            selectedRightSideItem={selectedRightSideItem}
            addOrRemoveItem={addOrRemoveItem}
          />
        </Box>
      </HStack>
    </VStack>
  );
};

export default AnchorSelectionPanel;
