import React, { FC, useCallback, useEffect } from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { ocean_blue_600 } from 'theme/colors';
import ProductActivationViewTableSection from './ProductActivationViewTableSection/ProductActivationViewTableSection';
import ProductActivationSummaryViewHeader from './ProductActivationSummaryViewHeader/ProductActivationSummaryViewHeader';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, userSliceSelector } from 'state/user/userState';
import { ISelectProductView, getProductNewActivationRequest, newProductActivationSliceSelector } from 'state/pages/product/newActivation/productNewActivationState';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';


interface Props {}

export type ActivationSubPages = 'Location-Selection' | 'Detail-Selection';

const NewProductActivationPage: FC<Props> = () => {


  
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const viewState: ISelectProductView = useSelector(
    newProductActivationSliceSelector
  ).productActivationView;
  
  useEffect(() => {
    dispatch(getProductNewActivationRequest({pageNumber: 1, pageSize: STORE_ACTIVATION_PAGE_SIZE, filter: [],searchKey: ''}));
  },[]);
  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
        // dispatch(getGroupListRequest({}));
        // dispatch(
        //   getLabelsRequest({
        //     labelTypes: ['location', 'product', 'anchor', 'store', 'sku']
        //   })
        // );
        // dispatch(setPromotionSummarySearchKey(''));
      }
      return () => {
        abortController.abort();
      };
    } catch (error) {
      console.error('summary details fetching error ocurred', error);
    }
  }, [selectedOrgKey]);
  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <HStack h="36px" w="full">
          <ProductActivationSummaryViewHeader />
        </HStack>
        <HStack borderRadius="8px" h="calc(100vh - 165px)" w="full" p="12px" bg={ocean_blue_600}>
          <ProductActivationViewTableSection />
        </HStack>
      </VStack>
    );
  }, []);
  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default NewProductActivationPage;
