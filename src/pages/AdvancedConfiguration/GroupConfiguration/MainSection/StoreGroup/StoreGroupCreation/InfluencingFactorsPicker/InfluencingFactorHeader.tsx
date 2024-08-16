import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_500, yellow_500 } from 'theme/colors';

interface InfluencingFactorsProps {
  isReadOnly: boolean;
}

const InfluencingFactorHeader: FC<InfluencingFactorsProps> = ({ isReadOnly }) => {
  const width = isReadOnly ? '358px' : '700px';

  return (
    <HStack
      justify="space-between"
      w="full"
      bg={ocean_blue_500}
      borderBottom={`1px solid ${yellow_500}`}
      m={'0px !important'}
      borderTopRadius={'6px'}
    >
      <Box w={width} borderRight={'1px solid black'} p={'8px'}>
        <AppText fontSize="13px" fontWeight={600} color={neutral_200}>
          Influencing Factors
        </AppText>
      </Box>
      <Box w={'100px'} borderRight={'1px solid black'} p={'8px'}>
        <AppText textAlign="start" fontSize="13px" fontWeight={600} color={neutral_200}>
          Anchor
        </AppText>
      </Box>
      <Box w={'100px'}>
        <AppText textAlign="start" fontSize="13px" fontWeight={500} color={neutral_200}>
          SKU
        </AppText>
      </Box>
    </HStack>
  );
};

export default InfluencingFactorHeader;
