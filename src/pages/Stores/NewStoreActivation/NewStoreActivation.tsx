import { FC, useCallback } from 'react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { VStack } from '@chakra-ui/react';
import NewStoreActivationViewPage from './ViewPage/NewStoreActivationViewPage';

interface Props {}

export type ActivationSubPages = 'Sku-Selection' | 'Detail-Selection'; 

const NewStoreActivation: FC<Props> = () => {
  const viewSummaryPageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px" >
        <NewStoreActivationViewPage></NewStoreActivationViewPage>
      </VStack>
    );
  }, []);

  return (
    <>      
      <InsightsPageLayout children={viewSummaryPageContent()} />
    </>
  );
};

export default NewStoreActivation;
