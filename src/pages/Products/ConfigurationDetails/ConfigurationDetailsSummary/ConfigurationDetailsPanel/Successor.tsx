import { HStack, VStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  configDetailsInputType,
  updateConfigUpdateInput
} from 'state/pages/product/newActivation/productNewActivationState';
import { ocean_blue_200, ocean_blue_300 } from 'theme/colors';

interface IProps {
  selected: boolean;
}

const Successor: FC<IProps> = ({ selected }) => {
  const dispatch = useDispatch();

  const handleInputChange = (key: configDetailsInputType, value: any) => {
    dispatch(updateConfigUpdateInput({ key: key, value: value }));
  };

  return (
    <VStack w="full">
      <HStack w="full">
        <AppCheckbox
          id={0}
          isDisabled={false}
          isChecked={selected}
          onChange={(isChecked) => handleInputChange('isSuccessor', isChecked)}
        />
        <AppText fontSize="13px" fontWeight={400} color={ocean_blue_200}>
          Successor
        </AppText>
        <AppIcon name="infoCircle" fill={ocean_blue_300} w="14px" h="14px" />
      </HStack>
    </VStack>
  );
};

export default Successor;
