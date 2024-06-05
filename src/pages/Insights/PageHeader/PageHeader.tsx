import { FC } from 'react';
import { Box, HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { useSelector } from 'react-redux';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';
import AppBreadcrumb from 'components/AppBreadcrumb/AppBreadcrumb';

interface PageHeaderProps {}

const PageHeader: FC<PageHeaderProps> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const summaryState = insightState.summary;

  const breadcrumbItems = [{ label: 'Insights', path: '/app/overview' }];

  return (
    <Box overflow="auto" w="full" height="full" borderRadius="10px" py="2px" userSelect="none">
      <HStack justify="space-between">
        <VStack justify="start" align="left" spacing="0">
          <Box>
            <AppBreadcrumb items={breadcrumbItems} />
          </Box>
          <Box>
            <AppText fontSize="20px" fontWeight={600} lineHeight="28px">
              Overview
            </AppText>
          </Box>
        </VStack>
        <HStack maxW="620px" bg="#F7CC4533" borderRadius="5px" py="8px" px="17px" spacing="12px">
          <AppText fontSize="14px" fontWeight={500} color="#F8F8F8" lineHeight="22px">
            Last Updated on : {summaryState?.lastRefresh}
          </AppText>
          <AppText fontSize="14px" fontWeight={500} color="#F8F8F8" lineHeight="22px">
            Next Update on : {summaryState?.nextRefresh}
          </AppText>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PageHeader;
