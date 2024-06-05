import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { neutral_200, ocean_blue_600 } from 'theme/colors';
import TypingDots from 'components/newTheme/TypingDots/TypingDots';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { useTimedState } from 'hooks/useTimeState';

interface Props {
  message: string;
  loadingReply?: boolean;
}

const MayaReply: FC<Props> = ({ message, loadingReply = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, handleCopyClick] = useTimedState(false);
  const [isLiked, likeHandler] = useTimedState(false);
  const [isDisliked, dislikeHandler] = useTimedState(false);

  const copyHandler = () => {
    if (message && typeof message === 'string') {
      navigator.clipboard.writeText(message);
    }
    handleCopyClick();
  };

  const renderLoadingDots = useCallback(() => {
    return (
      <Box h="auto" w="640px" py="9.75px">
        <TypingDots />
      </Box>
    );
  }, []);

  const renderMessage = useCallback(() => {
    return (
      <AppText size="body2" color={neutral_200}>
        {message}
      </AppText>
    );
  }, [message]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Box
          h="auto"
          w="750px"
          onMouseEnter={() => {
            !loadingReply && setIsHovered(true);
          }}
          onMouseLeave={() => {
            !loadingReply && setIsHovered(false);
          }}
        >
          <HStack
            h="auto"
            maxW="640px"
            bg={ocean_blue_600}
            p="12px"
            borderRadius="8px"
            alignSelf="flex-end"
            pos="relative"
          >
            {loadingReply ? renderLoadingDots() : renderMessage()}
            {isHovered && (
              <HStack h="44px" w="20px" right="-30px" pos="absolute" spacing="20px">
                <AppIcon
                  transition="transform 0.25s ease"
                  name={isCopied ? 'right' : 'copy'}
                  width="20px"
                  height="20px"
                  fill="#0AA5FF"
                  cursor="pointer"
                  onClick={copyHandler}
                />
                <AppIcon
                  transition="transform 0.25s ease"
                  name={isLiked ? 'filledLike' : 'like'}
                  width="20px"
                  height="20px"
                  fill={isLiked ? '#75D785' : '#0AA5FF'}
                  cursor="pointer"
                  onClick={likeHandler}
                />
                <AppIcon
                  transition="transform 0.25s ease"
                  name={isDisliked ? 'filledDislike' : 'dislike'}
                  width="20px"
                  height="20px"
                  fill={isDisliked ? '#F4312A' : '#0AA5FF'}
                  cursor="pointer"
                  onClick={dislikeHandler}
                />
              </HStack>
            )}
          </HStack>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default MayaReply;
