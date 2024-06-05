import { Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import React, { FC } from 'react';
import AppIconButton from '../AppIconButton/AppIconButton';
import { AppIcon } from 'components/AppIcon/AppIcon';
import { numberWithCommaSeparator } from 'utils/utility';

interface Props {
  currentPage?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppPagination: FC<Props> = ({ currentPage = 1, totalPages, onPageChange }) => {
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
      <AppIconButton
        aria-label="prev"
        icon={
          <AppIcon
            name="chevronLeft"
            width="8px"
            height="10px"
            fill={
              currentPage === 1
                ? 'pagination.primary._default.nav.icon'
                : 'pagination.primary._default.nav.icon'
            }
            cursor={currentPage === 1 ? 'not-allowed' : 'pointer'}
          />
        }
        variant="iconPrimary"
        size="iconSmall"
        onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
      />
      {getPageNumbers().map((pageNumber, index, array) => (
        <React.Fragment key={pageNumber}>
          {index === 0 && pageNumber !== 1 && (
            <>
              <Flex
                key={pageNumber}
                onClick={() => onPageChange(1)}
                bg={
                  pageNumber === currentPage
                    ? 'pagination.primary._selected.pageBtn.btn'
                    : 'pagination.primary._default.pageBtn.btn'
                }
                transition="all 0.25s ease"
                px="8px"
                height="28px"
                minW="28px"
                borderRadius="6px"
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <AppText
                  color={
                    pageNumber === currentPage
                      ? 'pagination.primary._selected.pageBtn.text'
                      : 'pagination.primary._default.pageBtn.text'
                  }
                  fontSize="13px"
                  fontWeight={600}
                  textAlign="center"
                  noOfLines={1}
                >
                  {1}
                </AppText>
              </Flex>
              {pageNumber !== 2 && (
                <AppText
                  color="pagination.primary._default.pageBtn.text"
                  fontSize="13px"
                  fontWeight={500}
                  textAlign="center"
                >
                  ...
                </AppText>
              )}
            </>
          )}
          <Flex
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            bg={
              pageNumber === currentPage
                ? 'pagination.primary._selected.pageBtn.btn'
                : 'pagination.primary._default.pageBtn.btn'
            }
            transition="all 0.25s ease"
            px="11.5px"
            height="28px"
            minW="28px"
            borderRadius="6px"
            cursor="pointer"
            justifyContent="center"
            alignItems="center"
          >
            <AppText
              color={
                pageNumber === currentPage
                  ? 'pagination.primary._selected.pageBtn.text'
                  : 'pagination.primary._default.pageBtn.text'
              }
              fontSize="13px"
              fontWeight={600}
              textAlign="center"
              mt="1px"
              noOfLines={1}
            >
              {numberWithCommaSeparator(pageNumber)}
            </AppText>
          </Flex>
          {index === array.length - 1 && pageNumber !== totalPages && (
            <>
              {pageNumber !== totalPages - 1 && (
                <AppText
                  color="pagination.primary._default.pageBtn.text"
                  fontWeight={500}
                  textAlign="center"
                >
                  ...
                </AppText>
              )}
              <Flex
                key={pageNumber}
                onClick={() => onPageChange(totalPages)}
                bg={
                  pageNumber === currentPage
                    ? 'pagination.primary._selected.pageBtn.btn'
                    : 'pagination.primary._default.pageBtn.btn'
                }
                transition="all 0.25s ease"
                px="11.5px"
                height="28px"
                minW="28px"
                borderRadius="6px"
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
              >
                <AppText
                  color={
                    pageNumber === currentPage
                      ? 'pagination.primary._selected.pageBtn.text'
                      : 'pagination.primary._default.pageBtn.text'
                  }
                  fontSize="13px"
                  fontWeight={600}
                  textAlign="center"
                  noOfLines={1}
                >
                  {numberWithCommaSeparator(totalPages)}
                </AppText>
              </Flex>
            </>
          )}
        </React.Fragment>
      ))}
      <AppIconButton
        aria-label="next"
        icon={
          <AppIcon
            name="chevronRight"
            width="8px"
            height="10px"
            fill={
              currentPage === totalPages
                ? 'pagination.primary._default.nav.icon'
                : 'pagination.primary._default.nav.icon'
            }
          />
        }
        variant="iconPrimary"
        size="iconSmall"
        onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
        cursor={currentPage === totalPages ? 'not-allowed' : 'pointer'}
      />
    </HStack>
  );
};

export default AppPagination;
