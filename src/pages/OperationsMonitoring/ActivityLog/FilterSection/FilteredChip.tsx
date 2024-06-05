import { HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { FilteredItem } from './FilterSection';
import { blue_500_t30, neutral_200, ocean_blue_100, ocean_blue_400 } from 'theme/colors';
import { AppIcon } from 'components/AppIcon/AppIcon';

interface FilteredChipProps {
  dataObj: FilteredItem;
  onCloseHandler: (key: string) => void;
}

const FilteredChip: FC<FilteredChipProps> = ({ dataObj, onCloseHandler }) => {
  const getCount = (dataObj: FilteredItem) => {
    switch (true) {
      case dataObj.isSelectedAll:
        return 'All';
      case !!dataObj.dateType:
        return dataObj.dateType;
      default:
        return dataObj.count.toString();
    }
  };

  const dataCount = getCount(dataObj);

  return (
    <HStack h="30px" w="auto" px="12px" py="4px" bg={blue_500_t30} borderRadius="15px">
      <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
        {dataObj?.label}
      </AppText>
      <AppText size="body3" color={ocean_blue_100} transition="all 0.2s ease">
        ({dataCount})
      </AppText>
      <AppIcon
        name="cross"
        stroke={neutral_200}
        _groupHover={{ bg: ocean_blue_400 }}
        width="16px"
        height="16px"
        cursor="pointer"
        onClick={() => onCloseHandler(dataObj.key)}
      />
    </HStack>
  );
};

export default FilteredChip;
