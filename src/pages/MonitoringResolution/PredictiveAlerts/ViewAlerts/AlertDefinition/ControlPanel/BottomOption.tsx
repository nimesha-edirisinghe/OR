import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { CSSProperties, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blue_500, ocean_blue_200, ocean_blue_400, ocean_blue_600, yellow_500 } from 'theme/colors';
import AppPopover from 'components/AppPopover/AppPopover';
import PopoverContent, { editedPopoverStyles } from './PopoverContent';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import useTooltip from 'hooks/useTooltip';
import {
  alertForecastChartRequest,
  alertSliceSelector,
  getPredictorsRequest,
  getTrainingSummaryDataRequest,
  resetSelectedSkuList,
  setGraphPanelEditable,
  setSelectedSkuByIndexAction,
  toggleGraphPanel,
  toggleTrainingPanel
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import ForecastChartNavigator from '../AlertForecastChart/ForecastChartNavigator';
import useNavigator from 'hooks/useNavigator';
import { useNavigate } from 'react-router-dom';
import {
  setOriginPage,
  setSelectedAnalyzerType
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { FCAnalyzerTypeEnum } from 'utils/enum';
import usePrevious from 'hooks/usePrevious';

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

interface OptionI {
  title: string;
  isEnabled: boolean;
}

const options: OptionI[] = [
  {
    title: 'Edit this Forecast',
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
    title: 'Report',
    isEnabled: false
  }
];

interface BottomOptionProps {}
const BottomOption: FC<BottomOptionProps> = () => {
  const alertState = useSelector(alertSliceSelector);
  const graphData = alertState.graphData;
  const dispatch = useDispatch();
  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();
  const [isPopOverOpen, handleMouseEnterPopOver, handleMouseLeavePopOver] = useTooltip();
  const [isTrainingSummaryOpen, handleTrainingSummaryMouseEnter, handleTrainingSummaryMouseLeave] =
    useTooltip();
  const [isForecastOpen, handleForecastMouseEnter, handleForecastMouseLeave] = useTooltip();
  const [isResolveOpen, handleResolveExpandMouseEnter, handleResolveExpandMouseLeave] =
    useTooltip();
  const onTrainingSummaryHandler = () => {
    dispatch(getTrainingSummaryDataRequest());
    dispatch(toggleGraphPanel());
    dispatch(toggleTrainingPanel());
  };
  const navigate = useNavigate();
  const alertSelectionOption = alertState.alertLocalScope.selectedOption;

  const selectedSku = alertState?.selectedSku!;
  const selectedSkuList =
    alertSelectionOption === 'multiple' ? alertState.selectedSkuList : [selectedSku];
  const previousSelectedSkuList = usePrevious(selectedSkuList);
  const graphNavigator = useNavigator(selectedSkuList);
  const isEdited = graphData?.some((item) => item.isEdited === 1) || false;
  const isDisabled = alertState.isGraphModalEditable;
  const aggregateOption = alertState.aggregateOption;

  const requestViewForecastChart = (currentStepIndex?: number) => {
    dispatch(
      setSelectedSkuByIndexAction(
        currentStepIndex !== undefined ? currentStepIndex : graphNavigator.currentStepIndex
      )
    );
    dispatch(alertForecastChartRequest({ chartType: aggregateOption.selectedAggregateOption! }));
    dispatch(getPredictorsRequest());
  };

  useEffect(() => {
    if (
      selectedSkuList &&
      previousSelectedSkuList &&
      previousSelectedSkuList.length &&
      selectedSkuList.length === previousSelectedSkuList.length
    ) {
      requestViewForecastChart();
    }
  }, [graphNavigator.currentStepIndex]);

  const onClickValidate = () => {
    navigate('/app/demand-forecast/individual-forecast-analyser');
    dispatch(resetSelectedSkuList());
    dispatch(toggleGraphPanel());
    dispatch(setOriginPage('alert'));
    dispatch(setGraphPanelEditable(true));
    dispatch(setSelectedAnalyzerType(FCAnalyzerTypeEnum.INDIVIDUAL));
  };

  const executeOption = (option: OptionI) => {
    if (option.title === options[0].title) dispatch(setGraphPanelEditable(true));
  };

  return (
    <>
      <HStack w="full">
        <ForecastChartNavigator graphNavigator={graphNavigator} />
        <Box h={'28px'} w={'1px'} bg={ocean_blue_400}></Box>
        <HStack>
          <AppText size="h4Semibold">
            {`${alertState.selectedSku?.skuNameCode} | ${alertState.selectedSku?.store}`}
          </AppText>
          {isEdited && (
            <AppPopover
              isOpen={isPopOverOpen}
              onClose={handleMouseLeavePopOver}
              contentStyles={editedPopoverStyles}
              trigger="hover"
              children={
                <AppIcon
                  fill={yellow_500}
                  name="infoCircle"
                  onMouseEnter={handleMouseEnterPopOver}
                  onMouseLeave={handleMouseLeavePopOver}
                  w="20px"
                  h="20px"
                />
              }
              content={<PopoverContent content="This forecast has been manually overridden" />}
            />
          )}
        </HStack>
      </HStack>
      <HStack>
        <AppTooltip
          label="Validate"
          placement="bottom-start"
          isOpen={isForecastOpen}
          onClose={handleForecastMouseLeave}
        >
          <Box onMouseEnter={handleForecastMouseEnter} onMouseLeave={handleForecastMouseLeave}>
            <AppIconButton
              aria-label="validate"
              icon={<AppIcon transition="transform 0.25s ease" name={'validate'} fill={blue_500} />}
              variant="secondary"
              size="iconMedium"
              onClick={onClickValidate}
              bg={ocean_blue_600}
              isDisabled={isDisabled}
            />
          </Box>
        </AppTooltip>
        <AppTooltip
          label="Training Summary"
          placement="bottom-start"
          isOpen={isTrainingSummaryOpen}
          onClose={handleTrainingSummaryMouseLeave}
        >
          <Box
            onMouseEnter={handleTrainingSummaryMouseEnter}
            onMouseLeave={handleTrainingSummaryMouseLeave}
          >
            <AppIconButton
              aria-label="setting"
              icon={<AppIcon transition="transform 0.25s ease" name={'setting'} fill={blue_500} />}
              variant="secondary"
              size="iconMedium"
              onClick={onTrainingSummaryHandler}
              bg={ocean_blue_600}
              isDisabled={isDisabled}
            />
          </Box>
        </AppTooltip>
        <AppTooltip
          label="Options"
          placement="bottom-start"
          isOpen={isResolveOpen}
          onClose={handleResolveExpandMouseLeave}
          display={isOpen ? 'none' : 'block'}
        >
          <Box
            onMouseEnter={handleResolveExpandMouseEnter}
            onMouseLeave={handleResolveExpandMouseLeave}
          >
            <AppPopover
              isOpen={isOpen}
              onClose={onClose}
              trigger="click"
              children={
                <AppIconButton
                  aria-label="options"
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
                  isDisabled={isDisabled}
                />
              }
              content={
                <VStack
                  bg={ocean_blue_600}
                  borderRadius="8px"
                  border={`1px solid ${ocean_blue_400}`}
                  h={'144px'}
                  boxShadow="0px 12px 20px 0px #001019"
                  overflow={'hidden'}
                >
                  {options.map((option: OptionI, index) => {
                    if (
                      !!!alertState.AlertType.alertTypeDisplayName?.length &&
                      option.title === 'Ignore alert'
                    )
                      return null;
                    return (
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
                        onClick={() => executeOption(option)}
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
                    );
                  })}
                </VStack>
              }
              contentStyles={optionPopoverStyles}
            />
          </Box>
        </AppTooltip>
      </HStack>
    </>
  );
};

export default BottomOption;
