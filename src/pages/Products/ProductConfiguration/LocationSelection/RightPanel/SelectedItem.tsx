import { FC, useState } from 'react';
import { HStack, VStack, Divider } from '@chakra-ui/layout';
import { FlexboxProps } from '@chakra-ui/react';
import { KeyValueI } from 'types/responses/insightResponses';
import AppText from 'components/newTheme/AppText/AppText';
import { motion } from 'framer-motion';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { neutral_200, ocean_blue_400 } from 'theme/colors';

interface Props extends FlexboxProps {
  item: KeyValueI;
  addOrRemoveItem?: (status: boolean, item: KeyValueI) => void;
}

const SelectedItem: FC<Props> = ({ item, addOrRemoveItem, ...rest }) => {
  const [onPanelHover, setOnPanelHover] = useState(false);
  return (
    // <VStack
    //   pb="10px"
    //   w="full"
    //   align="start"
    //   {...rest}
    //   as={motion.div}
    //   initial={{ y: '-10px' }}
    //   animate={{ y: '0px' }}
    //   exit={{ y: '-10px' }}
    //   transition=".6s"
    //   key={item.key}
    // >
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
        // <AppIconChakra
        //   name="close"
        //   fill="left-menu-icon-color"
        //   _hover={{ fill: 'left-menu-icon-hover-color' }}
        //   width="12px"
        //   height="12px"
        //   cursor="pointer"
        //   transition="transform 1s ease"
        //   onClick={() => addOrRemoveItem && addOrRemoveItem(false, item)}
        // />
      )}
    </HStack>
    // </VStack>
  );
};

export default SelectedItem;
