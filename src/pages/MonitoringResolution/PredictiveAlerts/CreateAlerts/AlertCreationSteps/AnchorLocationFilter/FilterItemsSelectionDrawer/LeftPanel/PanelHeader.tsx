import { Checkbox, HStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectAllItems } from '../Helpers/selectAllToggleHelper';
import { debounce } from 'lodash';
import { updateSelectedItemSearchKey } from '../Helpers/searchHelper';
import {
  IGroupConfigurationSlice,
  getFilterDataRequest,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { RightFilterItemContentI } from 'types/groupConfig';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';

interface Props {
  selectedRightSideItem: RightFilterItemContentI | undefined;
  setSearchKey: (value: string) => void;
  searchKey: string;
  title?: string;
  whFlag?: 0 | 1 | 2;
}

const PanelHeader: FC<Props> = ({
  selectedRightSideItem,
  setSearchKey,
  searchKey,
  title,
  whFlag = 0
}) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const dispatch = useDispatch();

  const sendRequest = useCallback((searchKey: string) => {
    updateSelectedItemSearchKey(searchKey, filterType, filterCode, dispatch);
    dispatch(
      getFilterDataRequest({
        filterType,
        filterCode,
        pageNumber: 1,
        viewFilter: false,
        searchKey,
        whFlag
      })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 3000);
  }, [sendRequest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    // debouncedSendRequest(value);
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
          searchKey,
          whFlag
        })
      );
    }
  };

  return (
    <HStack w="full">
      {/* <Checkbox
        colorScheme="#8C8C8C"
        size="md"
        border="none"
        borderColor="#555"
        variant="custom"
        _checked={{
          outline: 'none'
        }}
        isChecked={selectedRightSideItem?.isSelectAll}
        onChange={(e: any) =>
          toggleSelectAllItems(e.target.checked, filterType, filterCode, groupFilter, dispatch)
        }
        isDisabled={!!selectedRightSideItem?.selectedItems.length}
      /> */}
      {/* <AppInput
        w="350px"
        h="25px"
        fontSize="12px"
        color="left-menu-icon-color"
        pl="6px"
        onChange={handleInputChange}
        value={searchKey || ''}
        transition="all 0.3s"
        bg="prompt-bg-color"
        isDisabled={!!selectedRightSideItem?.isSelectAll}
      /> */}
      <AppInputGroup
        placeholder={'Search ' + title + ' here'}
        value={searchKey || ''}
        onChange={handleInputChange}
        fontSize="14px"
        variant="primary"
        inputSize="large"
        isDisabled={!!selectedRightSideItem?.isSelectAll}
        onKeyDown={handleSearchFieldPress}
      />
    </HStack>
  );
};

export default PanelHeader;
