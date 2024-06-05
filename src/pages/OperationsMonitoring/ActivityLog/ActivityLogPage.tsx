import { Box, HStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import ActivityLogHeader from './ActivityLogHeader/ActivityLogHeader';
import FilterSection from './FilterSection/FilterSection';
import TableSection from './TableSection/TableSection';
import FooterSection from './FooterSection/FooterSection';
import FilterDrawer from './ActivityLogFilter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from './ActivityLogFilter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import {
  IActivityLogSlice,
  activityLogSliceSelector,
  getActivityLogListRequest,
  updateLastUpdatedDateTime
} from 'state/pages/operationAndMonitoring/activityLog/activityLogState';
import FilterDateSelectionDrawer from './ActivityLogFilter/FilterDateSelectionDrawer/FilterDateSelectionDrawer';
import { resetActivityLogFilter } from './ActivityLogFilter/FilterDrawer/helper';

interface Props {}

const ActivityLogPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const activityState: IActivityLogSlice = useSelector(activityLogSliceSelector);
  const dashboardFilter = activityState.dashboardFilter;

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        resetActivityLogFilter(dashboardFilter, dispatch);
        dispatch(
          getActivityLogListRequest({
            pageNumber: 1
          })
        );
        dispatch(updateLastUpdatedDateTime());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
    }
  }, [selectedOrgKey]);

  const activityLogPageContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px">
        <HStack>
          <ActivityLogHeader />
        </HStack>
        <HStack mt="12px" h="20px" w="full">
          <FilterSection />
        </HStack>
        <HStack mt="16px">
          <TableSection />
        </HStack>
        <HStack mt="2px">
          <FooterSection />
        </HStack>
      </Box>
    );
  }, [selectedOrgKey]);

  return (
    <>
      <FilterDrawer isOpen={activityState.dashboardFilter.filterLocalScope.isOpenFilterDrawer} />
      <FilterItemsSelectionDrawer
        isOpen={activityState.dashboardFilter.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <FilterDateSelectionDrawer
        isOpen={activityState.dashboardFilter.filterLocalScope.isOpenFilterDateSelectionDrawer}
      />
      <InsightsPageLayout children={activityLogPageContent()} />
    </>
  );
};

export default ActivityLogPage;
