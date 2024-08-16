import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';
import { GroupTypes } from 'types/groupConfig';
import { GroupTypesEnum } from 'utils/enum';

interface MoreOptionContentProps {
  onResolveMoreOption: (option: number) => void;
  groupType: GroupTypes;
}

const storeOptions = [
  {
    title: 'View Anchor Locations'
  },
  {
    title: 'View Influencing Factors'
  },
  {
    title: 'Edit Group Information'
  },
  {
    title: 'Delete'
  }
];

const wareHouseOptions = [
  {
    title: 'Edit Group Information'
  },
  {
    title: 'Delete'
  }
];

const MoreOptionContent: FC<MoreOptionContentProps> = ({ onResolveMoreOption, groupType }) => {
  const options = groupType === GroupTypesEnum.STORE ? storeOptions : wareHouseOptions;
  const popUpHeight = groupType === GroupTypesEnum.STORE ? '144px' : '65px';

  return (
    <VStack
      bg={ocean_blue_600}
      borderRadius="8px"
      border={`1px solid ${ocean_blue_400}`}
      h={popUpHeight}
      boxShadow="0px 12px 20px 0px #001019"
      overflow={'hidden'}
    >
      {options.map((option, index) => (
        <HStack
          key={index}
          h="36px"
          w="full"
          spacing="4px"
          cursor="pointer"
          _hover={{
            bg: ocean_blue_400
          }}
          px="12px"
          onClick={() => onResolveMoreOption(index)}
        >
          <AppText
            fontSize="12px"
            size={'body2'}
            fontWeight={400}
            lineHeight="18px"
            color={ocean_blue_200}
            width={'100%'}
          >
            {option.title}
          </AppText>
        </HStack>
      ))}
    </VStack>
  );
};

export default MoreOptionContent;
