import { VStack } from '@chakra-ui/react';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { FC, useCallback, useEffect } from 'react';
import ConfigurationHeader from './ConfigurationHeader/ConfigurationHeader';
import {
  IStoreNewActivationView,
  getFilterDataRequest,
  newStoreActivationSliceSelector
} from 'state/pages/stores/newActivation/storeNewActivationState';
import { useDispatch, useSelector } from 'react-redux';
import SkuSelectionPanel from './SkuSelectionPage/SkuSelectionPanel';
import PageHeader from '../Common/PageHeader/PageHeader';
import { SkuFilterType } from '../Common/constants';
import { GroupFilterI } from 'types/requests/groupConfigRequests';
import { useNavigate } from 'react-router-dom';

interface Props {}

const SkuSelectionPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state: IStoreNewActivationView = useSelector(newStoreActivationSliceSelector);
  const selectedSkus = state.skuSelectionView.selection.selectedSkus;

  const getFilters = (data: any): GroupFilterI[] => {
    if (!data.isSelectAll && data.search) {
      return [
        {
          type: SkuFilterType.type,
          code: SkuFilterType.code,
          search: data.search || '',
          selectedItems: [],
          isSelectAll: false
        } as GroupFilterI
      ];
    }
    return [];
  };

  useEffect(() => {
    if ((state.storeActivationView.selection.selectedCount || 0) == 0) {
      // navigate('/app/stores/new-activation');
    }
    dispatch(
      getFilterDataRequest({
        type: SkuFilterType.type,
        code: SkuFilterType.code,
        filters: getFilters(selectedSkus),
        pageNumber: state.skuSelectionView.data.pageNumber,
        pageSize: state.skuSelectionView.data.pageSize
      })
    );
  }, []);

  useEffect(() => {
    if ((selectedSkus.search || '') != '') {
      dispatch(
        getFilterDataRequest({
          type: SkuFilterType.type,
          code: SkuFilterType.code,
          filters: getFilters(selectedSkus),
          pageNumber: state.skuSelectionView.data.pageNumber,
          pageSize: state.skuSelectionView.data.pageSize
        })
      );
    }
  }, [selectedSkus.search]);

  const pageContent = useCallback(() => {
    return (
      <VStack w="full" px="20px" pt="20px" spacing="16px">
        <PageHeader subPage="Sku-Selection" />
        <ConfigurationHeader />
        <SkuSelectionPanel />
      </VStack>
    );
  }, []);

  return (
    <>
      <InsightsPageLayout children={pageContent()} />
    </>
  );
};

export default SkuSelectionPage;
