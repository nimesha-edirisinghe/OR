import { HStack, VStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  viewFilter: boolean;
  title?: string;
  width: string;
}

const PanelHeader: FC<Props> = ({ selectedRightSideItem, viewFilter, title, width = 'full' }) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const [searchKey, setSearchKey] = useState<string>('');
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    (searchKey: string) => {
      updateSelectedItemSearchKey(searchKey, filterType, filterCode, dispatch);
      dispatch(
        getFilterDataRequest({ filterType, filterCode, pageNumber: 1, viewFilter, searchKey })
      );
    },
    [filterType, filterCode]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      sendRequest(searchKey);
    }
  };

  return (
    <VStack w={width} spacing="20px">
      <HStack w="full">
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
    </VStack>
  );
};

export default PanelHeader;
