import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_400 } from 'theme/colors';
import { REPLENISHMENT_CONFIG_PAGE_SIZE } from 'utils/constants';

interface Props {
  totalItems: number;
  currentPage?: number;
}

const FooterSummary: FC<Props> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * Number(REPLENISHMENT_CONFIG_PAGE_SIZE) + 1;
  const endItem = Math.min(startItem + Number(REPLENISHMENT_CONFIG_PAGE_SIZE) - 1, totalItems);

  return (
    <HStack>
      <AppText
        size="body2"
        color={neutral_400}
      >{`Showing ${startItem}-${endItem} of ${totalItems}`}</AppText>
    </HStack>
  );
};

export default FooterSummary;
