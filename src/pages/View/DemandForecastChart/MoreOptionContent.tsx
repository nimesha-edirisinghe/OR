import { HStack, VStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { FC } from 'react';
import { ocean_blue_200, ocean_blue_400, ocean_blue_600 } from 'theme/colors';

const options = [
  {
    title: 'Edit this Forecast',
    isEnabled: false
  },
  {
    title: 'Adjust to Threshold ',
    isEnabled: false
  },
  {
    title: 'Ignore alert',
    isEnabled: false
  },
  {
    title: 'Report ',
    isEnabled: false
  }
];

interface Props {}

const MoreOptionContent: FC<Props> = () => {
  return (
    <VStack
      bg={ocean_blue_600}
      borderRadius="8px"
      border={`1px solid ${ocean_blue_400}`}
      boxShadow="0px 12px 20px 0px #001019"
      h={'144px'}
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
          onClick={() => {}}
        >
          <AppText
            fontSize="12px"
            size={'body3'}
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
