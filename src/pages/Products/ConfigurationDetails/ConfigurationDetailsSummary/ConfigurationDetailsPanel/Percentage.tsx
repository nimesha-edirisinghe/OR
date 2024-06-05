import { HStack, VStack } from '@chakra-ui/react';
import AppInput from 'components/AppInput/AppInput';
import AppText from 'components/AppText/AppText';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { configDetailsInputType, updateConfigUpdateInput } from 'state/pages/product/newActivation/productNewActivationState';
import { neutral_100, neutral_400, ocean_blue_500 } from 'theme/colors';

interface IProps {
  percentage:string
}

const Percentage: FC<IProps> = ({percentage}) => {
  const dispatch = useDispatch();

  const handleInputChange = (key: configDetailsInputType, e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateConfigUpdateInput({ key: key, value: e.target.value }));
  };
  return (
    <VStack w="full">
      <HStack h="full" w="full">
      <AppText size="body2" color={neutral_400} lineHeight="18px">
          Percentage (%)
        </AppText>
      </HStack>
      <HStack h="full" w="full">
        <AppInput
          w="480px"
          h="36px"
          fontSize="13px"
          fontWeight={400}
          lineHeight="19.5px"
          color={neutral_100}
          border="none"
          borderRadius="8px"
          bg={ocean_blue_500}
          onChange={(value) => handleInputChange('percentage',value)}
          value={percentage}
        />
      </HStack>
    </VStack>
  );
};

export default Percentage;
