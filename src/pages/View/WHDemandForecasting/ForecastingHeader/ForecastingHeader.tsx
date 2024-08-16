import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { blue_500, ocean_blue_600, yellow_500 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  IWhDFView,
  whDfViewSliceSelector,
  downloadDemandForecastReportRequest,
  getDemandForecastDataRequest,
  resetViewForecastRightPanel,
  skuSearchAction,
  getDemandForecastSkuListRequest
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppInput from 'components/newTheme/AppInput/AppInput';
import { showErrorToast } from 'state/toast/toastState';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import { useNavigate } from 'react-router-dom';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

interface ForecastingHeaderProps {
  skuMaximized: boolean;
  maximizedHandler: () => void;
}

const ForecastingHeader: FC<ForecastingHeaderProps> = ({ maximizedHandler, skuMaximized }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const isDownloading = dfViewState.loading.download;
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const selectedSkuListLen = dfViewState.selectedSkuList.length;
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const aggregatedCount = (isAllSkuSelected ? totalSkuCount : selectedSkuListLen) || 0;
  const groupConfigState: IGroupConfigurationSlice = useSelector(groupConfigurationSliceSelector);
  const groupFilter = groupConfigState.groupFilter;
  const selectedForecastLabel =
    aggregatedCount === 1
      ? `${aggregatedCount} Forecast Selected`
      : `${aggregatedCount} Forecasts Selected`;

  const onRefreshHandler = () => {
    if (skuMaximized) {
      dispatch(getDemandForecastDataRequest({}));
    } else {
      dispatch(skuSearchAction(''));
      dispatch(resetViewForecastRightPanel());
      dispatch(getDemandForecastSkuListRequest({}));
    }
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
        downloadDemandForecastReportRequest({
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
        title={`Download ${aggregatedCount} Forecasts`}
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
      />
    );
  }, [isOpen, fileName]);

  const onClickGridView = () => {
    navigate('/app/wh-forecast/view/grid');
  };

  return (
    <>
      {downloadConfirmationPrompt()}
      <HStack w="full" height="full" userSelect="none" justify="space-between">
        <HStack w="full" align={'center'} justify={'space-between'}>
          <HStack>
            {aggregatedCount > 0 && !skuMaximized && (
              <HStack
                h={'36px'}
                borderRadius={'8px'}
                px={'4px'}
                py={'8px'}
                bg={'rgba(255, 169, 20, 0.28)'}
                justify={'center'}
              >
                <AppText size="body2" color={yellow_500} noOfLines={1}>
                  {selectedForecastLabel}
                </AppText>
              </HStack>
            )}
          </HStack>
          <HStack>
            <AppTooltip label="Download" placement="bottom-start">
              <Box>
                <AppIconButton
                  aria-label="download"
                  icon={
                    <AppIcon
                      transition="transform 0.25s ease"
                      name="download"
                      width="11.67px"
                      height="14.17px"
                      fill={blue_500}
                    />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={onToggle}
                  bg={ocean_blue_600}
                  isLoading={isDownloading}
                  isDisabled={selectedSkuListLen === 0}
                />
              </Box>
            </AppTooltip>
            {!skuMaximized && (
              <AppTooltip label="Grid View" placement="bottom-start">
                <Box>
                  <AppIconButton
                    aria-label="gridView"
                    icon={
                      <AppIcon transition="transform 0.25s ease" name="gridView" fill={blue_500} />
                    }
                    variant="secondary"
                    size="iconMedium"
                    onClick={onClickGridView}
                    bg={ocean_blue_600}
                    isDisabled={selectedSkuListLen === 0}
                  />
                </Box>
              </AppTooltip>
            )}
            <AppTooltip label="Refresh" placement="bottom-start">
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
                  onClick={onRefreshHandler}
                  bg={ocean_blue_600}
                />
              </Box>
            </AppTooltip>
            <AppTooltip label="More Option" placement="bottom-start">
              <Box>
                <AppIconButton
                  aria-label="moreOption"
                  icon={
                    <AppIcon transition="transform 0.25s ease" name="moreOption" fill={blue_500} />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={() => {}}
                  bg={ocean_blue_600}
                  isDisabled={selectedSkuListLen === 0}
                />
              </Box>
            </AppTooltip>
          </HStack>
        </HStack>
      </HStack>
    </>
  );
};

export default ForecastingHeader;
