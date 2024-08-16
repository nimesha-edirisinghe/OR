import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppInput from 'components/newTheme/AppInput/AppInput';
import AppText from 'components/newTheme/AppText/AppText';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGroupConfigurationSlice,
  getFilterCountRequest,
  getLabelsRequest,
  groupConfigurationSliceSelector,
  toggleDrawerFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import { getFilterItemCount } from 'state/pages/advancedConfiguration/groupConfiguration/stateHelpers/stH_groupConfigurations';
import {
  IGroupConfig,
  groupConfigSliceSelector
} from 'state/pages/shared/groupConfig/groupConfigState';
import {
  IDFView,
  dfViewSliceSelector,
  downloadBulkEditForecastRequest
} from 'state/pages/view/demandForecastView/dfViewPageState';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import { bulkEditHowToWorkInfo, bulkEditInstructions } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  filterLabelTypes?: GroupLabelTypes;
}

const DownloadTab: FC<Props> = ({ filterLabelTypes }) => {
  const dispatch = useDispatch();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const [skuLocationCount, setSkuLocationCount] = useState<number>(0);
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const sharedGroupState: IGroupConfig = useSelector(groupConfigSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const filterTotalItemsCount = groupConfigState.groupFilter?.filterTotalItemsCount;
  const bulkEditDownloading = dfViewState.loading.bulkEditDownload;
  const selectedSkuListLen = dfViewState.selectedSkuList.length;
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const groupKey = sharedGroupState.selectedGroupKey!;
  const aggregatedCount = (isAllSkuSelected ? totalSkuCount : selectedSkuListLen) || 0;

  useEffect(() => {
    const skuLocationCount = getFilterItemCount(groupFilter, 1, 'sku');
    setSkuLocationCount(skuLocationCount);
  }, [filterTotalItemsCount]);

  const onClickFilterHandler = () => {
    dispatch(
      getLabelsRequest({
        labelTypes: filterLabelTypes || ['location', 'product', 'anchor', 'store', 'sku']
      })
    );
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  const renderBody = useCallback(() => {
    const onChangeFileName = (value: string) => {
      setFileName(value);
    };
    return (
      <Box>
        <AppInput
          w="384px"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFileName(e.target.value)}
          label="File name"
          value={fileName}
          variant="primary"
          size="small"
          fontSize="14px"
          placeholder="Enter file name"
          isRequired
        />
      </Box>
    );
  }, [fileName]);

  const downloadConfirmationPrompt = useCallback(() => {
    const onDownloadHandler = () => {
      if (fileName) {
        dispatch(
          downloadBulkEditForecastRequest({
            fileName: fileName,
            groupKey
          })
        );
        onClose();
        setFileName('');
      }
    };
    return (
      <AppUserInputPrompt
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="Cancel"
        rightBtnName="Download"
        title="Download Bulk Edit Forecasts Template"
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
      />
    );
  }, [isOpen, fileName]);
  return (
    <>
      {downloadConfirmationPrompt()}
      <VStack h="full" w="565px" align="start" spacing="16px">
        <VStack h="136px" w="full" align="start" spacing="12px" pt="6px">
          <AppText size="h3Semibold">How it works</AppText>
          <Box>
            <AppText size="body2" color="#8EADC1">
              You can edit forecasts in bulk in 4 simple steps
            </AppText>
            {bulkEditHowToWorkInfo?.map((info, index) => (
              <HStack key={info.id} align="start">
                <Box minW="11px" textAlign="right">
                  <AppText size="body2" color="#8EADC1">
                    {index + 1}.
                  </AppText>
                </Box>
                <AppText size="body2" color="#8EADC1">
                  {info.label}
                </AppText>
              </HStack>
            ))}
          </Box>
        </VStack>
        <VStack h="auto" w="full" align="start">
          <AppText size="h3Semibold">Instructions</AppText>
          <Box>
            {bulkEditInstructions?.map((info, index) => (
              <HStack key={info.id} align="start">
                <Box minW="11px" textAlign="right">
                  <AppText size="body2" color="#8EADC1">
                    {index + 1}.
                  </AppText>
                </Box>
                <AppText size="body2" color="#8EADC1">
                  {info.label}
                </AppText>
              </HStack>
            ))}
          </Box>
        </VStack>
        <VStack
          h="138px"
          w="565px"
          borderRadius="8px"
          bg="#0A1922"
          align="start"
          p="16px"
          spacing="22px"
        >
          <VStack align="start" spacing="8px">
            <AppText fontSize="13px" fontWeight={700}>
              Template
            </AppText>
            <AppText size="body2" color="#DDDDDD">
              {`Template for current filter includes ${numberWithCommaSeparator(
                aggregatedCount
              )} SKU-locations`}
            </AppText>
          </VStack>
          <HStack>
            <AppButton
              variant="primary"
              size="medium"
              onClick={onToggle}
              isLoading={bulkEditDownloading}
              loadingText="Downloading"
            >
              Download template
            </AppButton>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default DownloadTab;
