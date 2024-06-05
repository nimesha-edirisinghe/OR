import { FC, useCallback, useMemo, useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import { ALERT_VIEW_PAGE_SIZE } from 'utils/constants';
import {
  IAlert,
  alertSliceSelector,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import ViewAlertPaginationSummary from '../../ViewAlertFooterSection/ViewAlertPaginationSummary';

interface Props {}

const ViewAllFooter: FC<Props> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const totalAlertCount = alertState.alertDataList?.totalCount || 0;
  const totalPages = Math.ceil(totalAlertCount / ALERT_VIEW_PAGE_SIZE);
  const currentPageNumber = alertState.alertLocalScope?.pageNumber;

  const dispatch = useDispatch();

  const sendRequest = useCallback(() => {
    dispatch(
      getAlertsRequest({
        alertOnly: 0
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
        pageSize={ALERT_VIEW_PAGE_SIZE}
      />
      {totalAlertCount > 0 && (
        <AppPagination
          currentPage={currentPageNumber}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
        />
      )}
    </HStack>
  );
};

export default ViewAllFooter;
