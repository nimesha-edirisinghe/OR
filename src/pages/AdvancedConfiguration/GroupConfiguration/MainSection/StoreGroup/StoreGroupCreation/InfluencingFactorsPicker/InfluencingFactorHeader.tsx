import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';

const InfluencingFactorHeader: FC = () => {
  return (
    <HStack justify="space-between" w="full" mb="10px" pb="10px">
      <Box flex={4.5}>
        <AppText fontSize="14px" fontWeight={500}>
          Influencing Factors
        </AppText>
      </Box>
      <Box flex={1}>
        <AppText textAlign="center" fontSize="14px" fontWeight={500}>
          Anchor
        </AppText>
      </Box>
      <Box flex={1}>
        <AppText textAlign="center" fontSize="14px" fontWeight={500}>
          SKU
        </AppText>
      </Box>
    </HStack>
  );
};

export default InfluencingFactorHeader;
