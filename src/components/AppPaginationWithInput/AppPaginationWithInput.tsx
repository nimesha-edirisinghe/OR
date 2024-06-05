import React, { useEffect, useState } from 'react';
import { Input, HStack } from '@chakra-ui/react';
import AppButton from 'components/AppButton/AppButton';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';

interface AppPaginationWithInputProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppPaginationWithInput: React.FC<AppPaginationWithInputProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const [inputPage, setInputPage] = useState<number | string>(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number | string) => {
    let _page: number = page as number;

    if (typeof page === 'string') {
      _page = parseInt(page);
    }

    if (_page > 0 && _page <= totalPages) {
      setInputPage(_page);
      if (page !== '') {
        onPageChange(_page);
      }
    }
  };

  return (
    <HStack spacing={2} align="center">
      <AppButton
        variant="transparent"
        w="33px"
        h="33px"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        bg="#373739"
        role="group"
        p="0"
      >
        <AppIconChakra
          name={'chevronLeft'}
          fill="#D2D2D2"
          _groupHover={{
            fill: 'left-menu-icon-hover-color'
          }}
          width="10px"
          height="10px"
          cursor="pointer"
        />
      </AppButton>
      <HStack spacing={0}>
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) =>
            (e.target.value === '' ||
              (parseInt(e.target.value) <= totalPages && parseInt(e.target.value) > 0)) &&
            setInputPage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handlePageChange(inputPage);
            }
          }}
          w="33px"
          h="33px"
          p="0"
          textAlign="center"
          mr="5px"
          fontWeight={600}
          fontSize="14px"
          bg="#373739"
          border="none"
          color="left-menu-icon-hover-color"
        />
        <AppText fontWeight={600} fontSize="14px" color="left-menu-icon-hover-color">
          / {totalPages}
        </AppText>
      </HStack>
      <AppButton
        variant="transparent"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        w="33px"
        h="33px"
        bg="#373739"
        role="group"
      >
        <AppIconChakra
          name={'chevronRight'}
          fill="#D2D2D2"
          _groupHover={{
            fill: 'left-menu-icon-hover-color'
          }}
          width="10px"
          height="10px"
          cursor="pointer"
        />
      </AppButton>
    </HStack>
  );
};

export default AppPaginationWithInput;
