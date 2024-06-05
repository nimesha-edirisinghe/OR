import { Box, Flex, HStack, Spinner } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { useState } from 'react';
import { ocean_blue_100 } from 'theme/colors';
import { FORECAST_CONFIG_PAGE_DATA_SIZE } from 'utils/constants';

type Props = {
  paginateHandler: (pageNo: number) => void;
  isLoading: boolean;
  recordLength?: number;
};

const AppPagination = ({ recordLength = 0, isLoading, paginateHandler }: Props) => {
  const [startPageNo, setStartPageNo] = useState(1);
  const [endPageNo, setEndPageNo] = useState(FORECAST_CONFIG_PAGE_DATA_SIZE);
  const [currentPage, setCurrentPage] = useState(1);

  const incrementHandler = () => {
    if (endPageNo < recordLength) {
      setStartPageNo(startPageNo + FORECAST_CONFIG_PAGE_DATA_SIZE);
      setEndPageNo(endPageNo + FORECAST_CONFIG_PAGE_DATA_SIZE);
      setCurrentPage(currentPage + 1);
      paginateHandler(currentPage + 1);
    }
  };
  const decrementHandler = () => {
    if (startPageNo > FORECAST_CONFIG_PAGE_DATA_SIZE) {
      setStartPageNo(startPageNo - FORECAST_CONFIG_PAGE_DATA_SIZE);
      setEndPageNo(endPageNo - FORECAST_CONFIG_PAGE_DATA_SIZE);
      setCurrentPage(currentPage - 1);
      paginateHandler(currentPage - 1);
    }
  };

  return (
    <HStack pt="2px" pr="25px" userSelect={'none'}>
      <AppIconChakra
        name={'chevronLeft'}
        fill={currentPage === 1 ? 'left-menu-icon-color' : ocean_blue_100}
        width="12px"
        height="12px"
        cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
        onClick={decrementHandler}
      />
      <Flex width="138px" justifyContent="center" h="25px" pl="10px" pt="5px">
        <AppText size={'sm'} variant="label" align={'left'}>
          {startPageNo} to {endPageNo > recordLength ? recordLength : endPageNo}
          of {recordLength}
        </AppText>
        <Box width={'20px'} pl={'4px'} mb={'2px'} mt={'-2px'}>
          {isLoading && <Spinner size="sm" />}
        </Box>
      </Flex>
      <AppIconChakra
        name={'chevronRight'}
        fill={
          currentPage === recordLength / FORECAST_CONFIG_PAGE_DATA_SIZE
            ? 'left-menu-icon-color'
            : ocean_blue_100
        }
        width="12px"
        height="12px"
        cursor={
          currentPage === recordLength / FORECAST_CONFIG_PAGE_DATA_SIZE ? 'not-allowed' : 'pointer'
        }
        onClick={incrementHandler}
      />
    </HStack>
  );
};

export default AppPagination;
