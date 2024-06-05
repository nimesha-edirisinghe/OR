import React from 'react';
import { Box, Flex, HStack } from '@chakra-ui/react';
import AppText from 'components/AppText/AppText';
import { AppIconChakra } from 'assets/svg/chakraIcons';

export interface StepItem {
  label: string;
}

interface StepStyles {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  labelColor: string;
}

interface StepperProps {
  activeStep: number;
  steps: StepItem[];
  onStepChange: (step: number) => void;
}

const stepStyle = {
  backgroundColor: '#212121',
  borderColor: '#808080',
  textColor: '#808080',
  labelColor: '#B3B3B3'
};

const activeStepStyle = {
  backgroundColor: '#f7cc4533',
  borderColor: '#F7CC45',
  textColor: '#F7CC45',
  labelColor: '#fff'
};

const completedStepStyle = {
  backgroundColor: '#F7CC45',
  borderColor: '#F7CC45',
  textColor: '#F7CC45',
  labelColor: '#B3B3B3'
};

const AppStepper: React.FC<StepperProps> = ({ activeStep, steps, onStepChange }) => {
  const getStyles = (index: number): StepStyles => {
    if (index < activeStep) {
      return completedStepStyle;
    } else if (index === activeStep) {
      return activeStepStyle;
    } else {
      return stepStyle;
    }
  };

  return (
    <Flex direction="column" position="relative">
      <HStack justifyContent="space-between">
        {steps.map((step, index) => {
          const { backgroundColor, borderColor, textColor, labelColor } = getStyles(index);
          const isCompleted = index < activeStep;

          return (
            <Flex direction="column" align="center" w="150px" key={index}>
              <Box
                w="30px"
                h="30px"
                bg="#212121"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                mb="4px"
                cursor="pointer"
                onClick={() => onStepChange(index)}
                borderRadius="100%"
              >
                <Box
                  bg={backgroundColor}
                  h="full"
                  w="full"
                  textAlign="center"
                  borderRadius="100%"
                  border="1px solid red"
                  borderColor={borderColor}
                  pt="2px"
                >
                  {isCompleted ? (
                    <Box pt="6px" pl="6px">
                      <AppIconChakra
                        name="right"
                        fill="#000"
                        width="24px"
                        height="24px"
                        cursor="pointer"
                      />
                    </Box>
                  ) : (
                    <AppText color={textColor} fontSize="16px" fontWeight={400}>
                      {index + 1}
                    </AppText>
                  )}
                </Box>
              </Box>

              <AppText color={labelColor} fontSize="13px" fontWeight={400}>
                {step.label}
              </AppText>
            </Flex>
          );
        })}
        <Box
          position="absolute"
          top="15px"
          left="55px"
          right="60px"
          height="1px"
          width="calc(full - 50px)"
          bg="#808080"
          zIndex={-1}
        ></Box>
      </HStack>
    </Flex>
  );
};

export default AppStepper;
