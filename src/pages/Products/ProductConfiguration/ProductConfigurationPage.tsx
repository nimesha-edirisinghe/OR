import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import React, { FC, useCallback, useEffect } from 'react';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader';
import LocationSelectionPanel from './LocationSelection/LocationSelectionPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  IProductNewActivationView,
  getFilterDataRequest,
  newProductActivationSliceSelector
} from 'state/pages/product/newActivation/productNewActivationState';
import PageHeader from '../Common/PageHeader/PageHeader';

interface Props {}

const ProductConfigurationPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const state: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const locationSearch = state.locationSelectionView.selection.filterItem.search;

  useEffect(() => {
    dispatch(
      getFilterDataRequest({
        filterItem: state.locationSelectionView.selection.filterItem,
        pageNumber: state.locationSelectionView.data.pageNumber,
        pageSize: state.locationSelectionView.data.pageSize
      })
    );
  }, [locationSearch]);
  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <PageHeader subPage="Location-Selection" />
        <ConfigurationHeader />
        <LocationSelectionPanel />
      </VStack>
    );
  }, []);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default ProductConfigurationPage;
