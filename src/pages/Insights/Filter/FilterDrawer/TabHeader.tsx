import { FC } from 'react';
import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { TabType } from './FilterDrawer';

interface Props extends FlexProps {
  onTabChange: (value: TabType) => void;
  displayName: string;
  isActive: boolean;
  tabType: TabType;
}

const TabHeader: FC<Props> = ({ onTabChange, displayName, isActive, tabType, ...rest }) => {
  return (
    <Flex
      h="full"
      align="center"
      justify="center"
      onClick={() => onTabChange(tabType)}
      cursor="pointer"
      as={motion.div}
      {...rest}
      position="relative"
    >
      <AppText size="14_500" color={isActive ? '#F7CC45' : ''}>
        {displayName}
      </AppText>
      {isActive ? (
        <Box
          as={motion.div}
          layoutId="underline"
          position="absolute"
          bg="#F7CC45"
          h="2px"
          w="full"
          bottom="0px"
          left="0px"
        ></Box>
      ) : null}
    </Flex>
  );
};

export default TabHeader;
