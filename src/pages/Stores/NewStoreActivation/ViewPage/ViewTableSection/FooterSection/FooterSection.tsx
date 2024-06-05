import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import PaginationSummary from './PaginationSummary';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';
import {
  getStoreNewActivationRequest,
  newStoreActivationSliceSelector
} from 'state/pages/stores/newActivation/storeNewActivationState';

interface FooterSectionProps {}

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();

  const viewState = useSelector(newStoreActivationSliceSelector).storeActivationView;

  const currentPageNumber = viewState.data.pageNumber;
  const totalCount = viewState.data.totalCount || 0;
  const pageSize = STORE_ACTIVATION_PAGE_SIZE || 10;
  const totalPages = totalCount ? Math.ceil(totalCount / STORE_ACTIVATION_PAGE_SIZE) : 0;

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(
      getStoreNewActivationRequest({
        pageNumber: pageNumber,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        filter: [],
        searchKey: viewState.selection.searchKey
      })
    );
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
