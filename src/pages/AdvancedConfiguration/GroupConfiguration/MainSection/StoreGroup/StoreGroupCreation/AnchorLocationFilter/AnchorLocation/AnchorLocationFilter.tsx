import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';
import AnchorSelectionPanel from './AnchorSelectionPanel';

interface AnchorLocationFilterProps {}

const AnchorLocationFilter: FC<AnchorLocationFilterProps> = () => {
  return (
    <Box
      overflow="auto"
      w="900px"
      height="full"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
    >
      <AnchorSelectionPanel />
    </Box>
  );
};

export default AnchorLocationFilter;
