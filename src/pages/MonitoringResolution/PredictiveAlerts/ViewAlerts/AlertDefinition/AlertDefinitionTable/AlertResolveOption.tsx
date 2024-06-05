import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppPopover from 'components/AppPopover/AppPopover';
import AppText from 'components/AppText/AppText';
import { CSSProperties, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAlert,
  alertSliceSelector,
  AlertForecastChartRequest,
  getPredictorsRequest,
  setGraphPanelEditable,
  setSelectedSkuAction,
  toggleGraphPanel,
  toggleReplenishmentPanel,
  getRplPlanDetailsRequest,
  getAlertTypeRequest,
  setReplenishmentEditable
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import { selectGroupKey } from 'state/pages/shared/groupConfig/groupConfigState';
import { neutral_200, ocean_blue_200, ocean_blue_400, ocean_blue_600, white } from 'theme/colors';

interface AlertResolveOptionProps {
  id: number;
  groupKey: string;
  onMouseLeave: () => void;
  onResolvePopUp: (flag: boolean) => void;
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
  id,
  groupKey,
  onMouseLeave,
  onResolvePopUp
}) => {
  const alertState: IAlert = useSelector(alertSliceSelector);
  const selectedAlertTypeObj = alertState.alertLocalScope.selectedAlertTypeObj;
  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();
  const dispatch = useDispatch();

  const onPopUpClose = () => {
    onClose();
  };

  const requestViewForecastChart = (id: number, index: number, groupKey: string) => {
    dispatch(setSelectedSkuAction(id));
    dispatch(AlertForecastChartRequest({ chartType: alertState.selectedChartType }));
    dispatch(getPredictorsRequest());
    dispatch(getAlertTypeRequest());
    dispatch(toggleGraphPanel());
    dispatch(setGraphPanelEditable(index === 1));
    dispatch(selectGroupKey(groupKey.toString()));
  };

  const requestViewReplenishment = (option: optionI, anchorProdKey: number) => {
    const editableFlag: boolean =
      option.isEnabled && option.title === replenishmentOptions[1].title;
    dispatch(setReplenishmentEditable(editableFlag));

    dispatch(setSelectedSkuAction(anchorProdKey));
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
                    if (option.isEnabled) requestViewForecastChart(id, idx, groupKey);
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
                    if (option.isEnabled) requestViewReplenishment(option, id);
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
