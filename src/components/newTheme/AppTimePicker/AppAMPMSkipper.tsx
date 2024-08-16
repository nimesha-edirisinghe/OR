import { Box, BoxProps, HStack, VStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { neutral_100 } from 'theme/colors';

export type AM_PM = 'AM' | 'PM';
interface Props extends BoxProps {
  onValueChange: (value: AM_PM) => void;
  value?: AM_PM;
}

const AppAMPMSkipper: FC<Props> = ({ value, onValueChange, ...rest }) => {
  const [inputValue, setInputValue] = useState<AM_PM>(value ? value : 'AM');

  useEffect(() => {
    value && setInputValue(value);
  }, [value]);

  const onToggleSkipper = () => {
    const _inputValue = inputValue === 'AM' ? 'PM' : 'AM';
    setInputValue(_inputValue);
    onValueChange(_inputValue);
  };

  return (
    <Box
      {...rest}
      borderRadius="8px"
      px="10px"
      py="3px"
      as={motion.div}
      initial={{ x: -30 }}
      animate={{ x: 0 }}
      exit={{ x: -80 }}
    >
      <HStack justify="space-between">
        <AppText fontSize="13px" fontWeight={400} color={neutral_100}>
          {inputValue}
        </AppText>
        <VStack>
          <AppIconChakra
            name="chevronUp"
            fill="#fff"
            w="10px"
            h="10px"
            cursor="pointer"
            onClick={() => onToggleSkipper()}
          />
          <AppIconChakra
            name="chevronDown"
            fill="#fff"
            w="10px"
            h="10px"
            cursor="pointer"
            onClick={() => onToggleSkipper()}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default AppAMPMSkipper;
