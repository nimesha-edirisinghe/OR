import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import { ocean_blue_100, ocean_blue_200, ocean_blue_350, ocean_blue_50 } from 'theme/colors';
import { getBarFillColor } from './helper';

interface Props {
  data?: any[];
}

const AccuracyDistributionBarChart: FC<Props> = ({ data }) => {
  const colors = [ocean_blue_50, ocean_blue_100, ocean_blue_200];

  const customLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;
    const fill = colors[(index as number) % colors.length];
    if (value === 0) {
      return null;
    }

    return (
      <text
        x={(x as number) + (width as number) + 2}
        y={(y as number) + (height as number) / 2}
        fill={fill}
        dy={2}
        textAnchor="start"
        fontSize="12px"
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  const customFormatLabel = (value: any) => {
    let customValue = value;
    if (value === 0) {
      customValue = '';
    }
    return `${customValue}`;
  };

  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, name, value } = props;
    const borderRadius = value === 1 ? 5 : 8;
    const fillColor = getBarFillColor(name);
    const path =
      value === 0
        ? ''
        : `M${x},${y}
                  L${x + width - borderRadius},${y}
                  A${borderRadius},${borderRadius} 0 0 1 ${x + width},${y + borderRadius}
                  L${x + width},${y + height - borderRadius}
                  A${borderRadius},${borderRadius} 0 0 1 ${x + width - borderRadius},${y + height}
                  L${x},${y + height}
                  Z`;

    return path ? <path d={path} fill={fillColor} /> : null;
  };

  return (
    <Box h="full" w="full" pb="16px">
      <ResponsiveContainer minWidth="100%" minHeight="100%">
        <BarChart
          layout="vertical"
          //@ts-ignore
          overflow="visible"
          data={data}
          style={{
            fontSize: '10px',
            fontWeight: 400,
            marginLeft: '-30px',
            marginTop: '2px'
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={ocean_blue_350} />
          <XAxis
            type="number"
            tick={{ fill: ocean_blue_350 }}
            axisLine={{ stroke: ocean_blue_350 }}
            tickLine={false}
            // domain={[0, 100]}
          />
          <YAxis
            domain={[0, 100]}
            dataKey="name"
            type="category"
            tick={{ fill: ocean_blue_350 }}
            axisLine={{ stroke: ocean_blue_350 }}
            tickLine={false}
          />
          <Bar dataKey="value" shape={<CustomBar />}>
            <LabelList
              dataKey="value"
              position="right"
              formatter={customFormatLabel}
              content={customLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AccuracyDistributionBarChart;
