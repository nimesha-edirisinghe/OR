import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { layoutSliceSelector } from 'state/layout/layoutState';
import { ocean_blue_350 } from 'theme/colors';

type Props = {
  children: ReactNode;
};

export default function InsightsPageLayout({ children }: Props) {
  const isLeftMenuOpen = useSelector(layoutSliceSelector).leftMenuOpen;

  return (
    <Box
      h="full"
      maxW={isLeftMenuOpen ? 'calc(100vw - 280px)' : 'calc(100vw - 56px)'}
      transition=".2s ease-in"
      overflowX="hidden"
      overflowY="auto"
      __css={{
        '&::-webkit-scrollbar': {
          w: '1'
        },
        '&::-webkit-scrollbar-track': {
          w: '1'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10',
          bg: ocean_blue_350
        }
      }}
    >
      {children}
    </Box>
  );
}
