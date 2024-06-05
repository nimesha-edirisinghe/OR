import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import EmptyPanel from './EmptyPanel/EmptyPanel';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import HistoryTableFooter from './HistoryTableFooter/HistoryTableFooter';
import FileUploader from './FileUploader/FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { uploadHistoryTableHeaders } from 'utils/constants';
import { formatRowData } from 'utils/dataFormatter';
import {
  IRPLWhView,
  rplWHDownloadBulkForecastEditResultRequest,
  rplWHGetUploadHistoryDataRequest,
  rplWHSetUploadHistorySearchKey,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';

interface Props {}

const UploadTab: FC<Props> = () => {
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const uploadHistoryDataCount = rplWhViewState.rplWhUploadedHistory?.totalCount!;
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const uploadHistoryData = rplWhViewState.rplWhUploadedHistory?.list.data;
  const historyTableLoading = rplWhViewState.loading.rplWhHistoryTableLoading;
  const uploadHistorySearchKey = rplWhViewState.rplWhViewLocalScope.rplWhUploadHistorySearchKey!;

  const [pageIsLoaded, setPageIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPageIsLoaded(true);
  }, []);

  const fetchData = async () => {
    try {
      if (selectedOrgKey && pageIsLoaded) {
        await dispatch(rplWHGetUploadHistoryDataRequest({}));
      }
    } catch (error) {
      console.error('Summary details fetching error occurred', error);
    }
  };

  useEffect(() => {
    try {
      const abortController = new AbortController();
      dispatch(rplWHSetUploadHistorySearchKey(''));
      fetchData();
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey, pageIsLoaded]);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(rplWHSetUploadHistorySearchKey(value));
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(
        rplWHGetUploadHistoryDataRequest({
          searchKey: uploadHistorySearchKey
        })
      );
    }
  };

  const dataRow = formatRowData(uploadHistoryData!);

  const onDownloadActionHandler = (id: string, fileName: string) => {
    dispatch(
      rplWHDownloadBulkForecastEditResultRequest({
        fileName: fileName,
        uploadId: id
      })
    );
  };

  return (
    <VStack h="auto" w="full" spacing="20px" mt="4px">
      <HStack h="36px" w="full" justify="space-between" align="center">
        <AppText size="h3Semibold">Upload History</AppText>
        <FileUploader />
      </HStack>
      {uploadHistoryDataCount > 0 ? (
        <Box h="calc(100vh - 294px)" w="full" bg="#0A1922" borderRadius="8px" p="16px">
          <VStack h="full" w="full" align="start" spacing="16px">
            <Box>
              <AppInputGroup
                placeholder="Search"
                value={uploadHistorySearchKey}
                onChange={onSearchHandler}
                fontSize="14px"
                variant="primary"
                inputSize="large"
                width="232px"
                height="36px"
                onKeyDown={onKeyDownHandler}
              />
            </Box>
            <Box w="full" h="calc(100vh - 415px)">
              <Skeleton
                w="full"
                height="full"
                borderRadius="10px"
                isLoaded={!historyTableLoading}
                fadeDuration={1}
                speed={1}
              >
                <AppSimpleGrid
                  headers={uploadHistoryTableHeaders}
                  rows={dataRow}
                  maxW="100%"
                  maxH="calc(100vh - 415px)"
                  onActionHandler={onDownloadActionHandler}
                />
              </Skeleton>
            </Box>

            <HistoryTableFooter />
          </VStack>
        </Box>
      ) : (
        <EmptyPanel />
      )}
    </VStack>
  );
};

export default UploadTab;
