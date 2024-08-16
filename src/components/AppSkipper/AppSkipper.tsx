import { Box, BoxProps, HStack, VStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppInput from 'components/AppInput/AppInput';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { black_800, ocean_blue_500, ocean_blue_600 } from 'theme/colors';

interface Props extends BoxProps {
  value: number | null;
  onValueChange: (value: number) => void;
  bg?: string;
  maxNumber?: number;
  minNumber?: number;
  isDisabled?: boolean;
  isUpDownIconVisible?: boolean;
}

const AppSkipper: FC<Props> = ({
  value,
  onChange,
  onValueChange,
  bg = '#000',
  maxNumber = 100,
  minNumber = -100,
  isDisabled = false,
  isUpDownIconVisible = true,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string>(String(value));
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const onInputChange = (value: string) => {
    if (value === '') {
      setInputValue('');
      onValueChange(0);
      return;
    }
    const _value = parseFloat(value);
    if (_value <= maxNumber && _value >= minNumber) {
      setInputValue(_value.toString());
      onValueChange(_value);
    }
  };

  const onIncrementalChange = (value: number) => {
    const _value = parseFloat(inputValue) + value;
    if (_value <= maxNumber && _value >= minNumber) {
      setInputValue(String(_value));
      onValueChange(_value);
    }
  };

  const iconFillColor = isDisabled ? '#595959' : '#fff';
  const cursorStyle = isDisabled ? 'not-allowed' : 'pointer';
  const bgColor = ocean_blue_500;

  return (
    <Box
      {...rest}
      bg={bgColor}
      borderRadius="5px"
      pr="10px"
      py="0px"
      as={motion.div}
      initial={{ x: -30 }}
      animate={{ x: 0 }}
      exit={{ x: -80 }}
    >
      <HStack>
        <AppInput
          type="number"
          textAlign="center"
          p={0}
          border="none"
          _focus={{ border: 'none', outline: 'none' }}
          onChange={(e) => onInputChange(e.target.value)}
          max={maxNumber}
          min={minNumber}
          value={inputValue}
          fontSize="13px"
          fontWeight={400}
          isDisabled={isDisabled}
          _disabled={{ backgroundColor: ocean_blue_600, color: black_800 }}
          placeholder="Enter value"
        />
        <VStack hidden={!isUpDownIconVisible}>
          <AppIconChakra
            name="chevronUp"
            fill={iconFillColor}
            w="12px"
            h="12px"
            cursor={cursorStyle}
            onClick={() => !isDisabled && onIncrementalChange(1)}
          />
          <AppIconChakra
            name="chevronDown"
            fill={iconFillColor}
            w="12px"
            h="12px"
            cursor={cursorStyle}
            onClick={() => !isDisabled && onIncrementalChange(-1)}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppSkipper;
