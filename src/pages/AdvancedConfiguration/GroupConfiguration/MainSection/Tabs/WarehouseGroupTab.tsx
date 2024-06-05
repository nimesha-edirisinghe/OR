import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import WarehouseGroup from '../WarehouseGroup/WarehouseGroup';

interface WarehouseGroupTabProps {}

const WarehouseGroupTab: FC<WarehouseGroupTabProps> = () => {
  return (
    <Box h="calc(100vh - 265px)" w="full">
      <WarehouseGroup />
    </Box>
  );
};

export default WarehouseGroupTab;
