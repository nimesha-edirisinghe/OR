import { CSSProperties, FC, useCallback, useMemo } from 'react';
import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  downloadAlertRequest,
  getAlertsRequest,
  setAlertDefinitionPaginationPageNo,
  setAlertDefinitionSearchKey
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { AppIcon } from 'components/AppIcon/AppIcon';
import {
  blue_500,
  ocean_blue_200,
  ocean_blue_400,
  ocean_blue_600,
  yellow_500,
  yellow_500_t28
} from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { debounce } from 'lodash';
import {
  getFilterCountRequest,
  getLabelsRequest,
  toggleDrawerFilter
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import useTooltip from 'hooks/useTooltip';
import AppPopover from 'components/AppPopover/AppPopover';
import AppText from 'components/AppText/AppText';
import { forecastOptions, replenishmentOptions } from './ActionBarMoreOption';

interface ActionBarProps {}

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

const ActionBar: FC<ActionBarProps> = () => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const searchKey = alertState.alertLocalScope?.skuSearchKey;
  const dispatch = useDispatch();
  const totalCount = alertState.alertDataList?.totalCount || 0;
  const isAllSkuSelected = alertState.alertLocalScope.globalSkuSelected;
  const totalSkuCount = alertState.alertDataList?.totalCount;
  const selectedSkuListLen = alertState.selectedSkuList.length;
  const aggregatedCount = (isAllSkuSelected ? totalSkuCount : selectedSkuListLen) || 0;
  const alertType = alertState.alertLocalScope.selectedAlertTypeObj.alertType;
  const [isResolveTooltipOpen, handleResolveMouseEnter, handleResolveMouseLeave] = useTooltip();
  const [isDownloadTooltipOpen, handleDownloadMouseEnter, handleDownloadMouseLeave] = useTooltip();
  const [isFilterTooltipOpen, handleFilterMouseEnter, handleFilterMouseLeave] = useTooltip();
  const isForecastAlertType = alertType === 'degrowth' || alertType === 'growth';
  const selectedForecastLabel =
    aggregatedCount === 1
      ? `${aggregatedCount} SKU-location Selected`
      : `${aggregatedCount} SKU-locations Selected`;

  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();

  const sendRequest = useCallback(() => {
    dispatch(getAlertsRequest({ alertOnly: 1 }));
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 1000);
  }, [sendRequest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setAlertDefinitionSearchKey(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      dispatch(setAlertDefinitionPaginationPageNo(1));
      debouncedSendRequest();
    }
  };

  const onClickDownloadHandler = () => {
    dispatch(
      downloadAlertRequest({
        alertOnly: 1
      })
    );
  };

  const onFilterClick = () => {
    // dispatch(resetGroupFilter());
    dispatch(getLabelsRequest({ labelTypes: ['location', 'product', 'store'] }));
    dispatch(getFilterCountRequest({ whFlag: 0 }));
    dispatch(toggleDrawerFilter({ isOpen: true }));
  };

  const getResolvedOption = () => {
    return alertType === 'degrowth' || alertType === 'growth'
      ? forecastOptions
      : replenishmentOptions;
  };

  if (totalCount === 0) return null;

  return (
    <HStack w="full" borderRadius="10px" userSelect="none" justify="space-between">
      <HStack spacing="18px">
        <AppInputGroup
          placeholder="Search"
          value={searchKey}
          onChange={handleInputChange}
          fontSize="14px"
          variant="primary"
          inputSize="large"
          width="306px"
          onKeyDown={handleSearchFieldPress}
        />
        {aggregatedCount > 0 && (
          <HStack
            h={'36px'}
            borderRadius={'8px'}
            px={'4px'}
            py={'8px'}
            bg={yellow_500_t28}
            justify={'center'}
          >
            <AppText size="body2" color={yellow_500} noOfLines={1}>
              {selectedForecastLabel}
            </AppText>
          </HStack>
        )}
      </HStack>
      <HStack spacing="8px">
        <AppTooltip
          label="Filter"
          placement="bottom-start"
          isOpen={isFilterTooltipOpen}
          onClose={handleFilterMouseLeave}
        >
          <Box onMouseEnter={handleFilterMouseEnter} onMouseLeave={handleFilterMouseLeave}>
            <AppIconButton
              aria-label="next"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="filter"
                  width="13px"
                  height="15px"
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={onFilterClick}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
        <AppTooltip
          label="Download"
          placement="bottom-start"
          isOpen={isDownloadTooltipOpen}
          onClose={handleDownloadMouseLeave}
        >
          <Box onMouseEnter={handleDownloadMouseEnter} onMouseLeave={handleDownloadMouseLeave}>
            <AppIconButton
              aria-label="next"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name="download"
                  width="12px"
                  height="15px"
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={onClickDownloadHandler}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
        <AppTooltip
          label="Resolve"
          placement="bottom-start"
          isOpen={isResolveTooltipOpen}
          onClose={handleResolveMouseLeave}
          display={isOpen ? 'none' : 'block'}
        >
          <Box
            onMouseEnter={handleResolveMouseEnter}
            onMouseLeave={handleResolveMouseLeave}
            zIndex={12}
          >
            <AppPopover
              isOpen={isOpen}
              onClose={onClose}
              trigger="click"
              children={
                <AppIconButton
                  aria-label="resolve"
                  icon={
                    <AppIcon
                      transition="transform 0.25s ease"
                      name="wrench"
                      width="14px"
                      height="14px"
                      fill={blue_500}
                      onClick={() => {
                        onOpen();
                      }}
                    />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={() => {}}
                  bg={ocean_blue_600}
                />
              }
              content={
                <VStack
                  bg={ocean_blue_600}
                  borderRadius="8px"
                  border={`1px solid ${ocean_blue_400}`}
                  boxShadow="0px 12px 20px 0px #001019"
                  h={isForecastAlertType ? '144px' : '120px'}
                  overflow={'hidden'}
                >
                  {getResolvedOption().map((option, index) => (
                    <HStack
                      key={index}
                      h="36px"
                      w="full"
                      spacing="4px"
                      cursor="pointer"
                      _hover={{
                        bg: ocean_blue_400
                      }}
                      px="12px"
                      onClick={() => {}}
                    >
                      <AppText
                        fontSize="12px"
                        size={'body3'}
                        fontWeight={400}
                        lineHeight="18px"
                        color={ocean_blue_200}
                        width={'100%'}
                      >
                        {option.title}
                      </AppText>
                    </HStack>
                  ))}
                </VStack>
              }
              contentStyles={{
                ...optionPopoverStyles,
                maxWidth: `${isForecastAlertType ? '180px' : '210px'}`
              }}
            />
          </Box>
        </AppTooltip>
      </HStack>
    </HStack>
  );
};

export default ActionBar;
