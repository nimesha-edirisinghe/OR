import { FC } from 'react';
import { Box, Flex, FlexProps } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { GroupTypes } from 'types/groupConfig';
import { ocean_blue_100, ocean_blue_200, yellow_500 } from 'theme/colors';

interface Props extends FlexProps {
  onTabChange: (value: GroupTypes) => void;
  displayName: string;
  isActive: boolean;
  tabType: GroupTypes;
  groupCount: number;
}

const TabHeader: FC<Props> = ({
  onTabChange,
  displayName,
  isActive,
  tabType,
  groupCount,
  ...rest
}) => {
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
      <AppText size="14_500" color={isActive ? yellow_500 : ocean_blue_200}>
        {displayName}
      </AppText>

      <Box borderRadius="4px" minW="24px" h="26px" bg="#f8f8f81a" ml="10px" pt="3.5px" px="8px">
        <AppText fontSize="12px" fontWeight={600} color={ocean_blue_100} textAlign="center">
          {groupCount}
        </AppText>
      </Box>

      {isActive ? (
        <Box
          as={motion.div}
          layoutId="underline"
          position="absolute"
          bg={yellow_500}
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
