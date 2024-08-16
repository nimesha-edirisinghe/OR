import { VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import {
  IPromotionSummaryView,
  getPromotionSummaryDataRequest,
  promotionSummaryViewSliceSelector
} from 'state/pages/monitoringAndResolution/promotionSummaryView/promotionSummaryViewState';
import { useDispatch, useSelector } from 'react-redux';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import HeaderSection from './HeaderSection/HeaderSection';
import TableSection from './TableScetion/TableSection';
import FooterSection from './FooterSection/FooterSection';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';

interface ViewSectionProps {}

const PromotionSummaryViewTableSection: FC<ViewSectionProps> = () => {
  const dispatch = useDispatch();
  const promotionSummaryViewState: IPromotionSummaryView = useSelector(
    promotionSummaryViewSliceSelector
  );
  const promotionSummaryDataLoading = promotionSummaryViewState.loading?.skuDataLoading;
  const totalCount = promotionSummaryViewState.skuListData?.totalCount!;
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const isFilterApplied = groupConfigurationState.groupConfigurationLocalScope.isFilterApplied;

  useEffect(() => {
    if (isFilterApplied) {
      dispatch(getPromotionSummaryDataRequest());
    }
  }, [isFilterApplied]);

  return (
    <VStack w="full" h="full" spacing="16px">
      <HeaderSection />
      {totalCount === 0 && !promotionSummaryDataLoading ? (
        <AppNoDataAvailablePanel />
      ) : (
        <>
          <TableSection />
          <FooterSection />
        </>
      )}
    </VStack>
  );
};
export default PromotionSummaryViewTableSection;
