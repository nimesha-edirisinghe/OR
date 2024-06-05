import { Box, HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';
import AppInprogressBar from 'components/newTheme/AppInprogressBar/AppInprogressBar';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_50 } from 'theme/colors';

interface Props {
  percentage: number;
  cancelHandler: () => void;
}

const AnalyzingDataPanel: FC<Props> = ({ percentage, cancelHandler }) => {
  return (
    <VStack h="143px" w="304px" spacing="40px">
      <VStack spacing="20px" w="full">
        <HStack h="15px" w="full">
          <Box w="full">
            <AppInprogressBar percentage={percentage} height="7px" />
          </Box>
          <AppText size="caption" color={ocean_blue_50}>
            {`${Math.floor(percentage)}%`}
          </AppText>
        </HStack>
        <AppText size="h3Regular">Analyzing your data</AppText>
      </VStack>
      <AppButton onClick={cancelHandler} variant="secondary" size="medium" px="25px">
        Cancel
      </AppButton>
    </VStack>
  );
};

export default AnalyzingDataPanel;
