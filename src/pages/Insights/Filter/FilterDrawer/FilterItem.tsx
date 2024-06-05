import { FC } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';

interface Props {
  name: string;
  totCount: number | undefined;
  selectedCount: number | string;
  onClickHandler: () => void;
}

const FilterItem: FC<Props> = ({ name, totCount, selectedCount, onClickHandler }) => {
  return (
    <HStack
      w="full"
      h="50px"
      borderRadius="6px"
      bg="#161616"
      justifyContent="space-between"
      px="20px"
    >
      <HStack flex={1}>
        <AppText fontSize="13px" fontWeight={400}>
          {name}
        </AppText>
        <AppText fontSize="13px" fontWeight={400} color="card-text-color">
          ({totCount})
        </AppText>
      </HStack>
      <Flex flex={1}>
        <AppText fontSize="13px" fontWeight={400}>
          Selected: {selectedCount}
        </AppText>
      </Flex>
      <AppIconChakra
        name={'chevronRight'}
        fill={'left-menu-icon-color'}
        _hover={{ fill: 'left-menu-icon-hover-color' }}
        width="12px"
        height="12px"
        cursor={'pointer'}
        onClick={onClickHandler}
      />
    </HStack>
  );
};
export default FilterItem;
