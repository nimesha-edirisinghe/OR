import { HStack, VStack } from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IProductNewActivationView,
  newProductActivationSliceSelector,
  resetConfigDetailsData,
  resetSelectionData
} from 'state/pages/product/newActivation/productNewActivationState';
import { ocean_blue_600 } from 'theme/colors';
import { timeStampToDateString } from 'utils/utility';
import PhaseIn from './ConfigurationDetailsPanel/PhaseIn';
import Successor from './ConfigurationDetailsPanel/Successor';
import PhaseOut from './ConfigurationDetailsPanel/PhaseOut';
import SearchSKU from './ConfigurationDetailsPanel/SearchSKU';
import SelectMethod from './ConfigurationDetailsPanel/SelectMethod';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from 'state/toast/toastState';

interface ConfiGurationDetailsSummaryProps {}
const ConfigurationDetailsSummary: FC<ConfiGurationDetailsSummaryProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewState: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const inputState = viewState.configDetailView.configDetailsInput;

  const onClearHandler = () => {
    dispatch(resetConfigDetailsData());
  };

  const onSaveHandler = () => {
    const { phaseIn, isSuccessor, phaseOut, selectedSKU, selectedMethod, percentage, baseValue } =
      inputState;

    const validations = [
      { condition: phaseIn === '', message: 'Please select phaseIn' },
      { condition: !isSuccessor, message: 'Please select successor' },
      { condition: phaseOut === '', message: 'Please select phaseOut' },
      { condition: selectedSKU === '', message: 'Please select SKU' },
      { condition: selectedMethod === '', message: 'Please select data points collection method' },
      {
        condition: selectedMethod === 'As a percentage of the similar product' && percentage === '',
        message: 'Please enter percentage'
      },
      {
        condition:
          selectedMethod === 'Mimic the category trend with a base value' && baseValue === '',
        message: 'Please enter base value'
      }
    ];

    const invalidValidation = validations.find((validation) => validation.condition);
    if (invalidValidation) {
      showErrorToast(invalidValidation.message);
      return;
    }

    showSuccessToast('Product Activation initiated');
    dispatch(resetSelectionData());
    navigate('/app/products/new-activation');
  };

  return (
    <VStack w="full">
      <VStack w="full" bg={ocean_blue_600} p="20px">
        <PhaseIn selectedDate={timeStampToDateString(inputState.phaseIn as number, 'yyyy-MM-dd')} />
        <Successor selected={inputState.isSuccessor} />
        {inputState.isSuccessor && (
          <PhaseOut
            selectedDate={timeStampToDateString(inputState.phaseOut as number, 'yyyy-MM-dd')}
          />
        )}
        <SearchSKU selectedSKU={inputState.selectedSKU} />
      </VStack>
      <VStack w="full" bg={ocean_blue_600} p="20px">
        <SelectMethod />
      </VStack>
      <HStack w="full" justify="space-between" spacing="12px" pt="10px" pb="10px">
        <AppButton variant="secondary" size="medium" onClick={onClearHandler} px="25px">
          Clear
        </AppButton>
        <HStack>
          <AppButton
            variant="secondary"
            size="medium"
            onClick={() => navigate('/app/products/new-activation/location-selection')}
            px="25px"
          >
            Previous
          </AppButton>
          <AppButton variant="primary" size="medium" onClick={onSaveHandler} px="25px">
            Save & Activate
          </AppButton>
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ConfigurationDetailsSummary;
