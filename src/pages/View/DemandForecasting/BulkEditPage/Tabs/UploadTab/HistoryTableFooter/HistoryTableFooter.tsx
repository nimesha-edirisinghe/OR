import { FC, useCallback, useMemo, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import { BULK_EDIT_HISTORY_TABLE_PAGE_SIZE } from 'utils/constants';
import ViewAlertPaginationSummary from 'pages/MonitoringResolution/PredictiveAlerts/ViewAlerts/ViewAlertFooterSection/ViewAlertPaginationSummary';
import { debounce } from 'lodash';
import {
  dfViewSliceSelector,
  getUploadHistoryDataRequest
} from 'state/pages/view/demandForecastView/dfViewPageState';

interface Props {}

const HistoryTableFooter: FC<Props> = () => {
  const dispatch = useDispatch();
  const dfViewState = useSelector(dfViewSliceSelector);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const totalUploadHistoryCount = dfViewState.uploadedHistory?.totalCount || 0;
  const totalPages = Math.ceil(totalUploadHistoryCount / BULK_EDIT_HISTORY_TABLE_PAGE_SIZE);

  const sendRequest = useCallback((pageNumber: number) => {
    dispatch(
      getUploadHistoryDataRequest({
        pageNumber
      })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
    debouncedSendRequest(pageNumber);
  };
  return (
    <HStack
      w="full"
      h="25px"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      spacing="12px"
      justify="space-between"
    >
      <ViewAlertPaginationSummary
        currentPage={currentPageNumber}
        totalItems={totalUploadHistoryCount}
        pageSize={BULK_EDIT_HISTORY_TABLE_PAGE_SIZE}
      />
      {totalUploadHistoryCount > 0 && (
        <AppPagination
          currentPage={currentPageNumber}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
        />
      )}
    </HStack>
  );
};

export default HistoryTableFooter;
