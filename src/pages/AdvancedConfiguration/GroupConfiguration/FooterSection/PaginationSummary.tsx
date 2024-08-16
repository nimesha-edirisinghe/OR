import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { gray_100 } from 'theme/colors';
import { STORE_GROUP_PAGE_SIZE } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';

interface PaginationSummaryProps {
  currentPage?: number;
  totalItems: number;
}

const PaginationSummary: FC<PaginationSummaryProps> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * STORE_GROUP_PAGE_SIZE + 1;
  const endItem = Math.min(startItem + STORE_GROUP_PAGE_SIZE - 1, totalItems);

  return (
    <HStack>
      <AppText fontSize="14px" fontWeight={500} color={gray_100}>{`${numberWithCommaSeparator(
        startItem
      )} - ${numberWithCommaSeparator(endItem)} of ${numberWithCommaSeparator(
        totalItems
      )} items`}</AppText>
    </HStack>
  );
};

export default PaginationSummary;
