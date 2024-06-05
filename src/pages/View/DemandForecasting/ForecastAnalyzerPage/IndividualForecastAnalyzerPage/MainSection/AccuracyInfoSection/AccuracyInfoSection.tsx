import { Box, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_300 } from 'theme/colors';
interface Props {}

const AccuracyInfoSection: FC<Props> = () => {
  return (
    <HStack w="full" h="30px">
      <AppText color={ocean_blue_300} size="caption">
        Forecasts that exhibit any of these observations are not considered for accuracy evaluation.
      </AppText>
      <Box w="16px" h="full">
        <AppIcon fill={ocean_blue_300} name="info" w="16px" h="16px" mb="10px" />
      </Box>
    </HStack>
  );
};

export default AccuracyInfoSection;
