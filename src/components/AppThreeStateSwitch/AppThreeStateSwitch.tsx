import { FC, useEffect, useState } from 'react';
import { Box, Flex, HStack, Center } from '@chakra-ui/layout';
import AppText from 'components/AppText/AppText';
import { AnimatePresence, motion } from 'framer-motion';
import { blue_500, neutral_600, ocean_blue_400, ocean_blue_600, white } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface Props {
  count: number;
  onChange: (state: number) => void;
}

type ButtonJustifyType = 'center' | 'right' | 'left';

const AppThreeStateSwitch: FC<Props> = ({ onChange, count }) => {
  const [justifyState, setJustifyState] = useState<ButtonJustifyType>('center');

  useEffect(() => {
    let btnState: ButtonJustifyType = 'center';
    if (count === 1) btnState = 'right';
    if (count === -1) btnState = 'left';
    setJustifyState(btnState);
  }, [count]);

  return (
    <AnimatePresence>
      <HStack cursor="pointer">
        {/* <AppText color={blue_500} onClick={() => onChange(count > -1 ? count - 1 : -1)}>
          -
        </AppText> */}
        <Flex
          bg={ocean_blue_600}
          justify={justifyState}
          align="center"
          borderRadius="4px"
          p="2px"
          gap="2px"
          w="80px"
          h="28px"
          border="1px"
          borderColor={ocean_blue_400}
        >
          <Box
            className="controller"
            bg={justifyState === 'left' ? blue_500 : 'transparent'}
            w="24px"
            h="24px"
            onClick={() => onChange(-1)}
            as={motion.div}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            exit={{ x: 20 }}
            transition=".3s"
            borderRadius="4px"
            border="0px 1px 0px 0px"
            alignItems="center"
            textAlign="center"
          >
            <AppIcon name="minus" fill={white} w="9.33px" h="9.33px" />
          </Box>
          <Box
            className="controller"
            bg={justifyState === 'center' ? blue_500 : 'transparent'}
            w="24px"
            h="24px"
            onClick={() => onChange(0)}
            as={motion.div}
            transition=".3s"
            borderRadius="4px"
            border="0px 1px 0px 0px"
            alignItems="center"
            textAlign="center"
          >
            <AppIcon name="circle" fill={white} w="9.33px" h="9.33px" />
          </Box>
          <Box
            className="controller"
            bg={justifyState === 'right' ? blue_500 : 'transparent'}
            w="24px"
            h="24px"
            onClick={() => onChange(1)}
            as={motion.div}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            exit={{ x: -20 }}
            transition=".3s"
            borderRadius="4px"
            border="0px 1px 0px 0px"
            alignItems="center"
            textAlign="center"
          >
            <AppIcon name="plus" fill={white} w="9.33px" h="9.33px" />
          </Box>
        </Flex>
        {/* <AppText color={blue_500} onClick={() => onChange(count < 1 ? count + 1 : 1)}>
          +
        </AppText> */}
      </HStack>
    </AnimatePresence>
  );
};

export default AppThreeStateSwitch;
