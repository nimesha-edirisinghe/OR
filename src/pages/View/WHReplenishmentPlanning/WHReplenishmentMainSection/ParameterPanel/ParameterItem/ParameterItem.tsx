import { VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_500, yellow_500 } from 'theme/colors';
import { RplParameterObjI } from 'types/replenishmentConfig';

interface ParameterItemProps {
  parameterObject: RplParameterObjI;
}

const ParameterItem: FC<ParameterItemProps> = ({ parameterObject }) => {
  return (
    <VStack
      h="full"
      minW="102px"
      w="full"
      borderRadius="4px"
      bg={ocean_blue_500}
      py="4px"
      px="8px"
      spacing={0}
      align="start"
    >
      <AppText size="caption" color={neutral_200} noOfLines={1}>
        {parameterObject.displayName}
      </AppText>
      <AppText fontSize="13px" fontWeight={600} color={yellow_500}>
        {parameterObject.value}
      </AppText>
    </VStack>
  );
};

export default ParameterItem;
