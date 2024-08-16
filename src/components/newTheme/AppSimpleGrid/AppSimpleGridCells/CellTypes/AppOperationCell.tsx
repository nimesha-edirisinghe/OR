import { Box, Divider, HStack, Skeleton, VStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { getStatusBackgroundColor, getStatusColor, statusTypes } from 'utils/utility';
import AppPopover from 'components/AppPopover/AppPopover';
import {
  IActivityLogSlice,
  activityLogSliceSelector
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { useSelector } from 'react-redux';
import { neutral_200, ocean_blue_100, red_600, yellow_500 } from 'theme/colors';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { iconName } from 'components/AppIcon/svgIcons';
import { scrollbarYStyles } from 'theme/styles';

interface OperationCellProps {
  jobGroupId?: number;
  actionIcons?: iconName[];
  displayValue: string;
  index: number;
  cellCallback?: (id: number | string, index: number, value: string | number) => void;
}

const AppOperationCell: FC<OperationCellProps> = ({
  jobGroupId = 0,
  displayValue,
  actionIcons = ['download'],
  index = 0,
  cellCallback = (id: number | string, index: number, value: string | number) => {}
}) => {
  const status: string = displayValue;
  const textColor = getStatusColor(status, 'status');
  const backgroundColor = getStatusBackgroundColor(status, 'status');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const jobSummary = activityLogState.jobSummary;
  const statusName: string = (statusTypes as any)[`${status}`];
  const icon: iconName = actionIcons[0];

  return (
    <HStack py="8px" justifyContent="space-between" h="full" w="full">
      <AppText
        fontSize="13px"
        fontWeight={400}
        color={textColor}
        bg={backgroundColor}
        noOfLines={1}
        borderRadius="8px"
        p="2px 8px 2px 8px"
        style={{ userSelect: 'text' }}
      >
        {statusName}
      </AppText>
      {icon === 'iIcon' && (
        <AppPopover
          isOpen={isOpen}
          onClose={onClose}
          children={
            <AppIconChakra
              name={icon}
              fill={yellow_500}
              width="16px"
              height="16px"
              transition="fill 0.3s"
              cursor="pointer"
              onMouseEnter={() => {
                onOpen();
                cellCallback(index, jobGroupId, 'summaryPopUp');
              }}
              _hover={{
                fill: yellow_500
              }}
            />
          }
          content={
            <Skeleton isLoaded={!activityLogState.isSummaryLoading} minH="80px">
              {jobSummary && (
                <Box
                  bg="#0C2331"
                  border="1px solid #1A3445"
                  p="16px"
                  borderRadius="8px"
                  w="320px"
                  h="249px"
                  zIndex="popover"
                  boxShadow="0px 20px 12px 0px rgba(0, 16, 25, 0.5)"
                  onMouseLeave={() => {
                    cellCallback(index, jobGroupId, 'onLeaveAction');
                  }}
                  overflowY="auto"
                  __css={scrollbarYStyles}
                >
                  <VStack spacing="12px" w="full" align="start">
                    <VStack align="start" spacing="4px">
                      <AppText fontSize="13px" fontWeight={600} lineHeight="19.5px" color="#8EADC1">
                        Summary
                      </AppText>
                      <AppText
                        fontSize="13px"
                        fontWeight={400}
                        lineHeight="16px"
                        color={neutral_200}
                      >
                        {activityLogState.selectedRow?.groupName}
                      </AppText>
                    </VStack>
                    <Divider />
                    {activityLogState.jobSummary?.details.map((jobData, key) => {
                      return (
                        <VStack align="start" w="full" key={jobData.jobKey} spacing="4px">
                          <AppText fontSize="13px" fontWeight={400} color={ocean_blue_100}>
                            {jobData.jobTypeDesc}{' '}
                            {jobData.executionLevel === 'sku' &&
                              `(${jobData.skuLocations} SKU-locations)`}
                            {jobData.executionLevel === 'anchor' &&
                              `(${jobData.anchorLocations} Anchor-locations)`}
                          </AppText>
                          <HStack>
                            <AppText px="2px" fontSize="13px" fontWeight={600} color={neutral_200}>
                              &#x2022;
                            </AppText>
                            <AppText fontSize="13px" fontWeight={600} color={neutral_200}>
                              Successful: {jobData.successCount}
                            </AppText>
                          </HStack>
                          <HStack>
                            <AppText px="2px" fontSize="13px" fontWeight={600} color={red_600}>
                              &#x2022;
                            </AppText>
                            <AppText fontSize="13px" fontWeight={600} color={red_600}>
                              Failed : {jobData.failureCount}
                            </AppText>{' '}
                          </HStack>
                        </VStack>
                      );
                    })}
                  </VStack>
                </Box>
              )}
            </Skeleton>
          }
        />
      )}
    </HStack>
  );
};

export default AppOperationCell;
