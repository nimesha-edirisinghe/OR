import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, Fragment } from 'react';
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LegendType,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import {
  blue_500,
  green_300,
  green_500,
  green_700,
  neutral_600,
  ocean_blue_100,
  ocean_blue_300,
  ocean_blue_500,
  red_300,
  yellow_300,
  yellow_500
} from 'theme/colors';
import { kFormatWithCommaSeparated } from 'utils/utility';
import { getTooltipLegendColor } from './helper';

export interface AreaChartType {
  type: CurveType;
  strokeWidth: string;
  legendType: LegendType;

  actualName: string;
  actualDataKey: string;
  actualFill: string;
  actualStroke: string;
}

interface FCAnalyzerChartProps {
  reportData: any[];
  minValue?: number | null;
  maxValue?: number | null;
  visibleAvgSalesLegend?: boolean;
}

const FCAnalyzerChart: FC<FCAnalyzerChartProps> = ({
  reportData,
  minValue,
  maxValue,
  visibleAvgSalesLegend = false
}) => {
  const interval = reportData.length > 10 ? Math.floor(reportData.length / 10) : 0;

  const chartProps = [
    {
      key: 'actual',
      displayName: 'Actual'
    },
    {
      key: 'forecasted',
      displayName: 'Forecasted'
    },
    {
      key: 'avgSales',
      displayName: 'Historical avg. sales for similar discounts'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pointPayload = JSON.parse(`${JSON.stringify(payload[0].payload)}`);

      return (
        <Box borderRadius="0px 8px 8px 8px" bg={ocean_blue_500} px="10px" py="6px">
          <AppText color={ocean_blue_100} size="caption">
            {label}
          </AppText>

          {chartProps.map((chartProp: any, key: number) => {
            const legendColor = getTooltipLegendColor(chartProp.key);
            return (
              <Fragment key={key}>
                {pointPayload[chartProp.key] && (
                  <HStack>
                    <Box w="4px" h="4px" borderRadius="1px" bg={legendColor} />
                    <HStack justify="space-between" w="full">
                      <AppText color={ocean_blue_100} size="caption">
                        {chartProp.displayName}
                      </AppText>
                      <AppText color={ocean_blue_100} size="caption">
                        {pointPayload[chartProp.key]
                          ? pointPayload[chartProp.key].toFixed(2)
                          : null}
                      </AppText>
                    </HStack>
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
    const { payload } = props;
    return (
      <HStack w="full" spacing="20px" pl="25px" mt="-40px">
        <HStack>
          <>
            <Box
              w="12px"
              h="12px"
              borderRadius="2px"
              bg="linear-gradient(180deg, #F8705E 0%, #FFA914 100%)"
            ></Box>
            <AppText color={ocean_blue_100} size="caption">
              Actual
            </AppText>
          </>
        </HStack>
        <HStack>
          <Box
            w="12px"
            h="12px"
            borderRadius="2px"
            bg="linear-gradient(180deg, #0560B7 0%, #0AA5FF 100%)"
          ></Box>
          <AppText color={ocean_blue_100} size="caption">
            Forecasted
          </AppText>
        </HStack>
        {visibleAvgSalesLegend && (
          <HStack>
            <Box
              w="12px"
              h="12px"
              borderRadius="2px"
              bg="linear-gradient(180deg, #0AB726 0%, #75D785 100%)"
            ></Box>
            <AppText color={ocean_blue_100} size="caption">
              Historical avg. sales for similar discounts
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
          type={params.type}
          strokeWidth={params.strokeWidth}
          legendType={params.legendType}
          dataKey={params.actualDataKey}
          fill={params.actualFill}
          stroke={params.actualStroke}
          name={params.actualName}
          // dot={{
          //   stroke: params.actualStroke,
          //   fill: params.actualStroke,
          //   strokeWidth: 1,
          //   r: 2,
          //   strokeDasharray: ''
          // }}
        />
      </>
    );
  };

  return (
    <Box h="full" w="full">
      <ResponsiveContainer minWidth="100%" minHeight="100%">
        <ComposedChart
          //@ts-ignore
          overflow="visible"
          data={reportData}
          style={{
            fontSize: '10px',
            fontWeight: 400,
            marginLeft: '-30px',
            marginTop: '2px'
          }}
        >
          <defs>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={yellow_500} stopOpacity={0.2} />
              <stop offset="95%" stopColor={yellow_300} stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorForecasted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0AA5FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#47C6FF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorAvgSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={green_700} stopOpacity={0.2} />
              <stop offset="95%" stopColor={green_500} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            height={80}
            interval={interval}
            tick={{ fill: ocean_blue_300 }}
            axisLine={{ stroke: ocean_blue_300 }}
            label={{
              value: 'past 8 weeks',
              position: 'insideTopRight',
              fill: ocean_blue_300,
              fontSize: '10px',
              offset: -10
            }}
            tickLine={false}
          />
          <CartesianGrid stroke={ocean_blue_300} strokeDasharray="3 3" horizontal={false} />
          <YAxis
            domain={maxValue ? [0, maxValue] : undefined}
            tickFormatter={(label) => kFormatWithCommaSeparated(label)}
            allowDecimals={false}
            tick={{ fill: ocean_blue_300 }}
            axisLine={{ stroke: ocean_blue_300 }}
            label={{
              value: 'Units',
              position: 'insideTopRight',
              fill: ocean_blue_300,
              fontSize: '10px',
              angle: -90,
              offset: -2
            }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#2D2D2D', fontSize: '11px' }}
            content={<CustomTooltip />}
          />
          <Legend iconSize={12} verticalAlign="bottom" content={<RenderLegend />} />
          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',
            actualFill: 'url(#colorActual)',
            actualName: 'actual',
            actualDataKey: 'actual',
            actualStroke: yellow_500
          })}

          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',
            actualFill: 'url(#colorForecasted)',
            actualName: 'forecasted',
            actualDataKey: 'forecasted',
            actualStroke: blue_500
          })}
          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',
            actualFill: 'url(#colorAvgSales)',
            actualName: 'avgSales',
            actualDataKey: 'avgSales',
            actualStroke: green_700
          })}
          <ReferenceLine
            y={maxValue!}
            stroke={green_300}
            strokeDasharray="4 4"
            label={{
              position: 'insideBottomRight',
              value: 'Historical Max',
              fill: neutral_600,
              fontWeight: 400,
              fontSize: '10px'
            }}
          />
          <ReferenceLine
            y={minValue!}
            stroke={red_300}
            strokeDasharray="4 4"
            label={{
              position: 'insideBottomRight',
              value: 'Historical Min',
              fill: neutral_600,
              fontWeight: 400,
              fontSize: '10px'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FCAnalyzerChart;
