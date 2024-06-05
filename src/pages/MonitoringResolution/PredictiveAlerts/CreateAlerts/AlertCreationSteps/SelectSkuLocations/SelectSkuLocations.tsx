import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import SkuSelection from '../AnchorLocationFilter/FilterItemsSelectionDrawer/SkuSelection';
import { motion } from 'framer-motion';

interface SelectSkuLocationsProps {}

const SelectSkuLocations: FC<SelectSkuLocationsProps> = () => {
  return (
    <Box
      overflow="auto"
      w="full"
      height="full"
      borderRadius="10px"
      py="2px"
      userSelect="none"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="1s"
    >
      <SkuSelection />
    </Box>
  );
};

export default SelectSkuLocations;
