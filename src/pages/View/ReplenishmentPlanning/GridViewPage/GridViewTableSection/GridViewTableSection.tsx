import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import TableSection from './TableSection/TableSection';
import FooterSection from './FooterSection/FooterSection';
import {
  IRPLView,
  rplViewSliceSelector
} from 'state/pages/view/replenishmentView/rplViewPageState';
import { useSelector } from 'react-redux';

interface Props {}

const GridViewTableSection: FC<Props> = () => {
  const rplViewState: IRPLView = useSelector(rplViewSliceSelector);
  const totalDataCount = rplViewState.rplSkuExpandedDataList?.totalCount;

  return (
    <VStack w="full" h="full" spacing="16px">
      <TableSection />
      <Box w="full" h="18px">
        <FooterSection totalItems={totalDataCount!} currentPage={1} />
      </Box>
    </VStack>
  );
};

export default GridViewTableSection;
