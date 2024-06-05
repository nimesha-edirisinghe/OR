import { FC, useCallback } from 'react';
import { Box, Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { useSelector } from 'react-redux';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';

interface SummarySectionProps {}

const SummarySection: FC<SummarySectionProps> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const renderSummary = useCallback((name: string | undefined, count: number | undefined) => {
    return (
      <VStack h={'65px'} flex={1}>
        <AppText size="xsm" color="light-gray-text">
          {name}
        </AppText>
        <AppText color="#65DBD5" size="30_600" lineHeight="38px">
          {count}
        </AppText>
      </VStack>
    );
  }, []);

  return (
    <Skeleton
      w="full"
      height="full"
      borderRadius="10px"
      isLoaded={!insightState.isLoading}
      fadeDuration={1}
      speed={1}
    >
      <Box
        overflow="auto"
        w="full"
        height="full"
        bgColor="insights-section-bg-color"
        borderRadius="10px"
        py="20px"
        px="24px"
        userSelect="none"
      >
        <Flex justify={'flex-start'} flexDir={'column'}>
          <AppText size="16_600">Summary</AppText>
          <HStack pt="19px" px="20px">
            {renderSummary('Department', insightState.summary?.departments!)}
            {renderSummary('Sub Department', insightState.summary?.subDepartments)}
            {renderSummary('Active Products', insightState.summary?.activeProducts)}
            {renderSummary('Warehouse', insightState.summary?.warehouses)}
            {renderSummary('Stores', insightState.summary?.stores)}
          </HStack>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default SummarySection;
