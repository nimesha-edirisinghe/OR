import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IUser, userSliceSelector } from 'state/user/userState';
import InsightsPageLayout from 'layouts/PageLayouts/InsightsPageLayout';
import { HStack, VStack } from '@chakra-ui/react';
import ViewHeader from './ViewHeader/ViewHeader';
import { ocean_blue_600 } from 'theme/colors';
import ViewTableSection from './ViewTableSection/ViewTableSection';
import {
  ISelectStoreView,
  getStoreNewActivationRequest,
  newStoreActivationSliceSelector
} from 'state/pages/stores/newActivation/storeNewActivationState';
import { STORE_ACTIVATION_PAGE_SIZE } from 'utils/constants';

interface Props {}

const NewStoreActivationViewPage: FC<Props> = () => {
  const dispatch = useDispatch();
  const userState: IUser = useSelector(userSliceSelector);
  const selectedOrgKey = userState.selectedOrg && userState.selectedOrg.orgKey;
  const viewState: ISelectStoreView = useSelector(
    newStoreActivationSliceSelector
  ).storeActivationView;

  useEffect(() => {
    dispatch(
      getStoreNewActivationRequest({
        pageNumber: 1,
        pageSize: STORE_ACTIVATION_PAGE_SIZE,
        filter: [],
        searchKey: viewState.selection.searchKey
      })
    );
  }, []);

  useEffect(() => {
    try {
      const abortController = new AbortController();
      if (selectedOrgKey) {
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
          <ViewHeader />
        </HStack>
        <HStack borderRadius="8px" h="calc(100vh - 165px)" w="full" p="12px" bg={ocean_blue_600}>
          <ViewTableSection />
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
export default NewStoreActivationViewPage;
