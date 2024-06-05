import { VStack } from '@chakra-ui/react';
import { CSSProperties, FC } from 'react';
import { ocean_blue_500, ocean_blue_400 } from 'theme/colors';
import { GetLastUpdatedDataI } from 'types/responses/common/common';
import LastLoginItem from './LastLoginItem';

export const lastLoginPopoverStyles: CSSProperties = {
  maxWidth: '173px',
  margin: 0,
  borderRadius: '8px',
  borderColor: ocean_blue_400,
  marginTop: '-6.5px'
};

interface Props {
  lastLoginDateObj: GetLastUpdatedDataI;
}

const LastLoginPopoverContent: FC<Props> = ({ lastLoginDateObj }) => {
  const { sales, inventory, promotion } = lastLoginDateObj;
  return (
    <VStack
      w="173px"
      bg={ocean_blue_500}
      borderRadius="8px"
      py="4px"
      px="8px"
      border="1px solid"
      borderColor={ocean_blue_400}
      spacing="4px"
      boxShadow="0px 12px 20px 0px #001019"
      zIndex={15}
      align="start"
    >
      <LastLoginItem label="Sales" value={sales} />
      <LastLoginItem label="Inventory" value={inventory} />
      <LastLoginItem label="Promotion" value={promotion} />
    </VStack>
  );
};

export default LastLoginPopoverContent;
