import React from 'react';
import { Box, Center, Flex, HStack } from '@chakra-ui/react';
import { AppIconChakra } from 'assets/svg/chakraIcons';
import AppText from '../AppText/AppText';

export interface StepItem {
  label: string;
}

interface StepStyles {
  backgroundColor: string;
  textColor: string;
  labelColor: string;
  hoveredBgColor: string;
}

interface StepperProps {
  activeStep: number;
  steps: StepItem[];
  onStepChange: (step: number) => void;
  description?: string;
}

const stepStyle = {
  backgroundColor: 'stepper.primary.default.upcoming.backgroundColor',
  textColor: 'stepper.primary.default.upcoming.textColor',
  labelColor: 'stepper.primary.default.upcoming.labelColor',
  hoveredBgColor: ''
};

const activeStepStyle = {
  backgroundColor: 'stepper.primary.default.inprogress.backgroundColor',
  textColor: 'stepper.primary.default.inprogress.textColor',
  labelColor: 'stepper.primary.default.inprogress.labelColor',
  hoveredBgColor: 'stepper.primary.hovered.inprogress.backgroundColor'
};

const completedStepStyle = {
  backgroundColor: 'stepper.primary.default.completed.backgroundColor',
  textColor: 'stepper.primary.default.completed.textColor',
  labelColor: 'stepper.primary.default.completed.labelColor',
  hoveredBgColor: 'stepper.primary.hovered.completed.backgroundColor'
};

const AppStepper: React.FC<StepperProps> = ({ activeStep, steps, onStepChange, description }) => {
  const getStyles = (index: number): StepStyles => {
    if (index < activeStep) {
      return completedStepStyle;
    } else if (index === activeStep) {
      return activeStepStyle;
    } else {
      return stepStyle;
    }
  };

  const calculateProgressWidth = (): string => {
    const totalSteps = steps.length;
    const progressPercentage = (activeStep / (totalSteps - 1)) * 100;
    return `calc(${progressPercentage}%)`;
  };

  return (
    <Flex direction="column" position="relative">
      <HStack justifyContent="space-between">
        {steps.map((step, index) => {
          const { backgroundColor, textColor, labelColor, hoveredBgColor } = getStyles(index);
          const isCompleted = index < activeStep;

          return (
            <Flex direction="column" align="center" w="150px" key={index} zIndex={1}>
              <Box
                w="44px"
                h="44px"
                bg="#212121"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontWeight="bold"
                mb="4px"
                cursor="pointer"
                onClick={() => onStepChange(index)}
                borderRadius="16px"
              >
                <Box
                  bg={backgroundColor}
                  h="full"
                  w="full"
                  textAlign="center"
                  borderRadius="16px"
                  border="1px solid transparent"
                  pt="9px"
                  transition=".35s"
                  _hover={{
                    bg: hoveredBgColor
                  }}
                >
                  {isCompleted ? (
                    <Center pt="6px" pl="9px">
                      <AppIconChakra
                        name="right"
                        fill="stepper.primary.default.icon"
                        width="24px"
                        height="24px"
                        cursor="pointer"
                      />
                    </Center>
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
          top="22px"
          left="55px"
          right="60px"
          height="2px"
          width="calc(full - 50px)/2"
          bg="stepper.primary.default.track.upcoming"
          zIndex={0}
        >
          <Box
            height="100%"
            bg="stepper.primary.default.track.completed"
            sx={{
              width: calculateProgressWidth()
            }}
          />
        </Box>
      </HStack>
      {description && (
        <HStack justify="center" mt="20px">
          <AppText size="body3">{description}</AppText>
        </HStack>
      )}
    </Flex>
  );
};

export default AppStepper;
