import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback } from 'react';
import PageHeader from '../Common/PageHeader/PageHeader';
import ConfigDetailPanel from './ConfigDetailPanel/ConfigDetailPanel';

interface Props {}

const StoreConfigDetailPage: FC<Props> = () => {

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
      <PageHeader subPage="Detail-Selection" />
      <ConfigDetailPanel />
    </VStack>
    );
  }, []);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default StoreConfigDetailPage;
