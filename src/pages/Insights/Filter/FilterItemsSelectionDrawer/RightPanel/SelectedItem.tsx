import { FC } from 'react';
import { HStack, VStack, Divider } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { FlexboxProps } from '@chakra-ui/react';
import { KeyValueI } from 'types/responses/insightResponses';

interface Props extends FlexboxProps {
  item: KeyValueI;
  addOrRemoveItem?: (status: boolean, item: KeyValueI) => void;
}

const SelectedItem: FC<Props> = ({ item, addOrRemoveItem, ...rest }) => {
  return (
    <VStack pb="10px" w="full" align="start" {...rest}>
      <HStack spacing={0} justify="space-between" w="full">
        <AppText fontSize="14px" fontWeight="400px" lineHeight="22px" wordBreak={'break-all'}>
          {item.value}
        </AppText>
        {addOrRemoveItem && (
          <AppIconChakra
            name="close"
            fill="left-menu-icon-color"
            _hover={{ fill: 'left-menu-icon-hover-color' }}
            width="12px"
            height="12px"
            cursor="pointer"
            transition="transform 1s ease"
            onClick={() => addOrRemoveItem && addOrRemoveItem(false, item)}
          />
        )}
      </HStack>
      <Divider orientation="horizontal" my="8px" />
    </VStack>
  );
};

export default SelectedItem;
