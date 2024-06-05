import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppDropdown from 'components/newTheme/AppDropdown/AppDropdown';
import AppInputGroup from 'components/newTheme/AppInputGroup/AppInputGroup';
import { SKU_LIST } from 'mocks/product/skuList';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IProductNewActivationView,
  configDetailsInputType,
  newProductActivationSliceSelector,
  updateConfigUpdateInput
} from 'state/pages/product/newActivation/productNewActivationState';
import { neutral_400 } from 'theme/colors';

interface IProps {
  selectedSKU: string;
}

const SearchSKU: FC<IProps> = ({ selectedSKU }) => {
  const dispatch = useDispatch();
  //const state= useSelector(newProductActivationSliceSelector).skuSelectionView;
  const viewState: IProductNewActivationView = useSelector(newProductActivationSliceSelector);
  const inputState = viewState.configDetailView.configDetailsInput;

  const handleInputChange = (key: configDetailsInputType, value: any) => {
    dispatch(updateConfigUpdateInput({ key: key, value: value }));
  };
  return (
    <VStack w="full">
      <HStack h="full" w="full" spacing="20px">
        <AppText size="body2" color={neutral_400} lineHeight="18px">
          {inputState.isSuccessor ? 'Predecessor ' : 'Similar'} SKU
        </AppText>
      </HStack>
      <HStack h="full" w="full" spacing="20px">
        <AppDropdown
          options={SKU_LIST}
          buttonWidth="480px"
          height="36px"
          handleItemClick={(value) => handleInputChange('selectedSKU', value)}
          selectedItem={selectedSKU}
          isDisabled={false}
          isEnableSearch={true}
        />
      </HStack>
    </VStack>
  );
};

export default SearchSKU;
