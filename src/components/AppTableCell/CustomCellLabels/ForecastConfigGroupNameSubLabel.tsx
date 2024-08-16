import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';

interface Props {
  anchorCount: number;
  skuCount: number;
}

const ForecastConfigGroupNameSubLabel: FC<Props> = ({ anchorCount, skuCount }) => {
  return (
    <HStack>
      <AppText fontSize="12px" color="#B3B3B3" style={{ userSelect: 'text' }}>
        {anchorCount.toLocaleString('en-US')} Anchors-locations,{' '}
        <span style={{ color: '#fff' }}>{skuCount.toLocaleString('en-US')}</span> SKU-locations
      </AppText>
    </HStack>
  );
};

export default ForecastConfigGroupNameSubLabel;
