import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import TableSection from './TableSection/TableSection';
import FooterSection from './FooterSection/FooterSection';
import {
  IRPLWhView,
  rplWHViewSliceSelector
} from 'state/pages/view/whReplenishmentView/whRplViewState';
import { useSelector } from 'react-redux';

interface Props {}

const WHGridViewTableSection: FC<Props> = () => {
  const rplWhViewState: IRPLWhView = useSelector(rplWHViewSliceSelector);
  const totalDataCount = rplWhViewState.rplWhSkuExpandedDataList?.totalCount;

  return (
    <VStack w="full" h="full" spacing="16px">
      <TableSection />
      <Box w="full" h="18px">
        <FooterSection totalItems={totalDataCount!} currentPage={1} />
      </Box>
    </VStack>
  );
};

export default WHGridViewTableSection;
