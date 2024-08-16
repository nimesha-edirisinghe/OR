import { FC, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getFilterCountRequest,
  openFilterDrawer,
  setAlgoExecutionSearchKey,
  updateDashboardFilter,
  updateLastUpdatedDateTime
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { getActivityLogListRequest } from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import { blue_500, ocean_blue_600 } from 'theme/colors';
import AppIconButton from 'components/newTheme/AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import AppTooltip from 'components/AppTooltip/AppTooltip';

interface ActivityLogHeaderProps {}

const ActivityLogHeader: FC<ActivityLogHeaderProps> = () => {
  const activityState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const rightPanelRetainDataList =
    activityState.dashboardFilter.filterLocalScope.rightPanelRetainDataList;
  const searchKey = activityState.localScope.searchKey;
  const dispatch = useDispatch();

  const onRefreshHandler = () => {
    dispatch(setAlgoExecutionSearchKey(''));
    dispatch(
      getActivityLogListRequest({
        pageNumber: 1
      })
    );
    dispatch(updateLastUpdatedDateTime());
  };
  const onSearchHandler = () => {
    dispatch(
      getActivityLogListRequest({
        search: searchKey,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setAlgoExecutionSearchKey(value));
  };

  const handleSearchFieldPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.defaultPrevented) {
      event.preventDefault();
      onSearchHandler();
    }
  };

  return (
    <Box overflow="auto" w="full" maxH="36px" userSelect="none">
      <HStack w="full" h="full" justify="space-between">
        <HStack spacing="16px">
          <AppInputGroup
            placeholder="Search"
            value={searchKey}
            onChange={handleInputChange}
            fontSize="14px"
            variant="primary"
            inputSize="large"
            width="237px"
            height="36px"
            onKeyDown={handleSearchFieldPress}
          />
          <AppTooltip label="Filter" placement="bottom-start">
            <Box>
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
            </Box>
          </AppTooltip>
        </HStack>
        <HStack>
          <HStack spacing="16px" alignItems={'center'}>
            <HStack w="auto" mr="20px" fontWeight={400} fontSize="12px">
              <AppText color="#57809A" transition="all 0.2s ease">
                Last Update:
              </AppText>
              <AppText color="#57809A" transition="all 0.2s ease">
                {activityState.lastUpdatedDateTime}
              </AppText>
            </HStack>
            <AppTooltip label="Refresh" placement="bottom-start">
              <Box>
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
              </Box>
            </AppTooltip>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ActivityLogHeader;
