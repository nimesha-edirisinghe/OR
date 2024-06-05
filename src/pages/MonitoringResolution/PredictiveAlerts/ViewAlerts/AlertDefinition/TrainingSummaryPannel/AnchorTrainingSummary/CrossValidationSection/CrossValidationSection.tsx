import { VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_50, ocean_blue_500 } from 'theme/colors';

interface Props {
  crossValidationValue: boolean;
}

const CrossValidationSection: FC<Props> = ({ crossValidationValue }) => {
  return (
    <VStack
      h="136px"
      w="full"
      justify="center"
      spacing={0}
      align="start"
      px="16px"
      bg={ocean_blue_500}
      borderRadius="8px"
    >
      <AppText color={ocean_blue_50} size="body3">
        Cross Validation
      </AppText>
      <AppText color={neutral_100} size="h5Semibold">
        {crossValidationValue ? 'Yes' : 'No'}
      </AppText>
    </VStack>
  );
};

export default CrossValidationSection;
