import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { newProductActivationSliceSelector } from 'state/pages/product/newActivation/productNewActivationState';
import { neutral_200 } from 'theme/colors';

interface Iprops {}
const ConfigurationHeader: FC<Iprops> = () => {

  const [selectionCount,setSelectionCount] = useState<number | undefined>(0);

  const state = useSelector(newProductActivationSliceSelector).locationSelectionView;

  

  useEffect(()=>{
    if(state.selection.selectedLocation.isSelectAll){
      setSelectionCount(state.selection.selectedLocation.outOfCount)
    }else{
      setSelectionCount(Object.keys(state.selection.selectedLocationCodes).length)
    }
  },[])
  return (
    <VStack mt={'70px'} w="full">
      <HStack h="full" w="full" spacing="20px" justify="flex-start">
        <AppText
          color={neutral_200}
          fontSize="13px"
          fontWeight={400}
          lineHeight="24px"
          _groupHover={{ color: '#000' }}
        >
          Please provide the following information, which will be used to create accurate forecasts and replenishment schedules for the {selectionCount} locations where the SKU is being launched.
        </AppText>
      </HStack>
    </VStack>
  );
};

export default ConfigurationHeader;
