import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_100, ocean_blue_500, ocean_blue_600 } from 'theme/colors';

interface SKUWithAnchorCardProps {
  name?: string;
  isSkuCard?: boolean;
  value?: number;
}

const SKUWithAnchorCard: FC<SKUWithAnchorCardProps> = ({ name = '', isSkuCard = false, value }) => {
  const bgColor = isSkuCard ? ocean_blue_600 : ocean_blue_500;
  return (
    <VStack
      h="121px"
      w="full"
      bg={bgColor}
      borderRadius="8px"
      align="start"
      p="16px"
      spacing="8px"
      justifyContent="center"
    >
      <VStack spacing={0} align="start">
        <AppText size="body3" color={neutral_100}>
          {name}
        </AppText>
        <AppText size="caption" color={ocean_blue_100}>
          (excl. the current selection)
        </AppText>
      </VStack>
      <Box h="30px">
        <AppText size="h1Semibold" color={neutral_100}>
          {value}
        </AppText>
      </Box>
    </VStack>
  );
};

export default SKUWithAnchorCard;
