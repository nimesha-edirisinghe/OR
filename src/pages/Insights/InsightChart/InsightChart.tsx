import { Box } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { InsightReportDataI } from 'types/insight';
import { kFormatWithCommaSeparated, numberWithCommas } from 'utils/utility';

interface InsightChartProps {
  reportData: InsightReportDataI[];
  actualDataKey: string;
  projectionDataKey: string;
  isEnableBenchmark: boolean;
  benchmarkDataKey?: string;
  benchmarkName?: string;
  leftMenuOpenWidth?: string;
}

const InsightChart: FC<InsightChartProps> = ({
  reportData,
  actualDataKey,
  projectionDataKey,
  isEnableBenchmark,
  benchmarkDataKey,
  benchmarkName,
  leftMenuOpenWidth = 'calc(((100vw - 468px)/2))'
}) => {
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box borderRadius="3px" border="0.5px solid #DEDEDE" bg="#000" px="10px" py="6px">
          <AppText color="#fff">{label}</AppText>
          {payload.map((val: any, key: number) => {
            if (!payload[key].payload.is_merge_point) {
              return (
                <AppText
                  color="#F7CC45"
                  key={key}
                  fontSize="10px"
                  fontWeight={400}
                  letterSpacing="0.5px"
                >
                  {payload[key].name}: {numberWithCommas(payload[key].value)}
                </AppText>
              );
            } else {
              if (payload[key].name !== 'Actuals') {
                return (
                  <AppText
                    color="#F7CC45"
                    key={key}
                    fontSize="10px"
                    fontWeight={400}
                    letterSpacing="0.5px"
                  >
                    {payload[key].name}: {numberWithCommas(payload[key].value)}
                  </AppText>
                );
              }
            }
          })}
        </Box>
      );
    }

    return null;
  };

  return (
    <Box h="full" w={isLeftMenuOpen ? leftMenuOpenWidth : ''} transition="width .2s ease-in">
      <ResponsiveContainer minWidth="100%" height="100%">
        <ComposedChart
          data={reportData}
          margin={{
            top: 22,
            right: 20,
            bottom: 6,
            left: 0
          }}
          style={{
            fontSize: '10px',
            fontWeight: 500
          }}
        >
          <XAxis dataKey="date" height={80} angle={-45} textAnchor="end" domain={[]} />
          <YAxis
            domain={[
              0,
              (dataMax: number) => {
                if (dataMax > 1000) {
                  return dataMax + 1000;
                } else if (dataMax > 100) {
                  return dataMax + 100;
                } else {
                  return dataMax;
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
          <Legend
            iconSize={12}
            margin={{
              top: 100
            }}
          />
          <Area
            type="monotone"
            dataKey={actualDataKey}
            fill="#ADADAD"
            stroke="#ADADAD"
            name={'Actuals'}
            legendType="circle"
          />
          <Area
            type="monotone"
            dataKey={projectionDataKey}
            fill="#9FF0A0"
            stroke="#9FF0A0"
            name={'Projected'}
            legendType="circle"
          />
          {isEnableBenchmark && (
            <Line
              type="monotone"
              dataKey={benchmarkDataKey}
              stroke="#DB880E"
              strokeDasharray="3 3"
              name={benchmarkName}
              legendType="plainline"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InsightChart;
