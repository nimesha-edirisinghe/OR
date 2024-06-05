import { Box, HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/newTheme/AppButton/AppButton';

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addOrRemoveLocationSelection,
  newProductActivationSliceSelector,
  resetLocationSelectionData,
  setLocationSelectedAll
} from 'state/pages/product/newActivation/productNewActivationState';
import { KeyValueI } from 'types/responses/insightResponses';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import { showErrorToast } from 'state/toast/toastState';

interface Props {}
const LocationSelectionPanel: FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector(newProductActivationSliceSelector).locationSelectionView;

  const addOrRemoveSkuSelectionHandler = (status: boolean, item: KeyValueI) => {
    dispatch(addOrRemoveLocationSelection({ status: status, item: item }));
  };

  const onClearHandler = () => {
    dispatch(resetLocationSelectionData());
  };

  const onSaveHandler = () => {
    if (!state.selection.selectedLocation.isSelectAll){
      if (Object.keys(state.selection.selectedLocationCodes).length == 0){
        showErrorToast('Please select at least one Location');
        return;
      }
    }
    navigate('/app/products/new-activation/configuration-details');
  };

  return (
    <VStack mt={'50px'} w="full">
      <Box w="full" overflowX="auto">
        <HStack h="full" spacing="20px" align="start">
          <Box flex={1} h="calc(100vh - 310px)">
            <LeftPanel
              addOrRemoveItem={addOrRemoveSkuSelectionHandler}
              filterItem={state.selection.selectedLocation}
              filterItemListData={state.data.locationData}
              title="List of Location"
              onSelectAll={(e) => dispatch(setLocationSelectedAll({ selectAll: e }))}
              isLoading={state.data.loading}
            />
          </Box>
          <Box flex={1} h="calc(100vh - 310px)">
            <RightPanel
              selectedRightSideItem={state.selection.selectedLocation}
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
                navigate('/app/products/new-activation');
              }}
              px="25px"
            >
              Previous
            </AppButton>
            <AppButton variant="primary" size="medium" onClick={onSaveHandler} px="25px">
              Next
            </AppButton>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LocationSelectionPanel;
