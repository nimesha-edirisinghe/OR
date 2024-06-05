import { Box, HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import MayaSection from './MayaSection/MayaSection';
import QuickInsightSection from './QuickInsightSection/QuickInsightSection';
import SystemInfoSection from './SystemInfoSection/SystemInfoSection';
import LastLoginSection from './LastLoginSection/LastLoginSection';
import AlertSection from './AlertSection/AlertSection';
import ViewMyTaskSection from './ViewMyTaskSection/ViewMyTaskSection';
import { scrollbarYStyles } from 'theme/styles';

interface Props {}
const MainHomeSection: FC<Props> = () => {
  return (
    <HStack h="full" w="full" gap="20px" align="start">
      <VStack flex={1.4} h="calc(100vh - 372px)" spacing="20px">
        <MayaSection />
        <QuickInsightSection />
        <SystemInfoSection />
      </VStack>
      <VStack flex={1} h="calc(100vh - 372px)" spacing="20px">
        <LastLoginSection />
        <ViewMyTaskSection />
        <AlertSection />
      </VStack>
    </HStack>
  );
};

export default MainHomeSection;
