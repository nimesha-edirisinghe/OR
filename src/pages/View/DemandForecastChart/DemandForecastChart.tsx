import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LegendType,
  CartesianGrid
} from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { dfViewSliceSelector } from 'state/pages/view/demandForecastView/dfViewPageState';
import { getSelectedChartName } from 'state/pages/view/demandForecastView/stateHelpers/stH_DfView';
import {
  blue_400,
  blue_500,
  neutral_600,
  ocean_blue_100,
  ocean_blue_350,
  ocean_blue_500,
  yellow_400,
  yellow_500
} from 'theme/colors';
import { DemandForecastChartResponseDataI } from 'types/responses/viewResponses';
import { demandForecastChartType } from 'types/view';
import { kFormatWithCommaSeparated } from 'utils/utility';

export interface AreaChartType {
  type: CurveType;
  strokeWidth: string;
  legendType: LegendType;

  actualName: string;
  actualDataKey: string;
  actualFill: string;
  actualStroke: string;

  projectedName: string;
  projectedDataKey: string;
  projectedFill: string;
  projectedStroke: string;
  yAxisId: 'right' | 'left';
}

interface DemandForecastChartProps {
  reportData: DemandForecastChartResponseDataI[];
  selectedChartType: demandForecastChartType;
  chartHeight?: string;
  xAxis?: string;
  yAxis?: string;
}

