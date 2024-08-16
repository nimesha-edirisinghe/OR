import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { showErrorToast } from 'state/toast/toastState';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppInput from 'components/newTheme/AppInput/AppInput';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  downloadPromotionSummaryDataRequest,
  getPromotionSummaryDataRequest,
  IPromotionSummaryView,
  promotionSummaryViewSliceSelector,
  setPromotionSummaryPaginationPageNo,
  setPromotionSummarySearchKey
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface PromotionSummaryViewHeaderProps {}

const PromotionSummaryViewHeader: FC<PromotionSummaryViewHeaderProps> = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState<string>('');
  const { isOpen, onToggle, onClose } = useDisclosure();
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const totalSkuCount = promotionSummaryViewState.skuListData?.totalCount;
  const isDownloading = promotionSummaryViewState.loading?.download;
  const lastUpdateDataTime = promotionSummaryViewState.lastUpdatedDateTime!;

  const refreshHandler = () => {
    dispatch(setPromotionSummaryPaginationPageNo(1));
    dispatch(setPromotionSummarySearchKey(''));
    dispatch(getPromotionSummaryDataRequest());
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
        />
      </Box>
    );
  }, [fileName]);

  const downloadConfirmationPrompt = useCallback(() => {
    const onDownloadHandler = () => {
      if (fileName === '') {
        showErrorToast('File name required');
        return;
      }
      dispatch(
        downloadPromotionSummaryDataRequest({
          fileName: fileName
        })
      );
      onClose();
      setFileName('');
    };
    return (
      <AppUserInputPrompt
        isOpen={isOpen}
        onClose={onClose}
        leftBtnName="Cancel"
        rightBtnName="Download"
        title={`Download ${totalSkuCount} SKU Promotion Details`}
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
      />
    );
  }, [isOpen, fileName]);

  return (
    <>
      {downloadConfirmationPrompt()}
      <HStack h="full" w="full" justify="flex-end" spacing="12px">
        <HStack w="auto">
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            Last Update:
          </AppText>
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            {lastUpdateDataTime}
          </AppText>
        </HStack>
        <AppTooltip label={'Refresh'} noOfLines={1} placement="bottom-start">
          <Box>
            <AppIconButton
              aria-label="refresh"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="refresh"
                  width="14px"
                  height="14px"
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={refreshHandler}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
        <AppTooltip label={'Download'} noOfLines={1} placement="bottom-start">
          <Box>
        <AppIconButton
          aria-label="download"
          isDisabled={totalSkuCount === 0}
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="download"
              width="14px"
              height="14px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={onToggle}
          bg={ocean_blue_600}
          isLoading={isDownloading}
        />
        </Box>
        </AppTooltip>
      </HStack>
    </>
  );
};

export default PromotionSummaryViewHeader;
