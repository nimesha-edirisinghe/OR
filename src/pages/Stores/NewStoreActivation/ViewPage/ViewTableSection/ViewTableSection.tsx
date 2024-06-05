import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSection from './HeaderSection/HeaderSection';
import FooterSection from './FooterSection/FooterSection';
import TableSection from './TableScetion/TableSection';
import { ISelectStoreView, IStoreNewActivationView, newStoreActivationSliceSelector } from 'state/pages/stores/newActivation/storeNewActivationState';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';

interface ViewSectionProps {}

const ViewTableSection: FC<ViewSectionProps> = () => {
  const dispatch = useDispatch();
  const state: ISelectStoreView = useSelector(
    newStoreActivationSliceSelector
  ).storeActivationView;
  const dataLoading = state.data.loading;
  const totalCount = state.data.totalCount!;
  
  return (
    <VStack w="full" h="full" spacing="16px">
      <HeaderSection />
      {
      totalCount === 0 && !dataLoading ? (
        <AppNoDataAvailablePanel />
      ) : 
      (
        <>
          <TableSection />
          <FooterSection />
        </>
      )}
    </VStack>
  );
};
export default ViewTableSection;
