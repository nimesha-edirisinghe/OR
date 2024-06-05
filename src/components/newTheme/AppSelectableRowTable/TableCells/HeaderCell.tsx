import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import AppTooltip from 'components/AppTooltip/AppTooltip';
import { ocean_blue_500 } from 'theme/colors';

interface Props {
  children: string;
}

const HeaderCell: FC<Props> = ({ children }) => {
  return (
    <HStack
      py="7.5px"
      px="8px"
      w="120px"
      justifyContent="space-between"
      h="36px"
      bg={ocean_blue_500}
    >
      <AppText size="h4Semibold" noOfLines={1} align="start" py="7.5px">
        {children?.length > 18 ? (
          <AppTooltip label={children} placement="auto-start">
            <span>{children}</span>
          </AppTooltip>
        ) : (
          <span>{children}</span>
        )}
      </AppText>
    </HStack>
  );
};

export default HeaderCell;
