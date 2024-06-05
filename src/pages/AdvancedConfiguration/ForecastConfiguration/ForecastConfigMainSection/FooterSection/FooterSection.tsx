import { HStack } from '@chakra-ui/react';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import { FC, useCallback, useMemo } from 'react';
import FooterSummary from './FooterSummary';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import {
  fcConfigPageSliceSelector,
  getTableDataRequest,
  setFcConfigCurrentPage
} from 'state/pages/advancedConfiguration/forecastConfigurationPage/pageState';

interface Props {}

const FooterSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const fConfigPage = useSelector(fcConfigPageSliceSelector);
  const currentPageNumber = fConfigPage.trainingConfigLocalScope.currentPageNo;
  const totalRecordsCount = fConfigPage.totalRecordsCount || 0;
  const totalPages = Math.ceil(totalRecordsCount / 10);

  const sendRequest = useCallback(() => {
    dispatch(getTableDataRequest({ groupName: '' }));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    dispatch(setFcConfigCurrentPage(pageNumber));
    debouncedSendRequest();
  };
  return (
    <HStack w="full" h="28px" justify="space-between">
      {
        <>
          <FooterSummary totalItems={totalRecordsCount} currentPage={currentPageNumber} />
          <AppPagination
            currentPage={currentPageNumber}
            totalPages={totalPages}
            onPageChange={onPageChangeHandler}
          />
        </>
      }
    </HStack>
  );
};

export default FooterSection;
