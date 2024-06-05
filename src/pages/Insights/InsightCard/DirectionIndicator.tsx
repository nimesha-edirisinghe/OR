import { FC } from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { AppIconChakra } from 'assets/svg/chakraIcons';

interface Props {
  direction: string | null | undefined;
  arrowColor: string;
  percentage?: number | null | 'undefined';
  desc?: string;
}

const DirectionIndicator: FC<Props> = ({ direction, percentage, desc, arrowColor }) => {
  return (
    <HStack justifyContent="center" w="full" spacing="4px">
      {direction !== null && (
        <>
          {percentage !== 'undefined' ? (
            <Flex flex={1} justifyContent="flex-end" pr={'4px'}>
              <AppIconChakra
                name={direction !== '0' ? 'upArrow' : 'downArrow'}
                fill={arrowColor}
                width="20px"
                height="20px"
              />
            </Flex>
          ) : (
            <Flex flex={1} justifyContent="flex-end" pr={'4px'}></Flex>
          )}
          <Flex flex={4.3} pr="5px" minW="20px">
            <AppText fontSize={['10px', '10px', '14px']} fontWeight={400} lineHeight="22px">
              <span>{percentage}</span>
              {desc}
            </AppText>
          </Flex>
        </>
      )}
    </HStack>
  );
};

export default DirectionIndicator;