const DemandForecastChart: FC<DemandForecastChartProps> = ({
  reportData,
  selectedChartType,
  chartHeight = 'calc(100vh/3)'
}) => {
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;
  const dfViewState = useSelector(dfViewSliceSelector);
  const aggregateOption = dfViewState.aggregateOption;
  const predictorList = dfViewState.predictorList;
  const [compareGraphName, setCompareGraphName] = useState<string | null>(null);
  const interval = reportData.length > 12 ? Math.floor(reportData.length / 12) : 0;

  const chartProps = [
    {
      actualKey: 'skuActual',
      projectedKey: 'skuProjected',
      mergePoint: 'isSKUMergePoint',
      displayName: 'SKU Forecast'
    },
    {
      actualKey: 'compareActual',
      projectedKey: 'compareProjected',
      mergePoint: 'isCompareMergePoint',
      displayName: compareGraphName
    }
  ];

  useEffect(() => {
    const _selectedCName = getSelectedChartName(selectedChartType, aggregateOption, predictorList);
    setCompareGraphName(_selectedCName);
  }, [selectedChartType]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pointPayload = JSON.parse(`${JSON.stringify(payload[0].payload)}`);
      return (
        <Box borderRadius="0px 8px 8px 8px" bg={ocean_blue_500} px="10px" py="6px">
          <AppText color={ocean_blue_100} size="caption">
            {label}
          </AppText>

          {chartProps.map((chartProp: any, key: number) => {
            return (
              <Fragment key={key}>
                {pointPayload[chartProp.actualKey] !== null && (
                  <HStack justify="space-between">
                    <AppText color={ocean_blue_100} size="caption">
                      {chartProp.displayName} Actual
                    </AppText>
                    <AppText color={ocean_blue_100} size="caption">
                      {pointPayload[chartProp.actualKey]}
                    </AppText>
                  </HStack>
                )}
                {pointPayload[chartProp.projectedKey] !== null &&
                  !pointPayload[chartProp.mergePoint] && (
                    <HStack justify="space-between">
                      <AppText color={ocean_blue_100} size="caption">
                        {chartProp.displayName} Projected
                      </AppText>
                      <AppText color={ocean_blue_100} size="caption">
                        {pointPayload[chartProp.projectedKey]}
                      </AppText>
                    </HStack>
                  )}
              </Fragment>
            );
          })}
        </Box>
      );
    }

    return null;
  };

  const RenderLegend = (props: any) => {
    const { payload, cgn } = props;
    const isAggregate: boolean = selectedChartType === 'aggregate';
    return (
      <HStack
        w="full"
        spacing="20px"
        pl={isAggregate ? '10px' : '30px'}
        mb="5px"
        position={'absolute'}
        bottom={7}
      >
        <HStack>
          {selectedChartType !== 'aggregate' && (
            <>
              <Box
                w="12px"
                h="12px"
                borderRadius="2px"
                bg="linear-gradient(180deg, #F8705E 0%, #FFA914 100%)"
              ></Box>
              <AppText color={yellow_400} size="body2">
                SKU Forecast
              </AppText>
            </>
          )}
        </HStack>
        {selectedChartType !== 'sku' && (
          <HStack>
            <Box
              w="12px"
              h="12px"
              borderRadius="2px"
              bg="linear-gradient(180deg, #0560B7 0%, #0AA5FF 100%)"
            ></Box>
            <AppText color={blue_400} size="body2">
              {cgn}
            </AppText>
          </HStack>
        )}
      </HStack>
    );
  };

  const drawAreaChart = (params: AreaChartType) => {
    return (
      <>
        <Area
          yAxisId={params.yAxisId}
          type={params.type}
          strokeWidth={params.strokeWidth}
          legendType={params.legendType}
          dataKey={params.actualDataKey}
          fill={params.actualFill}
          stroke={params.actualStroke}
          name={params.actualName}
          dot={{
            stroke: params.actualStroke,
            fill: params.actualStroke,
            strokeWidth: 1,
            r: 2,
            strokeDasharray: ''
          }}
        />
        <Area
          yAxisId={params.yAxisId}
          type={params.type}
          strokeWidth={params.strokeWidth}
          legendType={params.legendType}
          dataKey={params.projectedDataKey}
          fill={params.projectedFill}
          stroke={params.projectedStroke}
          name={params.projectedName}
          strokeDasharray="3 3"
          dot={{
            stroke: params.projectedStroke,
            fill: params.projectedStroke,
            strokeWidth: 1,
            r: 2,
            strokeDasharray: ''
          }}
        />
      </>
    );
  };

  const getLineStrokeAndGradientColor = (): [string, string] => {
    if (selectedChartType === 'aggregate') {
      return [blue_400, blue_500];
    } else {
      return [yellow_400, yellow_500];
    }
  };

  const [lineColor, startGradientColor] = getLineStrokeAndGradientColor();

  return (
    <Box h={chartHeight} minH="calc(100vh - 370px)" w="100%" position={'relative'}>
      <ResponsiveContainer
        minWidth="calc(100% + 50px)"
        minHeight="100%"
        style={{ margin: '0 -30px' }}
      >
        <ComposedChart
          //@ts-ignore
          overflow="visible"
          data={reportData}
          style={{
            fontSize: '10px',
            fontWeight: 500
          }}
          stroke={ocean_blue_350}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={startGradientColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0AA5FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#47C6FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            height={80}
            domain={[]}
            interval={interval}
            axisLine={{ stroke: ocean_blue_350 }}
            tick={{ fill: ocean_blue_350 }}
          />
          <CartesianGrid stroke={ocean_blue_350} strokeDasharray="3 3" horizontal={false} />
          <YAxis
            tick={{ fill: ocean_blue_350 }}
            axisLine={{ stroke: ocean_blue_350 }}
            yAxisId="left"
            domain={[
              0,
              (dataMax: number) => {
                if (dataMax > 1000) {
                  return dataMax + 1000;
                } else if (dataMax > 100) {
                  return dataMax + 100;
                } else if (dataMax === 0) {
                  return 1;
                } else {
                  return Math.ceil(dataMax);
                }
              }
            ]}
            tickFormatter={(label) => kFormatWithCommaSeparated(label)}
            allowDecimals={false}
          />

          <YAxis
            domain={[
              0,
              (dataMax: number) => {
                if (dataMax > 1000) {
                  return dataMax + 1000;
                } else if (dataMax > 100) {
                  return dataMax + 100;
                } else if (dataMax > 0 && dataMax < 1) {
                  return 1;
                } else if (dataMax === 0) {
                  return 1;
                } else {
                  return Math.ceil(dataMax);
                }
              }
            ]}
            yAxisId="right"
            orientation="right"
            tickFormatter={(label) => kFormatWithCommaSeparated(label)}
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{ backgroundColor: '#2D2D2D', fontSize: '11px' }}
            content={<CustomTooltip />}
          />
          <Legend
            iconSize={12}
            verticalAlign="bottom"
            content={<RenderLegend cgn={compareGraphName} />}
          />
          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',

            actualFill: 'url(#colorUv)',
            actualName: 'sku_actual',
            actualDataKey: 'skuActual',
            actualStroke: lineColor,

            projectedFill: 'url(#colorUv)',
            projectedName: 'sku_projected',
            projectedDataKey: 'skuProjected',
            projectedStroke: lineColor,
            yAxisId: 'left'
          })}

          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',

            actualFill: 'url(#colorPv)',
            actualName: 'compare_actual',
            actualDataKey: 'compareActual',
            actualStroke: blue_400,

            projectedFill: 'url(#colorPv)',
            projectedName: 'compare_projected',
            projectedDataKey: 'compareProjected',
            projectedStroke: blue_400,
            yAxisId:
              selectedChartType === 'influencingFactor' || selectedChartType === 'anchor'
                ? 'right'
                : 'left'
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DemandForecastChart;
