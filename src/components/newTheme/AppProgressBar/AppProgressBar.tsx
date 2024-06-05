import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { ocean_blue_100, ocean_blue_300 } from 'theme/colors';
import AppText from '../AppText/AppText';

interface AppProgressBarProps {
  value: number;
  colorScheme?: string;
}

const AppProgressBar: React.FC<AppProgressBarProps> = ({ value, colorScheme = '' }) => {
  const formattedValue = Math.min(Math.max(value, 0), 100);

  return (
    <HStack spacing="6.5px">
      <Box
        bg={ocean_blue_300}
        borderRadius="full"
        height="8px"
        minW="88%"
        position="relative"
        overflow="hidden"
      >
        <Box
          bg={colorScheme}
          height="100%"
          width={`${formattedValue}%`}
          borderRadius="full"
          transition="width 0.3s"
        />
      </Box>
      <AppText size="caption" color={ocean_blue_100}>
        {value.toFixed(2)}%
      </AppText>
    </HStack>
  );
};

export default AppProgressBar;
