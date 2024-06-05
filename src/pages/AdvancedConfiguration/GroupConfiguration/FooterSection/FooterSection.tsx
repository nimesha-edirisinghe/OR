import { HStack } from '@chakra-ui/react';
import { FC, useCallback, useMemo, useState } from 'react';
import PaginationSummary from './PaginationSummary';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { STORE_GROUP_PAGE_SIZE } from 'utils/constants';
import {
  IGroupConfigurationSlice,
  getGroupListRequest,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { GroupTypesEnum } from 'utils/enum';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';

interface FooterSectionProps {}

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const totalCount = groupConfigurationState.storeGroup?.totalCount;
  const groupList = groupConfigurationState.storeGroup?.list;
  const totalPages = (totalCount && Math.ceil(totalCount / STORE_GROUP_PAGE_SIZE)) || 0;

  const sendRequest = useCallback((newPage: number) => {
    dispatch(getGroupListRequest({ groupType: GroupTypesEnum.STORE, pageNumber: newPage }));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handlePageChange = (newPage: number) => {
    setCurrentPageNumber(newPage);
    debouncedSendRequest(newPage);
  };
  return (
    <HStack h="25px" w={'full'} px="5px" py="5px" bottom="2px" justifyContent="end" mt="7px">
      <PaginationSummary currentPage={currentPageNumber} totalItems={totalCount || 0} />
      {groupList && groupList?.length > 0 && (
        <AppPagination
          currentPage={currentPageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </HStack>
  );
};

export default FooterSection;
