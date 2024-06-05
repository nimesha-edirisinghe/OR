import { Box, Checkbox, HStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  getFilterDataRequest,
  insightSliceSelector
} from 'state/pages/insights/insightState';
import { RightFilterItemContentI } from 'types/requests/insightRequest';
import { toggleSelectAllItems } from '../Helpers/selectAllToggleHelper';
import { debounce } from 'lodash';
import { updateSelectedItemSearchKey } from '../Helpers/searchHelper';

interface Props {
  selectedRightSideItem: RightFilterItemContentI | undefined;
  setSearchKey: (value: string) => void;
  searchKey: string;
}

const PanelHeader: FC<Props> = ({ selectedRightSideItem, setSearchKey, searchKey }) => {
  const dispatch = useDispatch();
  const insightState: IInsight = useSelector(insightSliceSelector);
  const dashboardFilter = insightState.dashboardFilter;
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
    <HStack spacing="92px" h="25px">
      <Checkbox
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
          toggleSelectAllItems(e.target.checked, filterType, dashboardFilter, dispatch)
        }
        isDisabled={!!selectedRightSideItem?.selectedItems.length}
      />
      <AppInput
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
      />
    </HStack>
  );
};

export default PanelHeader;
