import { FC, useCallback, useMemo } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import PaginationSummary from './PaginationSummary';
import {
  getProductNewActivationRequest,
  newProductActivationSliceSelector
} from 'state/pages/product/newActivation/productNewActivationState';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';
interface FooterSectionProps {}

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();

  const viewState = useSelector(newProductActivationSliceSelector).productActivationView.data;

  const currentPageNumber = viewState.pageNumber;
  const totalCount = viewState.totalCount || 0;
  const pageSize = STORE_ACTIVATION_PAGE_SIZE || 10;
  const totalPages = totalCount ? Math.ceil(totalCount / STORE_ACTIVATION_PAGE_SIZE) : 0;

  // useEffect(() => {
  // }, [currentPageNumber]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(
      getProductNewActivationRequest({
        pageNumber: pageNumber,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        filter: [],
        searchKey: ''
      })
    );
    // dispatch(setStoreActivationPageNumber({ pageNumber: pageNumber }));
  };

  return (
    <HStack w="full" h="28px" justify="space-between">
      {totalCount > 0 && (
        <>
          <PaginationSummary
            totalItems={totalCount}
            currentPage={currentPageNumber}
            pageSize={pageSize}
          />
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
