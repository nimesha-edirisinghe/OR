import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useState } from 'react';
import { ocean_blue_50, ocean_blue_500 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import AccuracyItem from './AccuracyItem';
import { PointWiseAccuracyI } from 'types/view/trainingSummary';

interface Props {
  pointWiseAccuracy: PointWiseAccuracyI[];
}

const PointWiseAccuracySection: FC<Props> = ({ pointWiseAccuracy }) => {
  const [scroll, setScroll] = useState<'scroll' | 'hidden'>('hidden');
  return (
    <VStack
      w="full"
      h="282px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="16px"
      align="start"
      spacing="8px"
    >
      <AppText size="body3" color={ocean_blue_50}>
        Pointwise Accuracy
      </AppText>
      <Box
        w="full"
        maxH="224px"
        __css={scrollbarYStyles}
        overflow="hidden"
        overflowY={scroll}
        onMouseEnter={() => setScroll('scroll')}
        onMouseLeave={() => setScroll('hidden')}
      >
        <Grid h="auto" templateColumns="repeat(3, 1fr)" gap="8px">
          {pointWiseAccuracy.map((item, index) => (
            <HStack key={`${index}${'-'}${item.timeReference}`}>
              <AccuracyItem value={item.value} label={item.timeReference} />
            </HStack>
          ))}
        </Grid>
      </Box>
    </VStack>
  );
};

export default PointWiseAccuracySection;
