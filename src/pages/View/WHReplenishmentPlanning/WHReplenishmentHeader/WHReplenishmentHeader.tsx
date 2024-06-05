import { CSSProperties, ChangeEvent, FC, useCallback, useState } from 'react';
import { Box, Center, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import {
  blue_500,
  neutral_100,
  neutral_200,
  ocean_blue_600,
  red_500,
  yellow_500_t28,
  state_warning,
  ocean_blue_400
} from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useDispatch, useSelector } from 'react-redux';
import AppUserInputPrompt from 'components/AppUserInputPrompt/AppUserInputPrompt';
import AppInput from 'components/newTheme/AppInput/AppInput';
import {
  IRPLWhView,
  downloadRplWHReportRequest,
  getReplenishmentWHExpandedSkuDataRequest,
  getReplenishmentWHSkuDataRequest,
  resetViewWhRplPlanRightPanel,
  rplWHViewSliceSelector,
  whRplSkuSearchAction,
  setDateRange,
  setIsLoadWhData,
  getReplenishmentTotalCount,
  whRplResetSkuExpandedListData
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { showErrorToast } from 'state/toast/toastState';
import MoreOptionContent from './MoreOptionContent';
import AppPopover from 'components/AppPopover/AppPopover';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AppRadio from 'components/newTheme/AppRadio/AppRadio';
import AppDateRangeCalendar from 'components/AppDateCalendar/Calender/AppDateRangeCalendar';
import { orderFrequencyT } from 'pages/View/ReplenishmentPlanning/ReplenishmentHeader/ReplenishmentHeader';
import { whReplBulkMoreOptionItemList } from 'utils/constants';

interface WHReplenishmentHeaderProps {}

const WHReplenishmentHeader: FC<WHReplenishmentHeaderProps> = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: isOpenMoreOption,
    onToggle: onToggleMoreOption,
    onClose: onCloseMoreOption
  } = useDisclosure();
  const [fileName, setFileName] = useState<string>('');
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const isDownloading = rplWhViewState.loading.download;
  const totalSkuCount = rplWhViewState.rplWhSkuDataList?.totalCount;
  const isSkuListLoading = rplWhViewState.loading.data;
  const startDate = rplWhViewState.rplWhViewLocalScope.startDate;
  const endDate = rplWhViewState.rplWhViewLocalScope.endDate;
  const searchKey = rplWhViewState.rplWhViewLocalScope.rplWhSkuSearchKey;
  const [dateError, setDateError] = useState<string>('');
  const [orderFrequency, setOrderFrequency] = useState<orderFrequencyT>('default');
  const selectedSKUCount = rplWhViewState.rplWhSelectedSkuList.length;
  const isSelectAll = rplWhViewState.rplWhViewLocalScope.globalRplWhSkuSelected;

  const moreOptionPopoverStyles: CSSProperties = {
    maxWidth: '277px',
    margin: 0,
    borderRadius: '8px',
    borderColor: ocean_blue_400,
    marginTop: '-6.5px'
  };

  const onRefreshHandler = () => {
    dispatch(whRplSkuSearchAction(''));
    dispatch(resetViewWhRplPlanRightPanel());
    dispatch(whRplResetSkuExpandedListData());
    dispatch(getReplenishmentWHSkuDataRequest({}));
  };

  const renderBody = useCallback(() => {
    const onChangeFileName = (value: string) => {
      setFileName(value);
    };

    const orderFrequencyHandler = (value: string) => {
      setOrderFrequency(value as orderFrequencyT);
    };

    const onRangeSelectHandler = (startDate: Date, endDate: Date) => {
      const strStartDate = format(startDate, 'yyyy-MM-dd').toString();
      const strEndDate = format(endDate, 'yyyy-MM-dd').toString();

      dispatch(setDateRange({ startDate: strStartDate, endDate: strEndDate }));
      setDateError('');
    };
    return (
      <VStack align="start">
        <AppText size="body2" color={neutral_100}>
          Please select the ordering period from the options below.
        </AppText>

        <VStack w="full" h="auto" align="start">
          <VStack align="start" px="12px" spacing="16px">
            <AppRadio
              value="default"
              isChecked={orderFrequency === 'default'}
              onChange={orderFrequencyHandler}
              colorScheme={neutral_200}
              size="sm"
            >
              <AppText size="body3">Default</AppText>
            </AppRadio>
            <AppRadio
              value="custom"
              isChecked={orderFrequency === 'custom'}
              onChange={orderFrequencyHandler}
              colorScheme={neutral_200}
              size="sm"
            >
              <AppText size="body3">Custom</AppText>
            </AppRadio>
          </VStack>
          {orderFrequency === 'custom' && (
            <VStack>
              <AppDateRangeCalendar onRangeSelect={onRangeSelectHandler} selectedDateRange={null} />
              <AppText fontSize="15px" color={red_500} alignSelf="self-start">
                {dateError}
              </AppText>
            </VStack>
          )}
        </VStack>
        <Box>
          <AppInput
            w="481px"
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeFileName(e.target.value)}
            label="File name"
            value={fileName}
            variant="primary"
            size="small"
            fontSize="14px"
            placeholder="Enter file name"
          />
        </Box>
      </VStack>
    );
  }, [fileName, orderFrequency, dateError]);

  const downloadConfirmationPrompt = useCallback(() => {
    const onDownloadHandler = () => {
      if (orderFrequency === 'custom' && (startDate === null || endDate === null)) {
        setDateError('Please select a date range to download');
        return;
      }

      if (fileName === '') {
        showErrorToast('File name required');
        return;
      }
      dispatch(
        downloadRplWHReportRequest({
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
        title={`Download ${totalSkuCount} Replenishment Plans`}
        onConfirmHandler={onDownloadHandler}
        onCloseHandler={onClose}
        children={renderBody()}
        minWidth="546px"
      />
    );
  }, [isOpen, fileName, orderFrequency, dateError]);

  const onClickDownload = () => {
    setDateError('');
    dispatch(setDateRange({ startDate: null, endDate: null }));
    onToggle();
  };

  const onClickGridView = () => {
    dispatch(getReplenishmentWHExpandedSkuDataRequest({ searchKey }));
    dispatch(setIsLoadWhData(false));
    dispatch(getReplenishmentTotalCount());
    navigate('/app/wh-replenishment/grid-view');
  };

  return (
    <>
      {downloadConfirmationPrompt()}
      <HStack w="full" height="full" userSelect="none" justify="space-between">
        <HStack spacing="16px">
          {(selectedSKUCount || (isSelectAll && totalSkuCount)) && (
            <Center h="36px" bg={yellow_500_t28} borderRadius="8px">
              <AppText fontSize="13px" color={state_warning} px="8px" py="4px" fontWeight={400}>
                {isSelectAll ? totalSkuCount : selectedSKUCount} Replenishment Schedules Selected
              </AppText>
            </Center>
          )}
        </HStack>
        <HStack>
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
            onClick={onClickDownload}
            bg={ocean_blue_600}
            isLoading={isDownloading}
            isDisabled={!isSelectAll && selectedSKUCount == 0}
          />
          <AppIconButton
            aria-label="gridView"
            icon={<AppIcon transition="transform 0.25s ease" name="gridView" fill={blue_500} />}
            variant="secondary"
            size="iconMedium"
            onClick={onClickGridView}
            bg={ocean_blue_600}
            isLoading={isSkuListLoading}
            isDisabled={!isSelectAll && selectedSKUCount == 0}
          />
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

          <Box>
            <AppPopover
              isOpen={isOpenMoreOption}
              onClose={onCloseMoreOption}
              contentStyles={moreOptionPopoverStyles}
              trigger="click"
              children={
                <AppIconButton
                  aria-label="moreOption"
                  icon={
                    <AppIcon transition="transform 0.25s ease" name="moreOption" fill={blue_500} />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={onToggleMoreOption}
                  bg={isOpenMoreOption ? ocean_blue_400 : ocean_blue_600}
                  isDisabled={!isSelectAll && selectedSKUCount == 0}
                />
              }
              content={<MoreOptionContent options={whReplBulkMoreOptionItemList} />}
            />
          </Box>
        </HStack>
      </HStack>
    </>
  );
};

export default WHReplenishmentHeader;
