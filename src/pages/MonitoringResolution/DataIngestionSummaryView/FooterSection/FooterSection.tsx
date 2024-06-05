import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import PaginationSummary from './PaginationSummary';
import {
  setDataIngestionSummaryPaginationAction,
  getDataIngestionSummaryViewDataRequest,
  IDataIngestionSummaryView,
  summaryViewSliceSelector,
} from 'state/pages/monitoringAndResolution/dataIngestionSummaryView/dataIngestionSummaryViewState';
import { DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE } from 'utils/constants';

interface FooterSectionProps {
 }

const FooterSection: FC<FooterSectionProps> = () => {
  const dispatch = useDispatch();
  const dataIngestionSummaryViewState: IDataIngestionSummaryView = useSelector(summaryViewSliceSelector);
  const currentPageNumber = dataIngestionSummaryViewState.dataIngestionSummaryViewLocalScope.pageNumber;
  const totalCount = dataIngestionSummaryViewState.dataIngestionSummaryViewDataInfo?.totalCount || 0;
  const totalPages = totalCount? Math.ceil(totalCount / DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE) : 0;

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setDataIngestionSummaryPaginationAction(pageNumber));
    dispatch(getDataIngestionSummaryViewDataRequest());
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
      <PaginationSummary
        currentPage={currentPageNumber}
        totalItems={totalCount}
        pageSize={DATA_INGESTION_SUMMARY_TABLE_PAGE_SIZE}
      />
      {totalCount > 0 && (
        <AppPagination
          currentPage={currentPageNumber}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
        />
      )}
    </HStack>
  );
};

export default FooterSection;
