import { Center, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';

interface Props {}

const EmptyPanel: FC<Props> = () => {
  return (
    <Center w="full" h="190px" bg="#0A1922" borderRadius="8px">
      <VStack spacing="16px">
        <AppIcon name="emptyLogo" w="100px" h="100px" />
        <AppText color="#57809A" size="body3">
          All the files you upload will be shown here
        </AppText>
      </VStack>
    </Center>
  );
};

export default EmptyPanel;
