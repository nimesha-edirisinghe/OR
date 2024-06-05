import { FC, useCallback, useMemo } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import PaginationSummary from './PaginationSummary';
import { PROMOTION_SUMMARY_TABLE_PAGE_SIZE } from 'utils/constants';
import {
  getPromotionSummaryDataRequest,
  IPromotionSummaryView,
  promotionSummaryViewSliceSelector,
  setPromotionSummaryPaginationPageNo
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import { debounce } from 'lodash';

interface FooterSectionProps {}

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const currentPageNumber = promotionSummaryViewState.promotionSummaryViewLocalScope.pageNumber;
  const totalCount = promotionSummaryViewState.skuListData?.totalCount || 0;
  const totalPages = totalCount ? Math.ceil(totalCount / PROMOTION_SUMMARY_TABLE_PAGE_SIZE) : 0;

  const sendRequest = useCallback(() => {
    dispatch(getPromotionSummaryDataRequest());
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setPromotionSummaryPaginationPageNo(pageNumber));
    debouncedSendRequest();
  };

  return (
    <HStack w="full" h="28px" justify="space-between">
      {totalCount > 0 && (
        <>
          <PaginationSummary totalItems={totalCount} currentPage={currentPageNumber} />
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
