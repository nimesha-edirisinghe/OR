import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ConfigurationDetailsHeader from './ConfigurationDetailsHeader/ConfigurationDetailsHeader';
import ConfigurationDetailsSummary from './ConfigurationDetailsSummary/ConfigurationDetailsSummary';
import PageHeader from '../Common/PageHeader/PageHeader';
import {
  IProductNewActivationView,
  getSKUFilterDataRequest,
  newProductActivationSliceSelector
} from 'state/pages/product/newActivation/productNewActivationState';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader';

interface Props {}

const ConfigurationDetails: FC<Props> = () => {
  const dispatch = useDispatch();
  const state: IProductNewActivationView = useSelector(newProductActivationSliceSelector);

  // useEffect(() => {
  //   dispatch(
  //     getSKUFilterDataRequest({
  //       filterItem: state.skuSelectionView.selection.filterItem,
  //       pageNumber: state.skuSelectionView.data.pageNumber,
  //       pageSize: state.skuSelectionView.data.pageSize
  //     })
  //   );
  // }, []);

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <PageHeader subPage="Detail-Selection" />
        <ConfigurationHeader />
        <ConfigurationDetailsSummary />
      </VStack>
    );
  }, []);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default ConfigurationDetails;
