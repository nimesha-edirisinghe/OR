import { Box, Center, Flex } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import AppText from 'components/AppText/AppText';
import { ocean_blue_600 } from 'theme/colors';

interface Props {
  onHourSelected: (hours: number) => void;
  onMinuteSelected: (minutes: number) => void;
  isClockVisible: {
    hour: boolean;
    minutes: boolean;
  };
}

const AppAnalogTimePicker: FC<Props> = ({ onHourSelected, onMinuteSelected, isClockVisible }) => {
  const clockHourNumbers = useCallback(() => {
    //@ts-ignore
    return [...Array(12).keys()].map((v, k) => {
      const num = v + 1;
      const x = Math.sin((Math.PI / 6) * num) * 50;
      const y = Math.cos((Math.PI / 6) * num) * 50;

      return (
        <Box role="group" key={v}>
          <Flex
            justify="center"
            pos="absolute"
            bottom={`${y}`}
            left={`${x}`}
            w="14px"
            h="14px"
            align="center"
            borderRadius="50%"
            cursor="pointer"
            p="8px"
            _groupHover={{ bg: '#fff' }}
            onClick={() => onHourSelected(num)}
          >
            <AppText
              color="#fff"
              fontSize="11px"
              fontWeight={400}
              lineHeight="12px"
              _groupHover={{ color: '#000' }}
            >
              {num}
            </AppText>
          </Flex>
        </Box>
      );
    });
  }, [isClockVisible.hour]);

  const clockMinutesNumbers = useCallback(() => {
    //@ts-ignore
    return [...Array(12).keys()].map((v, k) => {
      const num = v + 1;
      const x = Math.sin((Math.PI / 6) * num) * 50;
      const y = Math.cos((Math.PI / 6) * num) * 50;

      return (
        <Box role="group" key={v}>
          <Flex
            justify="center"
            pos="absolute"
            bottom={`${y}`}
            left={`${x}`}
            w="14px"
            h="14px"
            align="center"
            borderRadius="50%"
            cursor="pointer"
            p="8px"
            _groupHover={{ bg: '#fff' }}
            onClick={() => onMinuteSelected(num === 12 ? 0 : num * 5)}
          >
            <AppText
              color="#fff"
              fontSize="11px"
              fontWeight={400}
              lineHeight="12px"
              _groupHover={{ color: '#000' }}
            >
              {num === 12 ? 0 : num * 5}
            </AppText>
          </Flex>
        </Box>
      );
    });
  }, [isClockVisible.minutes]);

  return (
    <Flex userSelect="none">
      <Flex
        w="120px"
        h="120px"
        pos="relative"
        justify="center"
        align="center"
        borderRadius="50%"
        bg={ocean_blue_600}
      >
        <Box pos="absolute" borderRadius="50%" w={4} h={4} >
          {isClockVisible && isClockVisible.minutes && clockMinutesNumbers()}
          {isClockVisible && isClockVisible.hour && clockHourNumbers()}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AppAnalogTimePicker;
