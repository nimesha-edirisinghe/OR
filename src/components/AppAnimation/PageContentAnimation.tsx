import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PageContentAnimation: FC<Props> = ({ children }) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition="ease-in"
    >
      {children}
    </Box>
  );
};

export default PageContentAnimation;
