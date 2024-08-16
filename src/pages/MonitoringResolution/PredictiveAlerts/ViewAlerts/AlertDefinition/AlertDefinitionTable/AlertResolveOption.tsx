import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopover from 'components/AppPopover/AppPopover';
import AppText from 'components/AppText/AppText';
import { CSSProperties, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  alertForecastChartRequest,
  getPredictorsRequest,
  setGraphPanelEditable,
  setSelectedSkuAction,
  toggleGraphPanel,
  toggleReplenishmentPanel,
  getRplPlanDetailsRequest,
  getAlertTypeRequest,
  setReplenishmentEditable,
  setAlertSelectionOption
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { selectGroupKey } from 'state/pages/shared/groupConfig/groupConfigState';
import { neutral_200, ocean_blue_200, ocean_blue_400, ocean_blue_600, white } from 'theme/colors';
import { AlertSelectionEnum } from 'utils/enum';

interface AlertResolveOptionProps {
  anchorProdModelKey: number;
  groupKey: string;
  onMouseLeave: () => void;
  onResolvePopUp: (flag: boolean) => void;
  isDisabled?: boolean;
}

interface optionI {
  title: string;
  isEnabled: boolean;
}

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

const options: optionI[] = [
  {
    title: 'View Forecast',
    isEnabled: true
  },
  {
    title: 'Edit Forecast',
    isEnabled: true
  },
  {
    title: 'Adjust to Threshold',
    isEnabled: false
  },
  {
    title: 'Ignore alert',
    isEnabled: false
  },
  {
    title: 'Report alert',
    isEnabled: false
  }
];

const replenishmentOptions: optionI[] = [
  {
    title: 'View Repl. Schedule',
    isEnabled: true
  },
  {
    title: 'Edit Repl. Schedule',
    isEnabled: true
  },
  {
    title: 'Ignore alert',
    isEnabled: false
  },
  {
    title: 'Report alert',
    isEnabled: false
  }
];

const AlertResolveOption: FC<AlertResolveOptionProps> = ({
  anchorProdModelKey,
  groupKey,
  onMouseLeave,
  onResolvePopUp,
  isDisabled = false
}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;
  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();
  const dispatch = useDispatch();

  const onPopUpClose = () => {
    onClose();
  };

  const requestViewForecastChart = (
    anchorProdModelKey: number,
    index: number,
    groupKey: string
  ) => {
    dispatch(setAlertSelectionOption(AlertSelectionEnum.INDIVIDUAL));
    dispatch(setSelectedSkuAction(anchorProdModelKey));
    dispatch(alertForecastChartRequest({ chartType: alertState.selectedChartType }));
    dispatch(getPredictorsRequest());
    dispatch(getAlertTypeRequest());
    dispatch(toggleGraphPanel());
    dispatch(setGraphPanelEditable(index === 1));
    dispatch(selectGroupKey(groupKey.toString()));
  };

  const requestViewReplenishment = (option: optionI, anchorProdModelKey: number) => {
    const editableFlag: boolean =
      option.isEnabled && option.title === replenishmentOptions[1].title;
    dispatch(setAlertSelectionOption(AlertSelectionEnum.INDIVIDUAL));
    dispatch(setReplenishmentEditable(editableFlag));
    dispatch(setSelectedSkuAction(anchorProdModelKey));
    dispatch(getAlertTypeRequest());
    dispatch(getRplPlanDetailsRequest());
    dispatch(toggleReplenishmentPanel());
  };

  const onResolvePopUpClose = () => {
    onPopUpClose();
    onMouseLeave();
    onResolvePopUp(false);
  };

  const renderGrowthAndDeGrowthOption = () => {
    return (
      <Box>
        <AppPopover
          isOpen={isOpen}
          onClose={onResolvePopUpClose}
          trigger="click"
          children={
            <AppIcon
              transition="transform 0.25s ease"
              name="wrench"
              width="14px"
              height="14px"
              fill={neutral_200}
              cursor={isDisabled ? 'not-allowed' : 'pointer'}
              opacity={isDisabled ? 0.3 : 1}
              onClick={() => {
                if (!isDisabled) {
                  onOpen();
                  onResolvePopUp(true);
                }
              }}
            />
          }
          content={
            <VStack
              bg={ocean_blue_600}
              borderRadius="8px"
              border={`1px solid ${ocean_blue_400}`}
              boxShadow="0px 12px 20px 0px #001019"
              h={'180px'}
              overflow={'hidden'}
            >
              {options.map((option, idx) => (
                <HStack
                  key={idx}
                  h="36px"
                  w="full"
                  spacing="4px"
                  cursor="pointer"
                  _hover={{
                    bg: ocean_blue_400
                  }}
                  px="12px"
                  onClick={() => {
                    if (option.isEnabled)
                      requestViewForecastChart(anchorProdModelKey, idx, groupKey);
                  }}
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
          contentStyles={optionPopoverStyles}
        />
      </Box>
    );
  };

  const renderReplenishmentOption = () => {
    return (
      <Box>
        <AppPopover
          isOpen={isOpen}
          onClose={onResolvePopUpClose}
          trigger="click"
          children={
            <AppIcon
              transition="transform 0.25s ease"
              name="wrench"
              width="14px"
              height="14px"
              fill={neutral_200}
              onClick={() => {
                onOpen();
                onResolvePopUp(true);
              }}
            />
          }
          content={
            <VStack
              bg={ocean_blue_600}
              borderRadius="8px"
              border={`1px solid ${ocean_blue_400}`}
              boxShadow="0px 12px 20px 0px #001019"
              h={'144px'}
              overflow={'hidden'}
            >
              {replenishmentOptions.map((option, idx) => (
                <HStack
                  key={idx}
                  h="36px"
                  w="full"
                  spacing="4px"
                  cursor="pointer"
                  _hover={{
                    bg: ocean_blue_400
                  }}
                  px="12px"
                  onClick={() => {
                    if (option.isEnabled) requestViewReplenishment(option, anchorProdModelKey);
                  }}
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
          contentStyles={optionPopoverStyles}
        />
      </Box>
    );
  };
  const renderResolveOptions = useCallback(() => {
    switch (selectedAlertTypeObj.alertType) {
      case 'growth':
        return renderGrowthAndDeGrowthOption();
      case 'degrowth':
        return renderGrowthAndDeGrowthOption();
      case 'excessstock':
      case 'expirationrisk':
      case 'outofstock':
        return renderReplenishmentOption();
      default:
        return <></>;
    }
  }, [selectedAlertTypeObj, isOpen]);

  return renderResolveOptions();
};

export default AlertResolveOption;
