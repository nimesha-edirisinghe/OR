import { FC, useCallback, useEffect } from 'react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import SummarySection from './SummarySection/SummarySection';
import { useDispatch, useSelector } from 'react-redux';
import {
  IInsight,
  insightSliceSelector,
  getDemandForecastCardRequest,
  getDemandForecastDataRequest,
  getFilterCountRequest,
  getInvReportDataRequest,
  getOutOfStockPercentDataRequest,
  getProjectionDataRequest,
  getSummaryRequest,
  resetFilter
} from 'state/pages/insights/insightState';
import { IUser, userSliceSelector } from 'state/user/userState';
import InventoryTile from './BenchmarkSection/InventoryTile';
import OutOfStockTile from './BenchmarkSection/OutOfStockTile';
import BenchmarkHeader from './BenchmarkSection/BenchmarkHeader';
import { Box, HStack } from '@chakra-ui/react';
import Filter from './Filter/Filter';
import ProjectionSection from './ProjectionSection/ProjectionSection';
import DemandForecastSection from './DemandForecastSection/DemandForecastSection';
import FilterDrawer from './Filter/FilterDrawer/FilterDrawer';
import FilterItemsSelectionDrawer from './Filter/FilterItemsSelectionDrawer/FilterItemsSelectionDrawer';
import PageHeader from './PageHeader/PageHeader';
import { useLocation } from 'react-router-dom';

interface Props {}

const InsightsPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const insightState: IInsight = useSelector(insightSliceSelector);
  const location = useLocation();

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        dispatch(resetFilter({ filterMode: 'DEFAULT' }));
        dispatch(getFilterCountRequest());
        dispatch(getSummaryRequest());
        dispatch(getInvReportDataRequest());
        dispatch(getOutOfStockPercentDataRequest());
        dispatch(getProjectionDataRequest());
        dispatch(getDemandForecastDataRequest(true));
        dispatch(getDemandForecastCardRequest());
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ', error);
    }
  }, [selectedOrgKey, location]);

  const resetFilterOptions = () => {
    dispatch(getSummaryRequest());
    dispatch(getInvReportDataRequest());
    dispatch(getOutOfStockPercentDataRequest());
    dispatch(getProjectionDataRequest());
    dispatch(getDemandForecastDataRequest(true));
    dispatch(getDemandForecastCardRequest());
  };

  const onClickApplyFilterHandler = () => {
    dispatch(getFilterCountRequest());
    dispatch(getSummaryRequest());
    dispatch(getInvReportDataRequest());
    dispatch(getOutOfStockPercentDataRequest());
    dispatch(getProjectionDataRequest());
    dispatch(getDemandForecastDataRequest(false));
    dispatch(getDemandForecastCardRequest());
  };

  const insightPageContent = useCallback(() => {
    return (
      <Box w="full" px="24px" pt="24px">
        <HStack>
          <PageHeader />
        </HStack>
        <HStack mt="16px">
          <Filter
            resetFilterOptions={resetFilterOptions}
            onClickApplyFilterHandler={onClickApplyFilterHandler}
          />
        </HStack>
        <HStack w="full" mt="16px">
          <SummarySection />
        </HStack>
        {/* <HStack w="full" pt="22px" pb="17px">
          <BenchmarkHeader />
        </HStack> */}
        <HStack w="full" spacing="22px" mt="16px">
          <InventoryTile flex={1} />
          <OutOfStockTile flex={1} />
        </HStack>
        <HStack w="full" mt="16px">
          <ProjectionSection />
        </HStack>
        <HStack w="full" mt="16px">
          <DemandForecastSection />
        </HStack>
      </Box>
    );
  }, [selectedOrgKey]);

  return (
    <>
      <FilterDrawer isOpen={insightState.dashboardFilter.filterLocalScope.isOpenFilterDrawer} />
      <FilterItemsSelectionDrawer
        isOpen={insightState.dashboardFilter.filterLocalScope.isOpenItemSelectionDrawer}
      />
      <InsightsPageLayout children={insightPageContent()} />
    </>
  );
};

export default InsightsPage;
