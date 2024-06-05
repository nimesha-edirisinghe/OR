import { Box, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import {
  neutral_100,
  neutral_300,
  ocean_blue_500_t10,
  yellow_500,
  yellow_gradient_g10
} from 'theme/colors';

interface KPICardProps {
  name?: string;
  value?: string;
  isAlerted?: boolean;
  hiddenOutOfStockDays?: boolean;
  infoLabel?: string;
}

const KPICard: FC<KPICardProps> = ({
  name = '',
  value = '',
  isAlerted = false,
  hiddenOutOfStockDays = false,
  infoLabel = ''
}) => {
  const bgColor = isAlerted ? yellow_gradient_g10 : ocean_blue_500_t10;
  return (
    <VStack
      p="16px"
      h="103px"
      bg={bgColor}
      w="full"
      borderRadius="8px"
      align="start"
      spacing="8px"
      justifyContent="center"
    >
      <HStack justify="space-between" w="full">
        <AppText size="body3" color={neutral_100}>
          {name}
        </AppText>
        {isAlerted && <Box bg={yellow_500} h="8px" w="8px" borderRadius="100%" />}
      </HStack>

      <VStack align="start" spacing={0}>
        <AppText size="h1Semibold" color={neutral_100}>
          {value}
        </AppText>
        {!hiddenOutOfStockDays && (
          <AppText size="caption" color={neutral_300}>
            {infoLabel}
          </AppText>
        )}
      </VStack>
    </VStack>
  );
};

export default KPICard;
