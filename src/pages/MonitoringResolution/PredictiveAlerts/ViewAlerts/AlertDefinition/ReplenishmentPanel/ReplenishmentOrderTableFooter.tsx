import { Box, HStack } from '@chakra-ui/react';
import { AppIcon } from 'components/AppIcon/AppIcon';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_200, ocean_blue_400 } from 'theme/colors';

interface ReplenishmentOrderTableFooterProps {
  addNewCell: () => void;
}

const ReplenishmentOrderTableFooter: FC<ReplenishmentOrderTableFooterProps> = ({ addNewCell }) => {
  return (
    <td colSpan={6}>
      <Box bg={ocean_blue_400} w="full" h="36px" p="8px">
        <HStack w="135px" spacing="4px" onClick={addNewCell} cursor="pointer">
          <AppIcon name="plus" fill={neutral_200} w="10.5px" h="10.5px" />
          <AppText fontSize="13px" fontWeight="400" color={neutral_200}>
            Add another order
          </AppText>
        </HStack>
      </Box>
    </td>
  );
};

export default ReplenishmentOrderTableFooter;
