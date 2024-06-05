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
  CartesianGrid
} from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';
import {
  blue_400,
  green_500,
  green_700,
  neutral_600,
  ocean_blue_100,
  ocean_blue_500,
  red_400,
  state_warning,
  yellow_400
} from 'theme/colors';
import { OutlierDetectionChartDataI } from 'types/responses/viewResponses';
import { kFormatWithCommaSeparated } from 'utils/utility';

export interface AreaChartType {
  type: CurveType;
  strokeWidth: string;
  legendType: LegendType;

  actualName: string;
  actualDataKey: string;
  actualFill: string;
  actualStroke: string;
}

interface OutlierDetectionChartProps {
  reportData: OutlierDetectionChartDataI[];
  chartHeight?: string;
  xAxis?: string;
  yAxis?: string;
}

const OutlierDetectionChart: FC<OutlierDetectionChartProps> = ({ reportData }) => {
  const interval = reportData.length > 5 ? Math.floor(reportData.length / 5) : 0;

  const chartProps = [
    {
      key: 'actual',
      displayName: 'Actual'
    },
    {
      key: 'adjusted',
      displayName: 'Adjusted'
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
            return (
              <Fragment key={key}>
                {pointPayload[chartProp.key] && (
                  <HStack justify="space-between">
                    <AppText color={ocean_blue_100} size="caption">
                      {chartProp.displayName}
                    </AppText>
                    <AppText color={ocean_blue_100} size="caption">
                      {pointPayload[chartProp.key] ? pointPayload[chartProp.key].toFixed(2) : null}
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
    const { payload } = props;
    return (
      <HStack w="full" spacing="20px" pl="25px" mt="-40px">
        <HStack>
          <>
            <Box
              w="12px"
              h="12px"
              borderRadius="2px"
              bg={`linear-gradient(180deg, ${green_700} 0%, ${green_500} 100%)`}
            ></Box>
            <AppText color={yellow_400} size="body2">
              Actual
            </AppText>
          </>
        </HStack>
        <HStack>
          <Box
            w="12px"
            h="12px"
            borderRadius="2px"
            bg={`linear-gradient(180deg, ${red_400} 0%, ${state_warning} 100%)`}
          ></Box>
          <AppText color={blue_400} size="body2">
            Adjusted
          </AppText>
        </HStack>
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
          dot={{
            stroke: params.actualStroke,
            fill: params.actualStroke,
            strokeWidth: 1,
            r: 2,
            strokeDasharray: ''
          }}
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
            fontWeight: 500,
            marginLeft: '-30px',
            marginTop: '2px'
          }}
        >
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={green_700} stopOpacity={0.2} />
              <stop offset="95%" stopColor={green_500} stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={red_400} stopOpacity={0.2} />
              <stop offset="95%" stopColor={state_warning} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" height={80} interval={interval} />
          <CartesianGrid stroke={neutral_600} strokeDasharray="3 3" horizontal={false} />
          <YAxis
            domain={[
              0,
              (dataMax: number) => {
                if (dataMax > 1000) {
                  return dataMax + 1000;
                } else if (dataMax > 100) {
                  return dataMax + 100;
                } else {
                  return Math.ceil(dataMax);
                }
              }
            ]}
            tickFormatter={(label) => kFormatWithCommaSeparated(label)}
            allowDecimals={false}
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

            actualFill: 'url(#colorUv)',
            actualName: 'sku_actual',
            actualDataKey: 'actual',
            actualStroke: green_700
          })}

          {drawAreaChart({
            type: 'monotone',
            strokeWidth: '2px',
            legendType: 'circle',

            actualFill: 'url(#colorPv)',
            actualName: 'compare_actual',
            actualDataKey: 'adjusted',
            actualStroke: red_400
          })}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OutlierDetectionChart;
