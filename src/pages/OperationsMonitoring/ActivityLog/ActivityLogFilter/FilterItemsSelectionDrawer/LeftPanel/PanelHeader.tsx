import { HStack } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { FilterItemContentI } from 'types/activityLog';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getFilterDataRequest
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { updateSelectedItemSearchKey } from '../Helpers/searchHelper';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';

interface Props {
  selectedRightSideItem: FilterItemContentI | undefined;
  setSearchKey: (value: string) => void;
  searchKey: string;
  title: string;
}

const PanelHeader: FC<Props> = ({ selectedRightSideItem, setSearchKey, searchKey, title }) => {
  const dispatch = useDispatch();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dashboardFilter = activityLogState.dashboardFilter;
  const filterType = dashboardFilter.filterType;

  const sendRequest = useCallback((searchKey: string) => {
    updateSelectedItemSearchKey(searchKey, filterType, dispatch);
    dispatch(getFilterDataRequest({ filterType, pageNumber: 1, searchKey }));
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
