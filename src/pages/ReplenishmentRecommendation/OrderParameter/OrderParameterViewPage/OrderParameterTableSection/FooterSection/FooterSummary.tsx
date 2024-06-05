import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { neutral_400 } from 'theme/colors';
import { ORDER_PARAMETER_TABLE_PAGE_SIZE } from 'utils/constants';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  totalItems: number;
  currentPage?: number;
}

const FooterSummary: FC<Props> = ({ currentPage = 1, totalItems }) => {
  const startItem = (currentPage - 1) * Number(ORDER_PARAMETER_TABLE_PAGE_SIZE) + 1;
  const endItem = Math.min(startItem + Number(ORDER_PARAMETER_TABLE_PAGE_SIZE) - 1, totalItems);
  const formattedTotalItem = numberWithCommaSeparator(totalItems);

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
