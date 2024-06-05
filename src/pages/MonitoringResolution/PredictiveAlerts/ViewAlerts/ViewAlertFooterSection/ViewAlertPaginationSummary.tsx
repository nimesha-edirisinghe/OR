import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_400 } from 'theme/colors';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  totalItems: number;
  currentPage?: number;
  pageSize?: number;
}

const ViewAlertPaginationSummary: FC<Props> = ({ currentPage = 1, totalItems, pageSize = 0 }) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  return (
    <HStack>
      <AppText
        size="body2"
        color={neutral_400}
      >{`Showing ${numberWithCommaSeparator(startItem)}-${numberWithCommaSeparator(endItem)} of ${numberWithCommaSeparator(totalItems)}`}</AppText>
    </HStack>
  );
};

export default ViewAlertPaginationSummary;
