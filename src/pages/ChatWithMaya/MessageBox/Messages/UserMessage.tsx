import { Box } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { blue_700, neutral_200 } from 'theme/colors';
import { motion } from 'framer-motion';

interface Props {
  message: string;
  id: string;
  onClickHandler: (id: string) => void;
}

const UserMessage: FC<Props> = ({ message, id, onClickHandler }) => {
  return (
        <>
    {message && 
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
          as={motion.div}
          h="auto"
          maxW="640px"
          bg={blue_700}
          p="12px"
          borderRadius="8px"
          alignSelf="flex-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition="0.3s"
          onClick={() => onClickHandler(id)}
          cursor="pointer"
        >
          <AppText size="body2" color={neutral_200}>
            {message}
          </AppText>
        </Box>
      </motion.div>
    </motion.div>
     }
    </>
  );
};

export default UserMessage;
