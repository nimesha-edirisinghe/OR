import { HStack, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import MayaSection from './MayaSection/MayaSection';
import QuickInsightSection from './QuickInsightSection/QuickInsightSection';
import SystemInfoSection from './SystemInfoSection/SystemInfoSection';
import LastLoginSection from './LastLoginSection/LastLoginSection';
import AlertSection from './AlertSection/AlertSection';
import ViewMyTaskSection from './ViewMyTaskSection/ViewMyTaskSection';
import { useHomeSectionAccess } from 'hooks/useHomeSectionAccess';

interface Props {}
const MainHomeSection: FC<Props> = () => {
  const {
    askMayaAccessAllowed,
    fcSummaryAccessAllowed,
    rplSummaryAccessAllowed,
    dataIngestionAccessAllowed,
    opTrackerAccessAllowed,
    alertAccessAllowed,
    trackOrdersAccessAllowed
  } = useHomeSectionAccess();

  return (
    <HStack h="full" w="full" spacing="20px" align="start">
      <VStack flex={1.4} h="calc(100vh - 372px)" spacing="20px">
        <MayaSection isDisabled={!askMayaAccessAllowed} />
        <QuickInsightSection
          isDisabledFcSummary={!fcSummaryAccessAllowed}
          isDisabledRplSummary={!rplSummaryAccessAllowed}
        />
        <SystemInfoSection
          isDisabledDataIngestion={!dataIngestionAccessAllowed}
          isDisabledOpTracker={!opTrackerAccessAllowed}
        />
      </VStack>
      <VStack flex={1} h="calc(100vh - 372px)" spacing="20px">
        <LastLoginSection />
        <ViewMyTaskSection isDisabled={!trackOrdersAccessAllowed} />
        <AlertSection isDisabled={!alertAccessAllowed} />
      </VStack>
    </HStack>
  );
};

export default MainHomeSection;
