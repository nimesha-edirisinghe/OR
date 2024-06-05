import { FC } from 'react';
import { Box, Divider, HStack, Skeleton, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { useSelector } from 'react-redux';
import { IInsight, insightSliceSelector } from 'state/pages/insights/insightState';
import InsightCard from '../InsightCard/InsightCard';
import CardTitle from '../InsightCard/CardTitle';
import DirectionIndicator from '../InsightCard/DirectionIndicator';

interface ProjectionSectionProps {}

const ProjectionSection: FC<ProjectionSectionProps> = () => {
  const insightState: IInsight = useSelector(insightSliceSelector);
  const projectionState = insightState.projectionData;

  const enableSprDir = true;

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
        px="5px"
        userSelect="none"
      >
        {projectionState && (
          <VStack align="start">
            <HStack>
              <AppText size="16_600" pl="20px">
                Projection :
              </AppText>
              <AppText fontSize="16px" fontWeight="400" pl="2px">
                {projectionState?.startDate} To {projectionState?.endDate}
              </AppText>
            </HStack>

            <HStack pt="19px" px="30px" spacing="10px" w="full">
              <HStack h="165px" flex={1} justifyContent="space-between" spacing="10px">
                <InsightCard
                  title={<CardTitle title="Inventory Value" />}
                  sar={projectionState?.inventory_value?.sar}
                  pwDir={
                    <DirectionIndicator
                      direction={projectionState?.inventory_value?.cw_pw_dir}
                      arrowColor="#555"
                      percentage={projectionState?.inventory_value?.cw_pw_per}
                      desc={`${
                        projectionState?.inventory_value?.cw_pw_per !== 'undefined' ? '%' : ''
                      } vs the previous week`}
                    />
                  }
                  splyDir={
                    enableSprDir ? (
                      ''
                    ) : (
                      <DirectionIndicator
                        direction={projectionState?.inventory_value?.cy_sply_dir}
                        arrowColor="#555"
                        percentage={projectionState?.inventory_value?.cy_sply_per}
                        desc={`${
                          projectionState?.inventory_value?.cy_sply_per !== 'undefined' ? '%' : ''
                        } vs SPLYr`}
                      />
                    )
                  }
                />
                <InsightCard
                  title={<CardTitle title="Total Order Value" />}
                  sar={projectionState?.inv_total_value_order?.sar}
                />
              </HStack>
              <Divider
                orientation="vertical"
                color="#A7A7A7"
                h="165px"
                variant="dashed"
                borderWidth="1px"
              />
              <HStack h="165px" flex={1} justifyContent="space-between" spacing="10px">
                <InsightCard
                  title={<CardTitle title="Out of stock SKUs" />}
                  sar={projectionState?.oos_skus?.sar}
                  pwDir={
                    <DirectionIndicator
                      direction={projectionState?.oos_skus?.cw_pw_dir}
                      arrowColor={
                        projectionState?.oos_skus?.cw_pw_dir === '0' ? '#28A54D' : '#D11E27'
                      }
                      percentage={projectionState?.oos_skus?.cw_pw_per}
                      desc={`${
                        projectionState?.oos_skus?.cw_pw_per !== 'undefined' ? '%' : ''
                      } vs the previous week`}
                    />
                  }
                  splyDir={
                    enableSprDir ? (
                      ''
                    ) : (
                      <DirectionIndicator
                        direction={projectionState?.oos_skus?.cy_sply_dir}
                        arrowColor={
                          projectionState?.oos_skus?.cy_sply_dir === '0' ? '#28A54D' : '#D11E27'
                        }
                        percentage={projectionState?.oos_skus?.cy_sply_per}
                        desc={`${
                          projectionState?.oos_skus?.cy_sply_per !== 'undefined' ? '%' : ''
                        } vs SPLYr`}
                      />
                    )
                  }
                  hasSARPrefix={false}
                />
                <InsightCard
                  title={<CardTitle title="Loss of Sale" />}
                  sar={projectionState?.loss_sales?.sar}
                />
              </HStack>
            </HStack>
          </VStack>
        )}
        <HStack justify="center">
          {!projectionState && <AppText>Something went wrong</AppText>}
        </HStack>
      </Box>
    </Skeleton>
  );
};

export default ProjectionSection;
