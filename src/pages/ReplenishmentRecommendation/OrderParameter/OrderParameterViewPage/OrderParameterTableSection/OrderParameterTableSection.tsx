import { VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import HeaderSection from './HeaderSection/HeaderSection';
import TableSection from './TableSection/TableSection';
import FooterSection from './FooterSection/FooterSection';
import {
  IOrderParameter,
  getRplParameterSummaryRequest,
  orderParameterSliceSelector
} from 'state/pages/replenishmentRecommendation/orderParameter/orderParameterState';
import { useDispatch, useSelector } from 'react-redux';
import { formatOrderParameterRowData } from 'utils/dataFormatter';
import {
  IGroupConfigurationSlice,
  groupConfigurationSliceSelector
} from 'state/pages/advancedConfiguration/groupConfiguration/groupConfigurationState';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface Props {}

const OrderParameterTableSection: FC<Props> = () => {
  const dispatch = useDispatch();
  const orderParameterState: IOrderParameter = useSelector(orderParameterSliceSelector);
  const groupConfigurationState: IGroupConfigurationSlice = useSelector(
    groupConfigurationSliceSelector
  );
  const summaryLoading = orderParameterState.loading.summaryData;
  const orderParameterSummaryData = orderParameterState.summaryData?.list!;
  const totalCount = orderParameterState.summaryData?.totalCount!;
  const isFilterApplied = groupConfigurationState.groupConfigurationLocalScope.isFilterApplied;
  const orderParameterTableData = formatOrderParameterRowData(orderParameterSummaryData!);

  useEffect(() => {
    dispatch(getRplParameterSummaryRequest());
  }, [isFilterApplied]);
  return (
    <VStack w="full" h="full" spacing="16px">
      <HeaderSection />
      {totalCount === 0 && !summaryLoading ? (
        <AppNoDataAvailablePanel />
      ) : (
        <>
          <TableSection rowData={orderParameterTableData} loading={summaryLoading} />
          <FooterSection />
        </>
      )}
    </VStack>
  );
};

export default OrderParameterTableSection;
