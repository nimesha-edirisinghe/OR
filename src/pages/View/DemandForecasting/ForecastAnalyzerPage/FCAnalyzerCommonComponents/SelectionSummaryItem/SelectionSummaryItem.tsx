import { Box, HStack } from '@chakra-ui/react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import AppText from 'components/newTheme/AppText/AppText';
import { FC } from 'react';
import { yellow_500 } from 'theme/colors';

interface Props {
  label?: string;
  value?: string;
}

const SelectionSummaryItem: FC<Props> = ({ label = '', value = '' }) => {
  return (
    <HStack>
      <HStack minW="125px" h="full" justify="space-between">
        <AppText size="body3">{label}</AppText>
        <AppText size="body3"> :</AppText>
      </HStack>
      <Box>
        <AppText size="body3" color={yellow_500} noOfLines={1}>
          {value?.length > 28 ? (
            <AppTooltip label={value} placement="auto">
              <span>{value}</span>
            </AppTooltip>
          ) : (
            <span>{value}</span>
          )}
        </AppText>
      </Box>
    </HStack>
  );
};

export default SelectionSummaryItem;
