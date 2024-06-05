import { HStack } from '@chakra-ui/react';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import { FC, useCallback, useMemo } from 'react';
import FooterSummary from './FooterSummary';
import { useDispatch, useSelector } from 'react-redux';
import {
  IOrderParameter,
  getRplParameterSummaryRequest,
  orderParameterSliceSelector,
  setOrderParameterCurrentPageNo
} from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';
import { debounce } from 'lodash';
import { ORDER_PARAMETER_TABLE_PAGE_SIZE } from 'utils/constants';

interface Props {}

const FooterSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const orderParameterState: IOrderParameter = useSelector(orderParameterSliceSelector);
  const currentPageNumber = orderParameterState.orderParameterLocalScope.currentPageNo;
  const totalSummaryDataCount = orderParameterState.summaryData?.totalCount || 0;
  const totalPages = Math.ceil(totalSummaryDataCount / ORDER_PARAMETER_TABLE_PAGE_SIZE);

  const sendRequest = useCallback(() => {
    dispatch(getRplParameterSummaryRequest());
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setOrderParameterCurrentPageNo(pageNumber));
    debouncedSendRequest();
  };
  return (
    <HStack w="full" h="28px" justify="space-between">
      {totalSummaryDataCount > 0 && (
        <>
          <FooterSummary totalItems={totalSummaryDataCount} currentPage={currentPageNumber} />
          <AppPagination
            currentPage={currentPageNumber}
            totalPages={totalPages}
            onPageChange={onPageChangeHandler}
          />
        </>
      )}
    </HStack>
  );
};

export default FooterSection;
