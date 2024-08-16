import { HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alertSliceSelector } from 'state/pages/monitoringAndResolution/Alert/alertState';
import {
  IDFView,
  dfViewSliceSelector,
  updateShouldReloadData
} from 'state/pages/view/demandForecastView/dfViewPageState';
import {
  IForecastAnalyzer,
  forecastAnalyzerSliceSelector
} from 'state/pages/view/forecastAnalyzer/forecastAnalyzerState';
import { blue_500, neutral_100, ocean_blue_600 } from 'theme/colors';
import { FCAnalyzerTypeEnum } from 'utils/enum';

interface FCAnalyzerHeaderProps {}

const FCAnalyzerHeader: FC<FCAnalyzerHeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dfViewState: IDFView = useSelector(dfViewSliceSelector);
  const fcAnalyzerState: IForecastAnalyzer = useSelector(forecastAnalyzerSliceSelector);
  const alertState = useSelector(alertSliceSelector);
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const selectedSkuListLen = dfViewState.selectedSkuList.length;
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const selectedAnalyzerType = fcAnalyzerState.fcAnalyzerLocalScope.selectedAnalyzerType;
  const originPage = fcAnalyzerState.fcAnalyzerLocalScope.originPage;

  const aggregatedCount = isAllSkuSelected ? totalSkuCount : selectedSkuListLen || 0;

  const getAggregatedPageTitle = () => {
    const countStr = aggregatedCount ? aggregatedCount.toLocaleString('en-US') : '';
    const forecastStr = aggregatedCount! > 1 ? 'Forecasts' : 'Forecast';
    return `Collective Summary of ${countStr} ${forecastStr}`;
  };

  const getAlertPageTitle = () => {
    return `${alertState.selectedSku?.skuNameCode} | ${alertState.selectedSku?.store}`;
  };

  const getDefaultPageTitle = () => {
    return `${dfViewState.selectedSku?.sku} | ${dfViewState.selectedSku?.store}`;
  };

  const fcAnalyzerPageTitle =
    selectedAnalyzerType === FCAnalyzerTypeEnum.AGGREGATED
      ? getAggregatedPageTitle()
      : originPage === 'alert'
      ? getAlertPageTitle()
      : getDefaultPageTitle();

  const backHandler = () => {
    if (originPage === 'alert') {
      dispatch(updateShouldReloadData(false));
      navigate('/app/predictive-alerts/definition');
    } else if (originPage === 'demandForecastGrid') {
      dispatch(updateShouldReloadData(false));
      navigate('/app/demand-forecast/view/grid');
    } else {
      dispatch(updateShouldReloadData(false));
      navigate('/app/demand-forecast/view');
    }
  };

  return (
    <HStack
      w="full"
      height="36px"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      justifyContent="space-between"
    >
      <HStack spacing="8px">
        <AppIconButton
          aria-label="next"
          icon={
            <AppIcon
              transition="transform 0.25s ease"
              name="chevronLeft"
              width="7px"
              height="11px"
              fill={blue_500}
            />
          }
          variant="secondary"
          size="iconMedium"
          onClick={backHandler}
          bg={ocean_blue_600}
        />
        <AppText size="h3Semibold" color={neutral_100}>
          {fcAnalyzerPageTitle}
        </AppText>
      </HStack>
    </HStack>
  );
};

export default FCAnalyzerHeader;
