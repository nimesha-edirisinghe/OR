import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { blue_500, ocean_blue_350 } from 'theme/colors';

interface Props {
  percentage: number;
  height?: string;
}
const AppInprogressBar: React.FC<Props> = ({ percentage, height = '10px' }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);

  return (
    <Box
      width="100%"
      backgroundColor={ocean_blue_350}
      borderRadius="8px"
      overflow="hidden"
      height={height}
      position="relative"
    >
      <Box
        backgroundColor={blue_500}
        height="100%"
        width={`${width}%`}
        position="absolute"
        top="0"
        left="0"
        borderRadius="4px"
        transition="width 0.25s ease-in-out"
      />
    </Box>
  );
};

export default AppInprogressBar;
