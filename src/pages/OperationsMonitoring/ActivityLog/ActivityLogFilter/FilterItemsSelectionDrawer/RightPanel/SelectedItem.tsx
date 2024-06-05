import { FC, useState } from 'react';
import { HStack } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { FlexboxProps } from '@chakra-ui/react';
import { KeyValueI } from 'types/responses/insightResponses';
import { neutral_200, ocean_blue_400 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { motion } from 'framer-motion';

interface Props extends FlexboxProps {
  item: KeyValueI;
  addOrRemoveItem?: (status: boolean, item: KeyValueI) => void;
}

const SelectedItem: FC<Props> = ({ item, addOrRemoveItem, ...rest }) => {
  const [onPanelHover, setOnPanelHover] = useState(false);

  return (
    <HStack
      spacing={0}
      justify="space-between"
      w="full"
      py="4px"
      pl="12px"
      pr="8px"
      role="group"
      _hover={{ bg: ocean_blue_400 }}
      as={motion.div}
      initial={{ y: '-10px' }}
      animate={{ y: '0px' }}
      exit={{ y: '-10px' }}
      onMouseEnter={() => setOnPanelHover(true)}
      onMouseLeave={() => setOnPanelHover(false)}
      key={item.key}
      minH="32px"
    >
      <AppText
        size="body2"
        color={neutral_200}
        _groupHover={{ bg: ocean_blue_400 }}
        wordBreak={'break-all'}
      >
        {item.value}
      </AppText>
      {onPanelHover && addOrRemoveItem && (
        <AppIcon
          name="cross"
          stroke={neutral_200}
          _groupHover={{ bg: ocean_blue_400 }}
          h="24px"
          w="24px"
          cursor="pointer"
          onClick={() => addOrRemoveItem && addOrRemoveItem(false, item)}
        />
      )}
    </HStack>
  );
};

export default SelectedItem;
