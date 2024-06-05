import { Box, HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { blue_500, neutral_100, ocean_blue_400 } from 'theme/colors';

interface Props {
  label: string;
  value: string;
}

const AccuracyItem: FC<Props> = ({ label, value }) => {
  return (
    <HStack
      h="22px"
      px="8px"
      bg={ocean_blue_400}
      borderRadius="4px"
      justify="space-between"
      minW="123px"
      spacing="2px"
    >
      <Box minW="76px">
        <AppText size="body3" color={neutral_100} noOfLines={1} style={{ wordBreak: 'break-all' }}>
          {label}
        </AppText>
      </Box>
      <AppText size="h5Semibold" color={blue_500}>
        {value}%
      </AppText>
    </HStack>
  );
};

export default AccuracyItem;
