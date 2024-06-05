import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import EmptyPanel from './EmptyPanel/EmptyPanel';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import HistoryTableFooter from './HistoryTableFooter/HistoryTableFooter';
import FileUploader from './FileUploader/FileUploader';
import {
  IDFView,
  dfViewSliceSelector,
  downloadBulkForecastEditResultRequest,
  getUploadHistoryDataRequest,
  setUploadHistorySearchKey
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import AppSimpleGrid from 'components/newTheme/AppSimpleGrid/AppSimpleGrid';
import { uploadHistoryTableHeaders } from 'utils/constants';
import { formatRowData } from 'utils/dataFormatter';
import { useNavigate } from 'react-router-dom';

interface Props {}

const UploadTab: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState: IUser = useSelector(userSliceSelector);
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const uploadHistoryDataCount = dfViewState.uploadedHistory?.totalCount!;
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const uploadHistoryData = dfViewState.uploadedHistory?.list.data;
  const historyTableLoading = dfViewState.loading.historyTableLoading;
  const uploadHistorySearchKey = dfViewState.dfViewLocalScope.uploadHistorySearchKey!;
  const uploadHistoryDataList = dfViewState.uploadedHistory;

  const [pageIsLoaded, setPageIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setPageIsLoaded(true);
  }, []);

  useEffect(() => {
    if (uploadHistoryDataList !== null) {
      navigate('/app/demand-forecast');
    }
  }, [selectedOrgKey]);

  const fetchData = async () => {
    try {
      if (selectedOrgKey && pageIsLoaded) {
        await dispatch(getUploadHistoryDataRequest({}));
      }
    } catch (error) {
      console.error('Summary details fetching error occurred', error);
    }
  };

  useEffect(() => {
    try {
      const abortController = new AbortController();
      dispatch(setUploadHistorySearchKey(''));
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
    dispatch(setUploadHistorySearchKey(value));
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(
        getUploadHistoryDataRequest({
          searchKey: uploadHistorySearchKey
        })
      );
    }
  };

  const dataRow = formatRowData(uploadHistoryData!);

  const onDownloadActionHandler = (id: string, fileName: string) => {
    dispatch(
      downloadBulkForecastEditResultRequest({
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
