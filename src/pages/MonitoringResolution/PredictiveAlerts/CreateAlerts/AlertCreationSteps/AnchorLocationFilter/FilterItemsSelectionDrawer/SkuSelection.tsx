import { Box, Center, HStack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import PanelHeader from './LeftPanel/PanelHeader';
import { KeyValueI } from 'types/responses/insightResponses';
import { addOrRemoveItemHelper } from './Helpers/addOrRemoveItemHelper';
import { getSelectedRightSideItem } from './Helpers/rightPanelUpdateHelper';
import { leftPanelListUpdateHelper } from './Helpers/leftPanelListUpdateHelper';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector,
  getFilterDataRequest
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import AppText from 'components/AppText/AppText';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { updateSelectedItemSearchKey } from './Helpers/searchHelper';
import { neutral_200, neutral_500 } from 'theme/colors';

interface Props {}

const SkuSelection: FC<Props> = () => {
  const dispatch = useDispatch();
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const [selectedRightSideItem, setSelectedRightSideItem] = useState<RightFilterItemContentI>();
  const [searchKey, setSearchKey] = useState<string>('');
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const filterItemListData = groupFilter?.filterItemListData;
  const rightPanelRetainDataList = groupFilter?.filterLocalScope.rightPanelRetainDataList;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      updateSelectedItemSearchKey(searchKey, filterType, filterCode, dispatch);
      dispatch(
        getFilterDataRequest({
          filterType,
          filterCode,
          pageNumber: 1,
          viewFilter: false,
          searchKey
        })
      );
    }
  };

  // useEffect(() => {
  //   setSearchKey(selectedRightSideItem?.search!);
  // }, [selectedRightSideItem?.search, filterItemListData]);

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

  const addOrRemoveItem = (status: boolean, item: KeyValueI) => {
    addOrRemoveItemHelper(filterCode, filterType, status, item, groupFilter, dispatch);
  };

  return (
    <>
      <VStack h="full" w="full" spacing="20px">
        <HStack w="634px">
          <AppText size="body3" textAlign="center" color={neutral_200}>
            Here you can view the filtered set of SKU locations based on you previous filtration.
            You can select all or some of these locations to create alerts.
          </AppText>
        </HStack>
        <HStack w="634px">
          <AppInputGroup
            placeholder="Search your SKU locations here"
            value={searchKey || ''}
            onChange={handleInputChange}
            fontSize="14px"
            variant="primary"
            inputSize="large"
            onKeyDown={handleSearchFieldPress}
          />
        </HStack>
        {/* <Box flex={1} h="40px" justifyContent="start" pl="17px">
          <PanelHeader
            selectedRightSideItem={selectedRightSideItem}
            setSearchKey={setSearchKey}
            searchKey={searchKey}
          />
        </Box> */}
        <HStack h="full" w="920px" spacing="15px" align="start">
          <Box flex={1} h="calc(100vh - 200px)">
            <LeftPanel
              addOrRemoveItem={addOrRemoveItem}
              selectedRightSideItem={selectedRightSideItem}
            />
          </Box>
          <Box flex={1} h="calc(100vh - 200px)">
            <RightPanel
              selectedRightSideItem={selectedRightSideItem}
              addOrRemoveItem={addOrRemoveItem}
              defaultMessage="Selected SKU locations will be displayed here"
            />
          </Box>
        </HStack>
      </VStack>
    </>
  );
};

export default SkuSelection;
