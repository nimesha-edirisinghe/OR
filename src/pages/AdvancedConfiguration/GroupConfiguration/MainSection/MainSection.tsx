import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import TabHeader from './Tabs/TabHeader';

interface MainSectionProps {}

const MainSection: FC<MainSectionProps> = () => {
  return (
    <Box w="full" h="full">
      <TabHeader />
    </Box>
  );
};

export default MainSection;
