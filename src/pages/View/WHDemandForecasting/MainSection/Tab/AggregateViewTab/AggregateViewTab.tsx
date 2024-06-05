import { Box, Center, HStack, Skeleton, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useState } from 'react';
import { neutral_200, neutral_500, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { scrollbarYStyles } from 'theme/styles';
import ChartPanel from '../../ChartPanel/ChartPanel';
import GridPanel from '../../GridPanel/GridPanel';
import { useSelector } from 'react-redux';
import {
  IWhDFView,
  whDfViewSliceSelector
} from 'state/pages/view/whDemandForecastView/whDfViewPageState';

interface AggregateViewTabProps {
  skuMaximized: boolean;
}

const AggregateViewTab: FC<AggregateViewTabProps> = () => {
  const [scroll, setScroll] = useState<string>('hidden');
  const dfViewState: IWhDFView = useSelector(whDfViewSliceSelector);
  const totalSkuCount = dfViewState.skuListData?.totalCount;
  const selectedSkuListLen = dfViewState.selectedSkuList.length;
  const isAllSkuSelected = dfViewState.dfViewLocalScope.globalSkuSelected;
  const aggregatedCount = isAllSkuSelected ? totalSkuCount : selectedSkuListLen || 0;

  return (
    <VStack
      spacing="20px"
      h="full"
      w="full"
      overflowX={'hidden'}
      overflowY={'scroll'}
      __css={scrollbarYStyles}
    >
      <VStack w="full" h="full" transition="all 0.1s ease-in" spacing={0} borderBottomRadius="8px">
        {dfViewState.selectedSkuList?.length > 0 && dfViewState.selectedSku?.forecastKey && (
          <Skeleton
            isLoaded={dfViewState.loading.graphDataLoading}
            w="full"
            borderBottomRadius="10px"
          >
            <HStack w="full" bg={ocean_blue_500} minH={'52px'} borderTopRadius="8px" pl={'20px'}>
              <AppText size={'body2'} color={neutral_200}>
                Aggregated view of {aggregatedCount} Forecast
              </AppText>
            </HStack>
            <Box
              overflowX={'hidden'}
              overflowY={'scroll'}
              __css={scrollbarYStyles}
              onMouseOver={() => setScroll('auto')}
              onMouseLeave={() => setScroll('hidden')}
              bg={ocean_blue_600}
              h={'calc(100vh - 263px)'}
              borderBottomRadius="10px"
            >
              <VStack w="full" p="16px" pl={'18px'}>
                {dfViewState?.graphData.length !== 0 ? (
                  <VStack w={'full'} h={'full'}>
                    <ChartPanel chartHeight="calc(100vh - 330px)" />
                    <Box w="full" mt="-35px !important">
                      <GridPanel />
                    </Box>
                  </VStack>
                ) : (
                  <VStack
                    h="calc(100vh - 295px)"
                    w="full"
                    bg={ocean_blue_500}
                    borderRadius="8px"
                    justify="center"
                  >
                    <AppText size="italic" color={neutral_500} fontStyle="italic">
                      No forecast is available for the selected SKU location
                    </AppText>
                  </VStack>
                )}
              </VStack>
            </Box>
          </Skeleton>
        )}
        {dfViewState.selectedSkuList?.length === 0 && (
          <Skeleton isLoaded={dfViewState.loading.graphDataLoading} w="full" borderRadius="10px">
            <Box
              overflow={scroll}
              borderRadius="10px"
              h="calc(100vh - 211px)"
              __css={scrollbarYStyles}
              minW="full"
              onMouseOver={() => setScroll('auto')}
              onMouseLeave={() => setScroll('hidden')}
              bg="#0A1922"
            >
              <Center h="full">
                <AppText size="italic" color={neutral_500} fontStyle="italic">
                  Please select a SKU-location to view the forecast here
                </AppText>
              </Center>
            </Box>
          </Skeleton>
        )}
        {dfViewState.selectedSkuList?.length && !dfViewState.selectedSku?.forecastKey && (
          <Center h="full">
            <AppText size="italic" color={neutral_500} fontStyle="italic">
              No forecast available
            </AppText>
          </Center>
        )}
      </VStack>
    </VStack>
  );
};

export default AggregateViewTab;
