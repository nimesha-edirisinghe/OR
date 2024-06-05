import { Box, HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addOrRemoveSkuSelection,
  newStoreActivationSliceSelector,
  resetSkuSelectionData,
  setSkuSelectedAll
} from 'state/pages/stores/newActivation/storeNewActivationState';
import { KeyValueI } from 'types/responses/insightResponses';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from 'state/toast/toastState';

interface Props {}
const SkuSelectionPanel: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector(newStoreActivationSliceSelector).skuSelectionView;

  const addOrRemoveSkuSelectionHandler = (status: boolean, item: KeyValueI) => {
    dispatch(addOrRemoveSkuSelection({ status: status, item: item }));
  };

  const onClearHandler = () => {
    dispatch(resetSkuSelectionData());
  };

  const handleNextClick = () => {
    if (!state.selection.selectedSkus.isSelectAll){
      if (Object.keys(state.selection.selectedSkuCodes).length == 0){
        showErrorToast('Please select at least one SKU');
        return;
      }
    }
    navigate('/app/stores/new-activation/detail-selection');
  };

  return (
    <VStack mt={'50px'} w="full">
      <Box w="full" overflowX="auto">
        <HStack h="full" spacing="20px" align="start">
          <Box flex={1} h="calc(100vh - 310px)">
            <LeftPanel
              addOrRemoveItem={addOrRemoveSkuSelectionHandler}
              filterItem={state.selection.selectedSkus}
              filterItemListData={state.data.skuData}
              title="SKU"
              onSelectAll={(e) => dispatch(setSkuSelectedAll({ selectAll: e }))}
              isLoading={state.data.loading}
            />
          </Box>
          <Box flex={1} h="calc(100vh - 310px)">
            <RightPanel
              selectedRightSideItem={state.selection.selectedSkus}
              addOrRemoveItem={addOrRemoveSkuSelectionHandler}
              defaultMessage=""
            />
          </Box>
        </HStack>
        <HStack w="full" justify="space-between" spacing="12px" pt="20px">
          <AppButton variant="secondary" size="medium" onClick={onClearHandler}>
            Clear
          </AppButton>
          <HStack w="full" justify="end" spacing="12px">
            <AppButton
              variant="secondary"
              size="medium"
              onClick={() => {
                navigate('/app/stores/new-activation');
              }}
              px="25px"
            >
              Previous
            </AppButton>
            <AppButton variant="primary" size="medium" onClick={handleNextClick} px="25px">
              Next
            </AppButton>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default SkuSelectionPanel;
