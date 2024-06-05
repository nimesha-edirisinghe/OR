import { FC } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import AppBreadcrumb from 'components/AppBreadcrumb/AppBreadcrumb';

interface GroupConfigHeaderProps {}

const GroupConfigHeader: FC<GroupConfigHeaderProps> = () => {
  const breadcrumbItems = [{ label: 'Advanced Configuration', path: '/app/group-config' }];

  return (
    <Box overflow="auto" w="full" height="full" py="2px" userSelect="none">
      <VStack justify="start" align="left" spacing="0">
        <Box>
          <AppBreadcrumb items={breadcrumbItems} />
        </Box>
        <Box>
          <AppText fontSize="20px" fontWeight={600} lineHeight="28px">
            Group Configurations
          </AppText>
        </Box>
      </VStack>
    </Box>
  );
};

export default GroupConfigHeader;
