import { VStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { CSSProperties, FC } from 'react';
import { ocean_blue_500, ocean_blue_100, ocean_blue_400 } from 'theme/colors';

export const editedReplPopoverStyles: CSSProperties = {
  maxWidth: '300px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

interface Props {}

const ReplEditedPopoverContent: FC<Props> = () => {
  return (
    <VStack
      w="300px"
      bg={ocean_blue_500}
      borderRadius="8px"
      p="12px"
      border="1px solid"
      borderColor={ocean_blue_400}
      spacing={0}
      boxShadow="0px 12px 20px 0px #001019"
      zIndex={15}
    >
      <AppText size="body3" fontWeight={400} lineHeight="18px" color={ocean_blue_100}>
        This replenishment has been manually overridden
      </AppText>
    </VStack>
  );
};

export default ReplEditedPopoverContent;
