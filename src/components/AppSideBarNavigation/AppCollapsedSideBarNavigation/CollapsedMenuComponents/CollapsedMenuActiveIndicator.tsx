import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { blue_500 } from 'theme/colors';

const CollapsedMenuActiveIndicator: FC = () => {
  return <Box w="2px" h="full" bg={blue_500} pos="absolute" left={0} top={0} />;
};

export default CollapsedMenuActiveIndicator;
