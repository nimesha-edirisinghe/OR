import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_100, ocean_blue_500, ocean_blue_600 } from 'theme/colors';
import { ChatContextI } from 'types/responses/maya';

interface Props {
  messages: ChatContextI[];
  onCloseHandler: () => void;
  onSelectHandler: (contextId: string, content: string) => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay: index * 0.1
    }
  }),
  exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.5, ease: 'easeInOut' } }
};

const ContextMessages: FC<Props> = ({ messages, onCloseHandler, onSelectHandler }) => {
  const onContextHandler = (contextId: string, content: string) => {
    onSelectHandler(contextId, content);
  };

  return (
    <>
      {messages.length > 0 && (
        <Box p="8px" bg={ocean_blue_600} mt="12px" borderRadius="8px">
          <HStack w="full" mb="8px" justify="space-between">
            <AppText size="h5Semibold" color="#fff">
              What’s on your mind…
            </AppText>
            <Box cursor="pointer" onClick={onCloseHandler}>
              <AppIcon name="cross" stroke={neutral_200} w="20px" h="20px" />
            </Box>
          </HStack>
          <Grid templateColumns="repeat(2, 1fr)" gap="8px">
            {messages.map((msg, index) => {
              return (
                <motion.div
                  key={msg.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <VStack
                    w="100%"
                    h="auto"
                    bg={ocean_blue_500}
                    p="10px"
                    align="start"
                    borderRadius="8px"
                    spacing={0}
                    cursor="pointer"
                    onClick={() => onContextHandler(msg.id, msg.title)}
                  >
                    <AppText size="body2" color={neutral_200}>
                      {msg.title}
                    </AppText>
                    <AppText size="caption" color={ocean_blue_100}>
                      {msg.description}
                    </AppText>
                  </VStack>
                </motion.div>
              );
            })}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ContextMessages;
