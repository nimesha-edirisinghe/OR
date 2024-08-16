import { FC, useCallback, useMemo } from 'react';
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
import { AlertTypeEnum } from 'state/pages/monitoringAndResolution/Alert/sagaHelpers/sgH_alert';
import {
  IRPLView,
  rplGetUploadHistoryDataRequest,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import {
  IAlert,
  alertSliceSelector,
  setUploadHistoryPageNo
} from 'state/pages/monitoringAndResolution/Alert/alertState';

interface Props {}

const HistoryTableFooter: FC<Props> = () => {
  const dispatch = useDispatch();
  const dfViewState = useSelector(dfViewSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const currentPageNumber = alertState.alertLocalScope.uploadHistoryPageNumber;
  const selectedAlertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;

  const forecastTotalUploadHistoryCount = dfViewState.uploadedHistory?.totalCount || 0;
  const forecastTotalPages = Math.ceil(
    forecastTotalUploadHistoryCount / BULK_EDIT_HISTORY_TABLE_PAGE_SIZE
  );

  const rplTotalUploadHistoryCount = rplViewState.rplUploadedHistory?.totalCount || 0;
  const rplTotalPages = Math.ceil(rplTotalUploadHistoryCount / BULK_EDIT_HISTORY_TABLE_PAGE_SIZE);
  const isForecastAlert =
    selectedAlertType === AlertTypeEnum.DE_GROWTH || selectedAlertType === AlertTypeEnum.GROWTH;

  const totalUploadHistoryCount = isForecastAlert
    ? forecastTotalUploadHistoryCount
    : rplTotalUploadHistoryCount;
  const totalPages = isForecastAlert ? forecastTotalPages : rplTotalPages;

  const sendRequest = useCallback((pageNumber: number) => {
    const action = isForecastAlert
      ? getUploadHistoryDataRequest({ pageNumber })
      : rplGetUploadHistoryDataRequest({ pageNumber });
    dispatch(action);
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setUploadHistoryPageNo(pageNumber));
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
