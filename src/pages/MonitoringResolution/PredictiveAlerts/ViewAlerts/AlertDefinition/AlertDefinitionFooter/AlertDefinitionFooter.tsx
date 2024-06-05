import { FC, useCallback, useMemo, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVITY_LOG_PAGE_SIZE, ALERT_VIEW_PAGE_SIZE } from 'utils/constants';
import { debounce } from 'lodash';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import ViewAlertPaginationSummary from '../../ViewAlertFooterSection/ViewAlertPaginationSummary';

interface AlertDefinitionFooterProps {}

const AlertDefinitionFooter: FC<AlertDefinitionFooterProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const currentPageNumber = alertState.alertLocalScope?.pageNumber;
  const totalAlertCount = alertState.alertDataList?.totalCount || 0;
  const totalPages = Math.ceil(totalAlertCount / ALERT_VIEW_PAGE_SIZE);

  const dispatch = useDispatch();

  const sendRequest = useCallback(() => {
    dispatch(
      getAlertsRequest({
        alertOnly: 1
      })
    );
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setAlertDefinitionPaginationPageNo(pageNumber));
    debouncedSendRequest();
  };

  if (totalAlertCount === 0) return null;

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
        totalItems={totalAlertCount}
        pageSize={ACTIVITY_LOG_PAGE_SIZE}
      />
      <AppPagination
        currentPage={currentPageNumber}
        totalPages={totalPages}
        onPageChange={onPageChangeHandler}
      />
    </HStack>
  );
};

export default AlertDefinitionFooter;
