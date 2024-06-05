import { FC } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getFilterCountRequest,
  openFilterDrawer,
  updateDashboardFilter,
  updateLastUpdatedDateTime
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { getActivityLogListRequest } from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { blue_500, ocean_blue_100, ocean_blue_600 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface ActivityLogHeaderProps {}

const ActivityLogHeader: FC<ActivityLogHeaderProps> = () => {
  const activityState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const rightPanelRetainDataList =
    activityState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const dispatch = useDispatch();

  const onRefreshHandler = () => {
    dispatch(
      getActivityLogListRequest({
        pageNumber: 1
      })
    );
    dispatch(updateLastUpdatedDateTime());
  };
  const onFilterHandler = () => {
    const _dashboardFilterOptions = produce(
      activityState.dashboardFilter,
      (draft: IActivityLogSlice['dashboardFilter']) => {
        draft.filterLocalScope.beforeEditFilterOptionsLevel1 = rightPanelRetainDataList;
      }
    );
    dispatch(updateDashboardFilter(_dashboardFilterOptions));
    dispatch(getFilterCountRequest());
    dispatch(openFilterDrawer());
  };

  return (
    <Box overflow="auto" w="full" height="full" borderRadius="10px" py="2px" userSelect="none">
      <HStack w="full" h="36px" justify="end">
        <HStack spacing="2px" alignItems={'center'}>
          <HStack w="auto" mr="20px">
            <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
              Last Update:
            </AppText>
            <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
              {activityState.lastUpdatedDateTime}
            </AppText>
          </HStack>
          <AppIconButton
            aria-label="filter"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="filter"
                width="14px"
                height="14px"
                fill={blue_500}
              />
            }
            variant="secondary"
            size="iconMedium"
            onClick={onFilterHandler}
            bg={ocean_blue_600}
          />
          <AppIconButton
            aria-label="refresh"
            icon={
              <AppIcon
                transition="transform 0.25s ease"
                name="refresh"
                width="14px"
                height="14px"
                fill={blue_500}
              />
            }
            variant="secondary"
            size="iconMedium"
            onClick={onRefreshHandler}
            bg={ocean_blue_600}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default ActivityLogHeader;
