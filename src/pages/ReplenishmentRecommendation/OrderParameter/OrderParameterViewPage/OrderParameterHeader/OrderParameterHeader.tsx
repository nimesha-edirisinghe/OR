import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInput from 'components/newTheme/AppInput/AppInput';
import AppText from 'components/newTheme/AppText/AppText';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IOrderParameter,
  downloadRplParameterSummaryRequest,
  getRplParameterSummaryRequest,
  orderParameterSliceSelector,
  setOrderParameterCurrentPageNo,
  setOrderParameterSearchKey
} from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';
import { showErrorToast } from 'state/toast/toastState';
import { blue_500, ocean_blue_600, ocean_blue_100 } from 'theme/colors';

interface Props {}
const OrderParameterHeader: FC<Props> = () => {
  const dispatch = useDispatch();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const orderParameterState: IOrderParameter = useSelector(orderParameterSliceSelector);
  const lastUpdateDataTime = orderParameterState.lastUpdatedDateTime!;
  const isDownloading = orderParameterState.loading.downloadSummary;
  const orderSummaryData = orderParameterState.summaryData?.totalCount;

  const refreshHandler = () => {
    dispatch(setOrderParameterSearchKey(''));
    dispatch(setOrderParameterCurrentPageNo(1));
    dispatch(getRplParameterSummaryRequest());
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
      if (fileName === '') {
        showErrorToast('File name required');
        return;
      }
      dispatch(
        downloadRplParameterSummaryRequest({
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
        title={`Download`}
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
      />
    );
  }, [isOpen, fileName]);
  return (
    <>
      {downloadConfirmationPrompt()}
      <HStack h="full" w="full" justify="flex-end" spacing="20px">
        <HStack w="auto">
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            Last Update:
          </AppText>
          <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
            {lastUpdateDataTime}
          </AppText>
        </HStack>
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
        <AppIconButton
          aria-label="download"
          isDisabled={orderSummaryData === 0}
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
      </HStack>
    </>
  );
};

export default OrderParameterHeader;
