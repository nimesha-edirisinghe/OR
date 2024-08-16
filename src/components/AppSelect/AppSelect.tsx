import { useDisclosure } from '@chakra-ui/hooks';
import { Box, HStack, VStack } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react';
import { blue_500, ocean_blue_100, ocean_blue_400, ocean_blue_600 } from 'theme/colors';

interface Props {
  options: { key: string; value: string }[];
  selectedScheduleType?: string | null | '';
  onConfigTypeChange: (option: { key: string; value: string }) => void;
  isDisabled?: boolean;
}

const AppSelect: FC<Props> = ({
  options,
  selectedScheduleType = '',
  onConfigTypeChange,
  isDisabled = false
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (event.target === ref.current) {
        return;
      }
      onClose();
    }
  });

  const onItemSelect = (option: { key: string; value: string }) => {
    onConfigTypeChange(option);
    onClose();
  };

  const selectedValue = options.find((obj) => obj.key === selectedScheduleType)?.key.toLowerCase();
  const bgColor = ocean_blue_600;
  const textColor = isDisabled ? '#595959' : '#fff';
  const cursorStyle = isDisabled ? 'not-allowed' : 'pointer';

  return (
    <HStack>
      <VStack pos="relative" ref={ref}>
        <HStack
          justifyContent="space-between"
          w="135px"
          h="41px"
          px="15px"
          py="4px"
          bg={bgColor}
          border="1px"
          borderRadius="5px"
          borderColor={ocean_blue_100}
        >
          <AppText
            _groupHover={{
              color: 'left-menu-icon-hover-color'
            }}
            fontSize="14px"
            fontWeight={400}
            color={textColor}
            transition="color 0.3s"
            lineHeight="32px"
          >
            {selectedValue
              ? selectedValue.charAt(0).toUpperCase().concat(selectedValue.slice(1))
              : 'Select'}
          </AppText>

          <AppIconChakra
            name="chevronUp"
            fill={textColor}
            w="12px"
            h="12px"
            cursor={cursorStyle}
            _groupHover={{
              fill: 'left-menu-icon-hover-color'
            }}
            transition=".3s"
            transform={!isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            onClick={() => !isDisabled && onToggle()}
          />
        </HStack>
        <AnimatePresence>
          {isOpen && (
            <VStack
              left={0}
              top="33px"
              pos="absolute"
              zIndex={1}
              w="full"
              align="start"
              bg={ocean_blue_400}
              as={motion.div}
              transition=".5s"
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              exit={{ y: -30 }}
            >
              {options.map((option, idx) => (
                <Box
                  key={idx}
                  cursor="pointer"
                  w="full"
                  py="12px"
                  pl="16px"
                  onClick={() => onItemSelect(option)}
                  role="group"
                >
                  <AppText
                    fontSize="14px"
                    fontWeight={400}
                    _hover={{ color: blue_500 }}
                    textTransform={'capitalize'}
                  >
                    {option.key.toLowerCase()}
                  </AppText>
                </Box>
              ))}
            </VStack>
          )}
        </AnimatePresence>
      </VStack>
    </HStack>
  );
};

export default AppSelect;
