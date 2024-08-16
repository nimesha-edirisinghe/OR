import { FC } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { ocean_blue_100, ocean_blue_400, ocean_blue_500 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface Props {
  name: string;
  totCount?: string | number;
  selectedCount: number | string;
  onClickHandler: () => void;
  isDisabled?: boolean;
}

const FilterTypeItem: FC<Props> = ({
  name,
  totCount,
  selectedCount,
  onClickHandler,
  isDisabled = false
}) => {
  const textColor = isDisabled
    ? ocean_blue_100
    : isNaN(selectedCount as number)
    ? 'filterMultiSelector.textColor._default'
    : 'filterMultiSelector.textColor._filled';
  const textHoverColor = isDisabled
    ? ocean_blue_400
    : isNaN(selectedCount as number)
    ? 'filterMultiSelector.textColor._hovered'
    : 'filterMultiSelector.textColor._filled';

  return (
    <HStack
      w="560px"
      h="44px"
      borderRadius="8px"
      bg={ocean_blue_500}
      justifyContent="space-between"
      p="10px 8px 10px 12px"
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      onClick={!isDisabled ? onClickHandler : () => {}}
      role="group"
      _hover={{
        bg: isDisabled ? ocean_blue_500 : ocean_blue_400
      }}
      _focus={{
        bg: isDisabled ? ocean_blue_500 : ocean_blue_400
      }}
    >
      <HStack flex={1} key={selectedCount} transition="1s">
        <AppText
          fontSize="13px"
          fontWeight={400}
          color={textColor}
          _groupHover={{
            color: textHoverColor
          }}
          transition=".6s"
        >
          {name}
        </AppText>
        {totCount && (
          <AppText
            fontSize="13px"
            fontWeight={600}
            color={textColor}
            _groupHover={{
              color: textHoverColor
            }}
            transition=".6s"
          >
            : ({totCount})
          </AppText>
        )}
      </HStack>
      <Flex flex={1}>
        <AppText
          fontSize="13px"
          fontWeight={400}
          color={textColor}
          _groupHover={{
            color: textHoverColor
          }}
          transition=".6s"
        >
          Selected
        </AppText>
        <AppText
          fontSize="13px"
          fontWeight={600}
          color={textColor}
          _groupHover={{
            color: textHoverColor
          }}
          transition=".6s"
        >
          : {selectedCount}
        </AppText>
      </Flex>
      <AppIcon
        transition=".6s"
        name="forwardRight"
        _groupHover={{
          fill: textHoverColor
        }}
        fill={textColor}
        cursor="pointer"
        w="24px"
        h="24px"
      />
    </HStack>
  );
};
export default FilterTypeItem;
