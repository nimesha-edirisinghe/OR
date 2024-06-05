import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, HStack, Skeleton, Stack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import HeaderSection from '../HeaderSection/HeaderSection';
import TableSection from '../TableSection/TableSection';
import FooterSection from '../FooterSection/FooterSection';
import {
  getDataIngestionSummaryViewDataRequest,
  IDataIngestionSummaryView,
  setDataIngestionSummaryPaginationAction,
  setDataIngestionSummarySearchKey,
  summaryViewSliceSelector
} from 'state/pages/monitoringAndResolution/dataIngestionSummaryView/dataIngestionSummaryViewState';
import { IUser, userSliceSelector } from 'state/user/userState';
import { TableHeader } from 'types/responses/viewResponses';
import { dataIngestionSummaryViewTableHeader } from 'utils/constants';
import { formatDataIngestionSummaryViewRowData } from 'utils/dataFormatter';

interface Props {}

const ViewSummary: FC<Props> = () => {
  const [pageIsLoaded, setPageIsLoaded] = useState<boolean>(false);
  const [rowData, setRowData] = useState<{ id?: any; row: any[] }[]>([]);
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const dataIngestionSummaryViewState: IDataIngestionSummaryView =
    useSelector(summaryViewSliceSelector);
  const selectedOrgKey = userState.selectedOrg?.orgKey;
  const dataIngestionSummaryDataLoading =
    dataIngestionSummaryViewState.loading?.dataIngestionSummaryDataLoading;
  const dataIngestionSummaryViewList =
    dataIngestionSummaryViewState.dataIngestionSummaryViewDataInfo?.list;
  const pageNumber =
    dataIngestionSummaryViewState.dataIngestionSummaryViewLocalScope?.pageNumber;
  const tableHeaders: TableHeader[] = dataIngestionSummaryViewTableHeader;

  useEffect(() => {
    setPageIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedOrgKey && pageIsLoaded) {
          await dispatch(getDataIngestionSummaryViewDataRequest());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedOrgKey, pageIsLoaded, dispatch]);

  useEffect(() => {
    if (dataIngestionSummaryViewList && tableHeaders) {
      const updatedRowData : { id?: any; row: any[] }[] = formatDataIngestionSummaryViewRowData(dataIngestionSummaryViewList)
      setRowData(updatedRowData);
    }
  }, [dataIngestionSummaryViewList, tableHeaders, pageNumber]);

  const searchHandler = useCallback((key: string) => {
    dispatch(setDataIngestionSummarySearchKey(key));
    dispatch(setDataIngestionSummaryPaginationAction(1));
    dispatch(getDataIngestionSummaryViewDataRequest());
  }, []);

  const viewSummaryPageContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px" pb="20px" overflow="hidden" >
          <Box>
            <HStack>
              <HeaderSection searchHandler={searchHandler} />
            </HStack>
          </Box>
          {dataIngestionSummaryDataLoading ? (
          <Box>
            <Stack mt="20px" spacing="20px">
              <Skeleton height="calc(100vh - 245px)" borderRadius="8px" />
            </Stack>
          </Box>
        ) : (
            <Box mt="20px" w="full">
              <VStack w="full" borderRadius="10px" userSelect="none" spacing="20px">
                <TableSection rowData={rowData} />
                  <FooterSection />
              </VStack>
            </Box>
        )}
      </Box>
    );
  }, [dataIngestionSummaryDataLoading, searchHandler, rowData]);

  return (
    <>
      <InsightsPageLayout children={viewSummaryPageContent()} />
    </>
  );
};

export default ViewSummary;
