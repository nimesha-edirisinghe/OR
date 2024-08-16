import { Box, HStack, VStack, useDisclosure } from '@chakra-ui/react';
import { CSSProperties, FC, useEffect } from 'react';
import ForecastChartNavigator from '../AlertForecastChart/ForecastChartNavigator';
import AppText from 'components/AppText/AppText';
import AppPopover from 'components/AppPopover/AppPopover';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import {
  blue_500,
  ocean_blue_200,
  ocean_blue_400,
  ocean_blue_500,
  ocean_blue_600,
  yellow_500
} from 'theme/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  alertSliceSelector,
  getRplPlanDetailsRequest,
  setReplenishmentEditable,
  setSelectedSkuByIndexAction,
  toggleReplenishmentPanel
} from 'state/pages/monitoringAndResolution/Alert/alertState';
import useTooltip from 'hooks/useTooltip';
import useNavigator from 'hooks/useNavigator';
import usePrevious from 'hooks/usePrevious';
import ReplEditedPopoverContent, {
  editedReplPopoverStyles
} from 'pages/View/ReplenishmentPlanning/ReplenishmentMainSection/ActionBar/ReplEditedPopoverContent';

interface ControlPanelProps {}

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

const options = [
  {
    title: 'Edit this schedule',
    isEnabled: true
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

const ControlPanel: FC<ControlPanelProps> = () => {
  const alertState = useSelector(alertSliceSelector);
  const dispatch = useDispatch();
  const [isExpandTooltipOpen, handleExpandMouseEnter, handleExpandMouseLeave] = useTooltip();
  const [isTooltipOpen, handleMouseEnter, handleMouseLeave] = useTooltip();
  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();
  const [isResolveOpen, handleResolveExpandMouseEnter, handleResolveExpandMouseLeave] =
    useTooltip();
  const alertSelectionOption = alertState.alertLocalScope.selectedOption!;
  const onClickMinimizeHandler = () => {
    dispatch(toggleReplenishmentPanel());
  };
  const selectedSku = alertState?.selectedSku!;
  const selectedSkuList =
    alertSelectionOption === 'multiple' ? alertState?.selectedSkuList! : [selectedSku];
  const previousSelectedSkuList = usePrevious(selectedSkuList);
  const graphNavigator = useNavigator(selectedSkuList);
  const isEdited = !!alertState.rplPlanDetails?.isEdited;

  const requestViewReplData = (currentStepIndex?: number) => {
    dispatch(
      setSelectedSkuByIndexAction(
        currentStepIndex !== undefined ? currentStepIndex : graphNavigator.currentStepIndex
      )
    );
    dispatch(getRplPlanDetailsRequest());
  };

  useEffect(() => {
    if (
      selectedSkuList &&
      previousSelectedSkuList &&
      previousSelectedSkuList.length &&
      selectedSkuList.length === previousSelectedSkuList.length
    ) {
      requestViewReplData();
    }
  }, [graphNavigator.currentStepIndex]);

  const optionHandler = (option: any) => {
    if (options.length)
      dispatch(setReplenishmentEditable(option.title === options[0].title && options[0].isEnabled));
  };

  return (
    <HStack w={'full'} justify={'space-between'} bg={ocean_blue_500} p={'12px'}>
      <HStack w="full">
        <ForecastChartNavigator graphNavigator={graphNavigator} />
        <Box h={'28px'} w={'1px'} bg={ocean_blue_400}></Box>
        <HStack>
          <AppText size="h4Semibold">
            {`${alertState.selectedSku?.skuNameCode} | ${alertState.selectedSku?.store}`}
          </AppText>
        </HStack>
        {isEdited && (
          <AppPopover
            isOpen={isTooltipOpen}
            onClose={handleMouseLeave}
            contentStyles={editedReplPopoverStyles}
            trigger="hover"
            children={
              <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <AppIcon fill={yellow_500} name="infoCircle" w="20px" h="20px" />
              </Box>
            }
            content={<ReplEditedPopoverContent />}
          />
        )}
      </HStack>
      <HStack>
        <AppTooltip
          label="Resolve"
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
                  aria-label="resolve"
                  icon={
                    <AppIcon
                      transition="transform 0.25s ease"
                      name="wrench"
                      width="14px"
                      height="14px"
                      fill={blue_500}
                    />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={() => {
                    onOpen();
                  }}
                  bg={ocean_blue_600}
                />
              }
              content={
                <VStack
                  bg={ocean_blue_600}
                  borderRadius="8px"
                  border={`1px solid ${ocean_blue_400}`}
                  h={'100px'}
                  boxShadow="0px 12px 20px 0px #001019"
                  overflow={'hidden'}
                >
                  {options.map((option, index) => {
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
                        onClick={() => optionHandler(option)}
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
        <AppTooltip
          label="Collapse"
          placement="bottom-start"
          isOpen={isExpandTooltipOpen}
          onClose={handleExpandMouseLeave}
        >
          <Box onMouseEnter={handleExpandMouseEnter} onMouseLeave={handleExpandMouseLeave}>
            <AppIconButton
              aria-label="maximize"
              icon={
                <AppIcon
                  transition="transform 0.25s ease"
                  name={'collapse'}
                  stroke={blue_500}
                  fill={blue_500}
                />
              }
              variant="secondary"
              size="iconMedium"
              onClick={onClickMinimizeHandler}
              bg={ocean_blue_600}
            />
          </Box>
        </AppTooltip>
      </HStack>
    </HStack>
  );
};

export default ControlPanel;
