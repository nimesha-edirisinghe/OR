import { HStack } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  viewFilter: boolean;
  title?: string;
}

const PanelHeader: FC<Props> = ({
  selectedRightSideItem,
  setSearchKey,
  viewFilter,
  searchKey,
  title
}) => {
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterType = groupFilter?.filterType!;
  const filterCode = groupFilter?.filterCode!;
  const dispatch = useDispatch();

  const sendRequest = useCallback((searchKey: string) => {
    updateSelectedItemSearchKey(searchKey, filterType, filterCode, dispatch);
    dispatch(
      getFilterDataRequest({ filterType, filterCode, pageNumber: 1, viewFilter, searchKey })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);
    debouncedSendRequest(value);
  };

  return (
    <HStack spacing="5px" h="25px">
      <AppInputGroup
        placeholder={'Search ' + title + ' here'}
        value={searchKey || ''}
        onChange={handleInputChange}
        fontSize="14px"
        variant="primary"
        inputSize="large"
        isDisabled={!!selectedRightSideItem?.isSelectAll}
      />
    </HStack>
  );
};

export default PanelHeader;
