import { Box, HStack } from '@chakra-ui/react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { neutral_100, ocean_blue_50 } from 'theme/colors';

interface Props {
  label: string;
  value: string;
}

const ModelDetailsItem: FC<Props> = ({ label, value }) => {
  return (
    <HStack w="full" h="18px">
      <Box minW="200px" h="full">
        <AppText color={ocean_blue_50} size="body3">
          {label}
        </AppText>
      </Box>
      <HStack>
        <AppText color={neutral_100} size="h5Semibold">
          :
        </AppText>
        <AppText color={neutral_100} size="h5Semibold" noOfLines={1}>
          {value?.length > 20 ? (
            <AppTooltip label={value} placement="top-start">
              <span>{value}</span>
            </AppTooltip>
          ) : (
            <span>{value}</span>
          )}
        </AppText>
      </HStack>
    </HStack>
  );
};

export default ModelDetailsItem;
