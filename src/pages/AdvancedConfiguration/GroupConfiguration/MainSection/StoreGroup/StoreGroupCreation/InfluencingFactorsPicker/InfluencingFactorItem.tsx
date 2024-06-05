import { Center, Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { FC } from 'react';
import { GroupLabelI, InfluencingFactorTypes } from 'types/groupConfig';
import { InfluencingFactorTypesEnum } from 'utils/enum';

interface InfluencingFactorItemProps {
  factor: GroupLabelI;
  isReadOnly?: boolean;
  onChangeHandler: (factorName: string, type: InfluencingFactorTypes, checked: boolean) => void;
}

const InfluencingFactorItem: FC<InfluencingFactorItemProps> = ({
  factor,
  onChangeHandler,
  isReadOnly = false
}) => {
  return (
    <HStack justify="space-between" w="full" h="35px">
      <Flex flex={4.5} alignItems="center" h="full" pt="6px">
        <AppText fontSize="13px" fontWeight={400}>
          {factor?.label}
        </AppText>
      </Flex>
      <Center flex={1} alignItems="center" h="full" pt="8px">
        <AppCheckbox
          id={1}
          isChecked={factor?.anchor || false}
          onChange={(e: any) => {
            onChangeHandler(factor.label || '', InfluencingFactorTypesEnum.ANCHOR, e);
          }}
          isDisabled={isReadOnly}
        />
      </Center>
      <Center flex={1} alignItems="center" h="full" pt="8px">
        <AppCheckbox
          id={2}
          isChecked={factor.sku || false}
          onChange={(e: any) =>
            onChangeHandler(factor.label || '', InfluencingFactorTypesEnum.SKU, e)
          }
          isDisabled={isReadOnly}
        />
      </Center>
    </HStack>
  );
};

export default InfluencingFactorItem;
