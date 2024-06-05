import { Box, Divider, HStack, Skeleton, VStack, useDisclosure } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, ReactNode } from 'react';
import { TableMapDataI } from '../TableDataMapping';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { getStatusColor, findObject, statusTypes } from 'utils/utility';
import AppPopover from 'components/AppPopover/AppPopover';
import {
  IActivityLogSlice,
  activityLogSliceSelector
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { useSelector } from 'react-redux';
import { ocean_blue_400, ocean_blue_500 } from 'theme/colors';

interface OperationCellProps {
  children: ReactNode;
  tableMap: TableMapDataI;
  status?: string;
  jobGroupId: number | null;
}

const OperationCell: FC<OperationCellProps> = ({ jobGroupId, children, tableMap, status }) => {
  const textColor = getStatusColor(status, tableMap.key);
  const statusName = findObject(children as string, statusTypes)?.[1] as string;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const activityLogState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const jobSummary = activityLogState.jobSummary;

  return (
    <HStack
      pl="15px"
      pr="10px"
      bg={ocean_blue_400}
      py="8px"
      minW={tableMap.styles?.width}
      justifyContent="space-between"
      h="35px"
    >
      <AppText fontSize="13px" fontWeight={500} color={textColor} noOfLines={1}>
        {statusName}
      </AppText>
      {tableMap.action &&
        tableMap.action.iconName &&
        tableMap.action &&
        tableMap.action.actionName === 'summaryPopUp' && (
          <AppPopover
            isOpen={isOpen}
            onClose={onClose}
            children={
              <AppIconChakra
                name={tableMap.action.iconName}
                fill="left-menu-icon-color"
                width="16px"
                height="16px"
                transition="fill 0.3s"
                cursor="pointer"
                onMouseEnter={() => {
                  onOpen();
                  tableMap.action?.onIconClick('summaryPopUp', jobGroupId!);
                }}
                _hover={{
                  fill: 'yellow'
                }}
              />
            }
            content={
              <Skeleton isLoaded={!activityLogState.isSummaryLoading} minH="80px">
                {jobSummary && (
                  <Box
                    bg={ocean_blue_500}
                    border="1px solid #6C6C6C"
                    px="20px"
                    py="20px"
                    borderRadius="6px"
                    w="auto"
                    zIndex="popover"
                    onMouseLeave={() => {
                      tableMap.action?.onLeaveAction();
                    }}
                  >
                    <VStack align="start">
                      <AppText fontSize="14px" fontWeight={600} lineHeight="16px" color="#F2F2F2">
                        Summary
                      </AppText>
                      <AppText fontSize="14px" fontWeight={600} lineHeight="16px" color="#8C8C8C">
                        {activityLogState.selectedRow?.groupName}
                      </AppText>
                    </VStack>
                    <Divider pt="10px" />
                    <VStack>
                      {activityLogState.jobSummary?.details.map((jobData, key) => {
                        return (
                          <VStack align="start" w="full" mb="8px" key={jobData.jobKey}>
                            <HStack pt="10px">
                              <AppText
                                fontSize="13px"
                                fontWeight={500}
                                lineHeight="22px"
                                color="#BDBDBD"
                              >
                                &#x2022; {jobData.jobTypeDesc}
                              </AppText>

                              <AppText
                                fontSize="13px"
                                fontWeight={500}
                                lineHeight="22px"
                                color="#BDBDBD"
                              >
                                {jobData.executionLevel === 'sku' &&
                                  `(${jobData.skuLocations} SKU-locations)`}
                                {jobData.executionLevel === 'anchor' &&
                                  `(${jobData.anchorLocations} Anchor-locations)`}
                              </AppText>
                            </HStack>
                            <VStack align="start" pl="25px">
                              <AppText
                                fontSize="13px"
                                fontWeight={500}
                                lineHeight="22px"
                                color="#FFF"
                              >
                                Successful: {jobData.successCount}
                              </AppText>
                              <AppText
                                fontSize="13px"
                                fontWeight={500}
                                lineHeight="22px"
                                color="#D63737"
                              >
                                Failed : {jobData.failureCount}
                              </AppText>
                            </VStack>
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

export default OperationCell;
