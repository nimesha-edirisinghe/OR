import { HStack } from '@chakra-ui/react';
import AppText from 'components/newTheme/AppText/AppText';
import { REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE } from 'config/constants';
import { FC } from 'react';
import { neutral_400 } from 'theme/colors';

interface Props {
  totalItems: number;
  currentPage?: number;
}

const FooterSection: FC<Props> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE) + 1;
  const endItem = Math.min(
    startItem + Number(REACT_APP_VIEW_FORECAST_SKU_PAGE_SIZE) - 1,
    totalItems
  );

  return (
    <HStack>
      <AppText size="body2" color={neutral_400}>
        {`Showing only first ${endItem} out of ${totalItems} SKU-locations`}
      </AppText>
    </HStack>
  );
};

export default FooterSection;
