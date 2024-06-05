import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_100 } from 'theme/colors';

interface Props {
  skuCount: number;
}

const ReplenishmentConfigGroupNameSubLabel: FC<Props> = ({ skuCount }) => {
  return (
    <HStack>
      <AppText fontSize="10px" fontWeight={400} color={ocean_blue_100}>
        <span style={{ color: ocean_blue_100 }}>{skuCount.toLocaleString('en-US')}</span> SKU-locations
      </AppText>
    </HStack>
  );
};

export default ReplenishmentConfigGroupNameSubLabel;
