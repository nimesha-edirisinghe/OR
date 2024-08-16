import { HStack } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';
import PaginationSummary from './PaginationSummary';
import { useDispatch, useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getActivityLogListRequest,
  setCurrentPageNumber
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { debounce } from 'lodash';
import { ACTIVITY_LOG_PAGE_SIZE } from 'utils/constants';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';

interface FooterSectionProps {}

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const currentPageNumber = activityLogState.localScope.currentPageNumber;
  const activityLogTableData = activityLogState.activityLogListData;
  const totalPages = Math.ceil(activityLogTableData?.totalCount / ACTIVITY_LOG_PAGE_SIZE);

  const sendRequest = useCallback((newPage: number) => {
    dispatch(
      getActivityLogListRequest({
        pageNumber: newPage
      })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPageNumber(newPage));
    debouncedSendRequest(newPage);
  };
  return (
    <HStack w={'full'} justifyContent="space-between">
      <PaginationSummary
        currentPage={currentPageNumber}
        totalItems={activityLogTableData?.totalCount || 0}
      />
      {activityLogTableData && activityLogTableData?.totalCount > 0 && (
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
