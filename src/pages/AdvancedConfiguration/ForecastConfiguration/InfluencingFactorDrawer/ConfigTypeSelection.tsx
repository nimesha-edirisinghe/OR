import { useDisclosure } from '@chakra-ui/hooks';
import { Box, HStack, VStack } from '@chakra-ui/layout';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from 'components/AppText/AppText';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@chakra-ui/react';
import AppSkipper from 'components/AppSkipper/AppSkipper';
import { black_100, blue_500, ocean_blue_400, ocean_blue_600 } from 'theme/colors';

export type InfluencingFactorConfigType =
  | 'Forecasted trend'
  | 'Historical values'
  | 'Continue last'
  | 'Percentage change'
  | 'From database';

export type SKUPredictorConfigType = 'Historical Median' | 'From database';
export type dropdownType = 'anchor' | 'sku';
interface Props {
  configType: InfluencingFactorConfigType;
  uniqueKey: number;
  configValue?: number;
  dropdownType: dropdownType;
  onConfigTypeChange: (
    value: InfluencingFactorConfigType | SKUPredictorConfigType,
    index: number
  ) => void;
  onPercentageConfigValueChange?: (value: number, index: number) => void;
}

const ConfigTypeSelection: FC<Props> = ({
  configType,
  uniqueKey,
  configValue,
  onPercentageConfigValueChange,
  onConfigTypeChange,
  dropdownType
}) => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const [selectedConfigType, setSelectedConfigType] = useState<
    InfluencingFactorConfigType | SKUPredictorConfigType
  >(configType);
  const ref = useRef<HTMLDivElement | null>(null);
  const configTypes: InfluencingFactorConfigType[] = [
    'Forecasted trend',
    'Historical values',
    'Continue last',
    'Percentage change',
    'From database'
  ];

  const skuConfigTypes: SKUPredictorConfigType[] = ['Historical Median', 'From database'];

  useEffect(() => {
    setSelectedConfigType(configType);
  }, [configType]);

  useOutsideClick({
    ref: ref,
    handler: (event) => {
      if (event.target === ref.current) {
        return;
      }
      onClose();
    }
  });

  const onItemSelect = (
    config: InfluencingFactorConfigType | SKUPredictorConfigType,
    uniqueKey: number
  ) => {
    setSelectedConfigType(config);
    onConfigTypeChange(config, uniqueKey);
    onClose();
  };

  return (
    <HStack>
      <VStack pos="relative" ref={ref}>
        <HStack
          justifyContent="space-between"
          w="245px"
          px="15px"
          py="4px"
          bg={ocean_blue_600}
          borderRadius="5px"
        >
          <AppText
            _groupHover={{
              color: 'left-menu-icon-hover-color'
            }}
            fontSize="14px"
            fontWeight={400}
            color="#fff"
            transition="color 0.3s"
            lineHeight="32px"
          >
            {selectedConfigType}
          </AppText>

          <AppIconChakra
            name="chevronUp"
            fill="#fff"
            w="12px"
            h="12px"
            cursor="pointer"
            _groupHover={{
              fill: 'left-menu-icon-hover-color'
            }}
            transition=".3s"
            transform={!isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            onClick={() => onToggle()}
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
              {dropdownType === 'anchor' &&
                configTypes.map((config, idx) => (
                  <Box
                    key={idx}
                    cursor="pointer"
                    borderLeft={`1px solid ${black_100}`}
                    w="full"
                    py="12px"
                    pl="16px"
                    _hover={{ bg: ocean_blue_600,color:blue_500
}}
                    onClick={() => onItemSelect(config, uniqueKey)}
                  >
                    <AppText fontSize="14px" fontWeight={400}
                     _hover={{color:blue_500}} 
                     >
                      {config}
                    </AppText>
                  </Box>
                ))}
              {dropdownType === 'sku' &&
                skuConfigTypes.map((config, idx) => (
                  <Box
                    key={idx}
                    cursor="pointer"
                    borderLeft={`1px solid ${black_100}`}
                    w="full"
                    py="12px"
                    pl="16px"
                    _hover={{ bg: ocean_blue_600
                      ,color:blue_500
                      
                     }}
                    onClick={() => onItemSelect(config, uniqueKey)}
                  >
                    <AppText fontSize="14px" fontWeight={400}   _hover={{color:blue_500}}  >
                      {config}
                    </AppText>
                  </Box>
                ))}
            </VStack>
          )}
        </AnimatePresence>
      </VStack>
      {selectedConfigType === 'Percentage change' && (
        <AppSkipper
          onValueChange={(value) =>
            onPercentageConfigValueChange && onPercentageConfigValueChange(value, uniqueKey)
          }
          value={configValue || 0}
          w="80px"
        />
      )}
    </HStack>
  );
};

export default ConfigTypeSelection;
