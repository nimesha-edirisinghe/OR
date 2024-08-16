import { Box, Flex, HStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { CSSProperties, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  dfViewSliceSelector,
  toggleGraphPanel
} from 'state/pages/view/demandForecastView/dfViewPageState';
import ForecastChartNavigator from './ForecastChartNavigator';
import { DemandForecastSkuListItem } from 'types/responses/viewResponses';
import { Navigator } from 'hooks/useNavigator';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import useTooltip from 'hooks/useTooltip';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { blue_500, ocean_blue_400, ocean_blue_600, yellow_500 } from 'theme/colors';
import {
  setOriginPage,
  setSelectedAnalyzerType
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { AccessPermissionEnum, FCAnalyzerTypeEnum, MenuItems } from 'utils/enum';
import { useNavigate } from 'react-router-dom';
import AppPopover from 'components/AppPopover/AppPopover';
import PopoverContent, {
  editedPopoverStyles
} from '../DemandForecasting/MainSection/ControlPanel/PopoverContent';
import MoreOptionContent from './MoreOptionContent';
import useAccessType from 'hooks/useMenuAccessType';
import { hasAccessPermission } from 'utils/permissions';

const optionPopoverStyles: CSSProperties = {
  maxWidth: '180px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

interface ForecastChartHeaderProps {
  graphNavigator: Navigator<DemandForecastSkuListItem>;
  onTrainingSummaryHandler: () => void;
}
const ForecastChartHeader: FC<ForecastChartHeaderProps> = ({
  graphNavigator,
  onTrainingSummaryHandler
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dfViewState = useSelector(dfViewSliceSelector);
  const graphData = dfViewState.graphData;
  const isGraphPanelOpen = dfViewState.isGraphPanelOpen;
  const [isSettingTooltipOpen, handleSettingMouseEnter, handleSettingMouseLeave] = useTooltip();
  const [isTooltipOpen, handleMouseEnter, handleMouseLeave] = useTooltip();
  const [isPopOverOpen, handleMouseEnterPopOver, handleMouseLeavePopOver] = useTooltip();
  const [isResolveTooltipOpen, handleResolveMouseEnter, handleResolveMouseLeave] = useTooltip();
  const { isOpen: isOpen, onToggle: onOpen, onClose: onClose } = useDisclosure();
  const isEdited = graphData?.some((item) => item.isEdited === 1) || false;
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const totalSkuCount = dfViewState.skuListData?.totalCount;

  const accessType = useAccessType(MenuItems.STORE_FORECASTS);
  const isDisabled = !hasAccessPermission(accessType, [AccessPermissionEnum.EDIT]);

  const validateHandler = () => {
    navigate('/app/demand-forecast/individual-forecast-analyser');
    dispatch(setOriginPage('df'));
    dispatch(setSelectedAnalyzerType(FCAnalyzerTypeEnum.INDIVIDUAL));
    if (isGraphPanelOpen) dispatch(toggleGraphPanel());
  };

  return (
    <Flex p="12px" w="full" gap="8px" align="center">
      <ForecastChartNavigator
        graphNavigator={graphNavigator}
        isAllSkuSelected={isAllSkuSelected}
        totalSkuCount={totalSkuCount!}
      />
      <Box h="28px" w="1px" bg={'rgba(26, 52, 69, 1)'}></Box>
      <HStack justify="space-between" w="full">
        <HStack>
          <AppText size="h4Semibold">
            {`${dfViewState.selectedSku?.sku} | ${dfViewState.selectedSku?.store}`}
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
        <HStack spacing="8px"></HStack>
      </HStack>

      <HStack ml={'auto'}>
        <AppTooltip
          label="Validate"
          placement="bottom-start"
          isOpen={isTooltipOpen}
          onClose={handleMouseLeave}
        >
          <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <AppIconButton
              aria-label="validate"
              icon={<AppIcon transition="transform 0.25s ease" name="validate" fill={blue_500} />}
              variant="secondary"
              size="iconMedium"
              onClick={validateHandler}
              bg={ocean_blue_600}
              isDisabled={!!!dfViewState.selectedSku?.isAnchorModel}
            />
          </Box>
        </AppTooltip>

        <AppTooltip
          label="Training Summary"
          placement="bottom-start"
          isOpen={isSettingTooltipOpen}
          onClose={handleSettingMouseLeave}
        >
          <Box onMouseEnter={handleSettingMouseEnter} onMouseLeave={handleSettingMouseLeave}>
            <AppIconButton
              aria-label="setting"
              icon={<AppIcon transition="transform 0.25s ease" name={'setting'} fill={blue_500} />}
              variant="secondary"
              size="iconMedium"
              onClick={onTrainingSummaryHandler}
              bg={ocean_blue_600}
              isDisabled={!!!dfViewState.selectedSku?.isAnchorModel}
            />
          </Box>
        </AppTooltip>
        <AppTooltip
          label="Options"
          placement="bottom-start"
          isOpen={isResolveTooltipOpen}
          onClose={handleResolveMouseLeave}
          display={isOpen ? 'none' : 'block'}
        >
          <Box
            onMouseEnter={handleResolveMouseEnter}
            onMouseLeave={handleResolveMouseLeave}
            // zIndex={12}
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
                      name={'wrench'}
                      fill={blue_500}
                      onClick={() => {
                        onOpen();
                      }}
                    />
                  }
                  variant="secondary"
                  size="iconMedium"
                  onClick={() => {
                    onOpen();
                  }}
                  bg={ocean_blue_600}
                  isDisabled={!!!dfViewState.selectedSku?.isAnchorModel || isDisabled}
                />
              }
              content={<MoreOptionContent />}
              contentStyles={optionPopoverStyles}
            />
          </Box>
        </AppTooltip>
      </HStack>
    </Flex>
  );
};

export default ForecastChartHeader;
