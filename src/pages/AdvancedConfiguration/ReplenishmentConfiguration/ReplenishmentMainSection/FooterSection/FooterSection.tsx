import { HStack } from '@chakra-ui/react';
import AppPagination from 'components/newTheme/AppPagination/AppPagination';
import { FC, useCallback, useMemo, useState } from 'react';
import FooterSummary from './FooterSummary';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import {
  getReplenishmentConfigDataRequest,
  rplConfigPageSliceSelector,
  setRplConfigCurrentPage
} from 'state/pages/advancedConfiguration/replenishmentConfigurationPage/rplConfigPageState';

interface Props {}

const FooterSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const rplConfigPageState = useSelector(rplConfigPageSliceSelector);
  const currentPageNumber = rplConfigPageState.rplPlanningConfigLocalScope.currentPageNo;
  const totalRecordsCount = rplConfigPageState.totalRecordsCount || 0;
  const totalPages = Math.ceil(totalRecordsCount / 10);
  const [pageNo, setPageNo] = useState<number>(1);

  const sendRequest = useCallback(() => {
    dispatch(getReplenishmentConfigDataRequest({}));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onPageChangeHandler = (pageNumber: number) => {
    setPageNo(pageNumber);
    dispatch(setRplConfigCurrentPage(pageNumber));
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
