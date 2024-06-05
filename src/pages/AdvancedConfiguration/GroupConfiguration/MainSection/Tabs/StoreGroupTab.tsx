import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import StoreGroup from '../StoreGroup/StoreGroup';

interface StoreGroupTabProps {}

const StoreGroupTab: FC<StoreGroupTabProps> = () => {
  return (
    <Box w="full">
      <StoreGroup />
    </Box>
  );
};

export default StoreGroupTab;
