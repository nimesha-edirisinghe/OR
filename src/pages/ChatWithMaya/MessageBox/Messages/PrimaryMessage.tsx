import { Box } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_600 } from 'theme/colors';

interface Props { }

const PrimaryMessage: FC<Props> = () => {
  return (
    <Box h="44px" w="full" bg={ocean_blue_600} p="12px" alignSelf="flex-start" borderRadius="8px">
      <AppText size="body2">
        Hey there, Great to meet you! I am Maya, your personal AI.
      </AppText>
    </Box>
  );
};

export default PrimaryMessage;
