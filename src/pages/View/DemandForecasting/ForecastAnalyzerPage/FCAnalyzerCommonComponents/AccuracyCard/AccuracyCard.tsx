import { VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import './AccuracyCard.css';
import { AnimatedCircles1, AnimatedCircles2, AnimatedCircles3 } from './AnimatedCircles';

interface AccuracyCardProps {
  name: string;
  heading?: string;
  value?: string;
}

const AccuracyCard: FC<AccuracyCardProps> = ({ name, heading = '', value = '-' }) => {
  return (
    <VStack
      h="80px"
      w="full"
      bg={ocean_blue_600}
      borderRadius="8px"
      align="start"
      px="12px"
      py="8.5px"
      spacing={0}
      position="relative"
      overflow="hidden"
    >
      <AppText size="body3" color={neutral_100}>
        {name}
      </AppText>
      <AppText size="caption" color={ocean_blue_100}>
        {heading}
      </AppText>
      <AppText size="h1Semibold" color={neutral_100}>
        {value}
      </AppText>
      <AnimatedCircles1 />
      <AnimatedCircles2 />
      <AnimatedCircles3 />
    </VStack>
  );
};

export default AccuracyCard;
