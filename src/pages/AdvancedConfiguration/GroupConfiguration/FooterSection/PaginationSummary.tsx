import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { ACTIVITY_LOG_PAGE_SIZE } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';

interface PaginationSummaryProps {
  currentPage?: number;
  totalItems: number;
}

const PaginationSummary: FC<PaginationSummaryProps> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * ACTIVITY_LOG_PAGE_SIZE + 1;
  const endItem = Math.min(startItem + ACTIVITY_LOG_PAGE_SIZE - 1, totalItems);

  return (
    <HStack>
      <AppText
        fontSize="14px"
        fontWeight={500}
        color="#8C8C8C"
      >{`${numberWithCommaSeparator(startItem)} - ${numberWithCommaSeparator(endItem)} of ${numberWithCommaSeparator(totalItems)} items`}</AppText>
    </HStack>
  );
};

export default PaginationSummary;
