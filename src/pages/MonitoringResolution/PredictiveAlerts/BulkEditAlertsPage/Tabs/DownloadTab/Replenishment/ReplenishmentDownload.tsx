import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppInput from 'components/newTheme/AppInput/AppInput';
import AppText from 'components/newTheme/AppText/AppText';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertRplDownloadBulkEditForecastRequest,
  alertSliceSelector
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import {
  IRPLView,
  rplDownloadBulkEditZipFileRequest,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { GroupLabelTypes } from 'types/requests/groupConfigRequests';
import { replStoreBulkEditHowToWorkInfo, rplBulkEditInstructions } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';
import { getUniqueGroupCodeCount } from '../Forecast/helper';

interface Props {
  filterLabelTypes?: GroupLabelTypes;
}

const ReplenishmentDownload: FC<Props> = () => {
  const dispatch = useDispatch();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const alertState: IAlert = useSelector(alertSliceSelector);
  const [fileName, setFileName] = useState<string>('');
  const selectedAlertSkuList = alertState.selectedSkuList;
  const isGlobalSkuSelected = alertState.alertLocalScope.globalSkuSelected;
  const bulkEditDownloading = rplViewState.loading.rplBulkEditDownload;
  const totalSkuCount = alertState.alertDataList?.totalCount;
  const selectedSkuListLen = alertState.selectedSkuList.length;
  const selectedSKUCount = rplViewState.rplSelectedSkuList.length || 0;
  const isSelectAll = alertState.alertLocalScope.globalSkuSelected;
  const alertedGroupCount = alertState.alertedGroupDetails?.totalCount!;
  const aggregatedCount = isSelectAll ? totalSkuCount : selectedSkuListLen;

  const selectedGroupKey = alertState.selectedSkuList[0]?.groupCode;

  const selectedGroupCount = isGlobalSkuSelected
    ? alertedGroupCount
    : getUniqueGroupCodeCount(selectedAlertSkuList);

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
      if (!fileName) return;
      const action =
        selectedGroupCount > 1
          ? rplDownloadBulkEditZipFileRequest({ fileName })
          : alertRplDownloadBulkEditForecastRequest({ fileName, groupKey: selectedGroupKey });

      dispatch(action);
      onClose();
      setFileName('');
    };
    return (
      <AppUserInputPrompt
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="Cancel"
        rightBtnName="Download"
        title="Download Bulk Edit Replenishment Template"
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
      />
    );
  }, [isOpen, fileName]);

  const renderRplDownloadTemplate = useCallback(() => {
    const downloadBtnName =
      selectedGroupCount > 1 ? `Download all ${selectedGroupCount} Templates` : 'Download Template';

    const templateDesc =
      selectedGroupCount > 1
        ? `Templates for current selections includes ${numberWithCommaSeparator(
            aggregatedCount
          )} SKU-locations across ${selectedGroupCount} Groups. A separate template will be available for each group.`
        : `Template for current selections includes ${numberWithCommaSeparator(
            aggregatedCount
          )} SKU-locations`;
    return (
      <>
        <VStack align="start" spacing="8px">
          <AppText fontSize="13px" fontWeight={700}>
            Template
          </AppText>
          <AppText size="body2" color="#DDDDDD">
            {templateDesc}
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
            {downloadBtnName}
          </AppButton>
        </HStack>
      </>
    );
  }, [selectedGroupCount, isSelectAll, totalSkuCount, selectedSKUCount, aggregatedCount]);
  return (
    <>
      {downloadConfirmationPrompt()}
      <VStack h="full" w="565px" align="start" spacing="16px">
        <VStack h="136px" w="full" align="start" spacing="12px" pt="6px">
          <AppText size="h3Semibold">How it works</AppText>
          <Box>
            <AppText size="body2" color="#8EADC1">
              You can edit replenishment schedules in bulk in 4 simple steps
            </AppText>
            {replStoreBulkEditHowToWorkInfo?.map((info, index) => (
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
            {rplBulkEditInstructions?.map((info, index) => (
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
          minH="138px"
          w="565px"
          borderRadius="8px"
          bg="#0A1922"
          align="start"
          p="16px"
          spacing="22px"
        >
          {renderRplDownloadTemplate()}
        </VStack>
      </VStack>
    </>
  );
};

export default ReplenishmentDownload;
