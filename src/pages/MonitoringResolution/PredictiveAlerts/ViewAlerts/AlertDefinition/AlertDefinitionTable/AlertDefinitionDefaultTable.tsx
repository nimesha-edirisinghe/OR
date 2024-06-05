import { Box, Center, Text } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { neutral_500, ocean_blue_500 } from 'theme/colors';

const AlertDefinitionDefaultTable = () => {
  return (
    <Center h="full" mt="150px" >
      <AppText size="italic" color={neutral_500} fontStyle="italic">
        No items have been alerted yet. Alerted items will be listed once they are alerted.
      </AppText>
    </Center>
  );
};

export default AlertDefinitionDefaultTable;
