import { VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AppNoDataAvailablePanel from 'components/newTheme/AppNoDataAvailablePanel/AppNoDataAvailablePanel';
import HeaderSection from './HeaderSection/HeaderSection';
import TableSection from './TableScetion/TableSection';
import FooterSection from './FooterSection/FooterSection';
import {
  ISelectProductView,
  newProductActivationSliceSelector
} from 'state/pages/product/newActivation/productNewActivationState';

interface ViewSectionProps {}

const ProductActivationViewTableSection: FC<ViewSectionProps> = () => {
  const dispatch = useDispatch();
  const state: ISelectProductView = useSelector(
    newProductActivationSliceSelector
  ).productActivationView;

  const dataLoading = state.data.loading;
  const totalCount = state.data.totalCount!;

  return (
    <VStack w="full" h="full" spacing="16px">
      <HeaderSection />
      {totalCount === 0 && !dataLoading ? (
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
export default ProductActivationViewTableSection;
