import { Box, HStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import React, { FC } from 'react';

interface AppRowPaginationProps {
  currentPage?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppRowPagination: FC<AppRowPaginationProps> = ({
  currentPage = 1,
  totalPages,
  onPageChange
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 3, 1);
    let endPage = Math.min(startPage + 6, totalPages);
    if (endPage - startPage < 6) {
      startPage = Math.max(endPage - 6, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <HStack userSelect="none">
      <Box>
        <AppIconChakra
          name={'chevronLeft'}
          fill={currentPage === 1 ? 'left-menu-icon-color' : 'left-menu-icon-hover-color'}
          width="8px"
          height="10px"
          cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          mr="10px"
          mb="2px"
        />
      </Box>
      {getPageNumbers().map((pageNumber, index, array) => (
        <React.Fragment key={pageNumber}>
          {index === 0 && pageNumber !== 1 && (
            <>
              <Box
                key={pageNumber}
                onClick={() => onPageChange(1)}
                bg={pageNumber === currentPage ? '#F7CC45' : 'transparent'}
                transition="all 0.25s ease"
                px="8px"
                height="20px"
                borderRadius="5px"
                cursor="pointer"
              >
                <AppText
                  color={pageNumber === currentPage ? '#000' : '#F7CC45'}
                  fontSize="13px"
                  fontWeight={600}
                  textAlign="center"
                  noOfLines={1}
                >
                  {1}
                </AppText>
              </Box>
              {pageNumber !== 2 && (
                <AppText color="#F7CC45" fontSize="13px" fontWeight={500} textAlign="center">
                  ...
                </AppText>
              )}
            </>
          )}
          <Box
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            bg={pageNumber === currentPage ? '#F7CC45' : 'transparent'}
            transition="all 0.25s ease"
            px="8px"
            height="20px"
            borderRadius="5px"
            cursor="pointer"
          >
            <AppText
              color={pageNumber === currentPage ? '#000' : '#F7CC45'}
              fontSize="13px"
              fontWeight={600}
              textAlign="center"
              mt="1px"
              noOfLines={1}
            >
              {pageNumber}
            </AppText>
          </Box>
          {index === array.length - 1 && pageNumber !== totalPages && (
            <>
              {pageNumber !== totalPages - 1 && (
                <AppText color="#F7CC45" fontSize="13px" fontWeight={500} textAlign="center">
                  ...
                </AppText>
              )}
              <Box
                key={pageNumber}
                onClick={() => onPageChange(totalPages)}
                bg={pageNumber === currentPage ? '#F7CC45' : 'transparent'}
                transition="all 0.25s ease"
                px="8px"
                height="20px"
                borderRadius="5px"
                cursor="pointer"
              >
                <AppText
                  color={pageNumber === currentPage ? '#000' : '#F7CC45'}
                  fontSize="13px"
                  fontWeight={600}
                  textAlign="center"
                  noOfLines={1}
                >
                  {totalPages}
                </AppText>
              </Box>
            </>
          )}
        </React.Fragment>
      ))}

      <Box pl="10px">
        <AppIconChakra
          name={'chevronRight'}
          fill={currentPage === totalPages ? 'left-menu-icon-color' : 'left-menu-icon-hover-color'}
          width="8px"
          height="10px"
          mb="2px"
          cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
          onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
        />
      </Box>
    </HStack>
  );
};

export default AppRowPagination;
