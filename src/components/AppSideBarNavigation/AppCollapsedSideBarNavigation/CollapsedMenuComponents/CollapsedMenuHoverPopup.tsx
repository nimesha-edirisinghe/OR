import { Box } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { ocean_blue_500 } from 'theme/colors';

interface Props {
  boxRef: any;
  yPos: number | null;
  children: ReactNode;
  pos?: { x: number; y: number };
}

const CollapsedMenuHoverPopup: FC<Props> = ({ children, boxRef, pos, yPos }) => {
  return (
    <Box
      pos="absolute"
      bg={ocean_blue_500}
      w="196px"
      borderRightRadius="8px"
      ref={boxRef}
      zIndex={20}
      left="56px"
      top={`${yPos}px`}
    >
      {children}
    </Box>
  );
};

export default CollapsedMenuHoverPopup;
