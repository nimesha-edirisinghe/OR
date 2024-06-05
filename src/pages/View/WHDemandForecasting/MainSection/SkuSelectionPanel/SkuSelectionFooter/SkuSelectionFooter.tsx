import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE } from 'config/constants';
import { FC } from 'react';

interface Props {
  totalItems: number;
  currentPage?: number;
}

const SkuSelectionFooter: FC<Props> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE) + 1;
  const endItem = Math.min(
    startItem + Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE) - 1,
    totalItems
  );

  return (
    <HStack>
      <AppText
        size="body2"
        color={'#3E637B'}
      >{`Showing only first ${endItem} out of ${totalItems} Forecasts`}</AppText>
    </HStack>
  );
};

export default SkuSelectionFooter;
