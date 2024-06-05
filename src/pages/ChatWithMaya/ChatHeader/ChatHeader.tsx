import { motion, AnimatePresence } from 'framer-motion';
import { Box, HStack, Img, VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { linear_white_black_100 } from 'theme/colors';
import { MayaLogo } from 'assets/images/mayaLogo';

interface Props {}

const ChatHeader: FC<Props> = () => {
  const firstAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <VStack h="45px" w="640px">
      <AnimatePresence>
        <motion.div key="1" {...firstAnimation}>
          <VStack justify="center" spacing="8px">
            <Img style={{ width: '64px', height: '64px' }} src={MayaLogo} />
            <AppText size="h1Semibold">Maya</AppText>
          </VStack>
        </motion.div>
      </AnimatePresence>
      <HStack w="full">
        <Box w="full" h="1px" background={linear_white_black_100}></Box>
      </HStack>
    </VStack>
  );
};

export default ChatHeader;
