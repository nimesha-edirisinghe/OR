import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppCheckbox from 'components/newTheme/AppCheckbox/AppCheckbox';
import { FC } from 'react';
import { neutral_100, neutral_200 } from 'theme/colors';
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
  const width = isReadOnly ? '359px' : '700px';

  return (
    <HStack w="full" h="35px" borderBottom={'1px solid black'}>
      <HStack w={width} alignItems="center" h="full" p="8px" borderRight={'1px solid black'}>
        <AppText size={'body2'} fontWeight={400} color={neutral_200}>
          {factor?.label}
        </AppText>
      </HStack>
      <HStack w={'100px'} alignItems="start" h="full" p="8px" borderRight={'1px solid black'}>
        <AppCheckbox
          id={1}
          isChecked={factor?.anchor || false}
          onChange={(e: any) => {
            onChangeHandler(factor.label || '', InfluencingFactorTypesEnum.ANCHOR, e);
          }}
          isDisabled={isReadOnly}
          disabledColor={neutral_100}
        />
      </HStack>
      <HStack w={'96px'} alignItems="start" h="full" p="8px">
        <AppCheckbox
          id={2}
          isChecked={factor.sku || false}
          onChange={(e: any) =>
            onChangeHandler(factor.label || '', InfluencingFactorTypesEnum.SKU, e)
          }
          isDisabled={isReadOnly}
          disabledColor={neutral_100}
        />
      </HStack>
    </HStack>
  );
};

export default InfluencingFactorItem;
