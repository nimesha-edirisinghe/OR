import { FC } from 'react';
import { HStack } from '@chakra-ui/react';
import { neutral_400 } from 'theme/colors';
import AppText from 'components/AppText/AppText';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
}

const PaginationSummary: FC<Props> = ({ currentPage = 1, totalItems, pageSize = 0 }) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const currentPageCount = endItem - startItem + 1;

  return (
    <HStack>
      <AppText
        size="body2"
        color={neutral_400}
        >{`Showing only ${numberWithCommaSeparator(currentPageCount)} of ${numberWithCommaSeparator(totalItems)}`}</AppText>
    </HStack>
  );
};

export default PaginationSummary;
