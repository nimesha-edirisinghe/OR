import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { neutral_400 } from 'theme/colors';
import AppText from 'components/AppText/AppText';
import { PROMOTION_SUMMARY_TABLE_PAGE_SIZE } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
}

const PaginationSummary: FC<Props> = ({ currentPage = 1, totalItems, pageSize = 0 }) => {
  const startItem = (currentPage - 1) * Number(PROMOTION_SUMMARY_TABLE_PAGE_SIZE) + 1;
  const endItem = Math.min(startItem + Number(PROMOTION_SUMMARY_TABLE_PAGE_SIZE) - 1, totalItems);

  return (
    <HStack>
      <AppText
        size="body2"
        color={neutral_400}
      >{`Showing ${numberWithCommaSeparator(startItem)}-${numberWithCommaSeparator(endItem)} of ${numberWithCommaSeparator(totalItems)}`}</AppText>
    </HStack>
  );
};

export default PaginationSummary;
