import { useState } from 'react';

export interface Navigator<T> {
  currentStepIndex: number;
  step: T;
  steps: T[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
}

const useNavigator = <T>(steps: T[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const resetNavigator = () => {
    setCurrentStepIndex(0);
  };

  const removeStep = (removedIndex: number) => {
    let newCurrentStep = currentStepIndex;
    if (currentStepIndex > 0 && removedIndex <= currentStepIndex) {
      newCurrentStep = currentStepIndex - 1;
    }
    goTo(newCurrentStep);
    return newCurrentStep;
  };

  return {
    currentStepIndex,
    setCurrentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    removeStep,
    goTo,
    next,
    back,
    resetNavigator
  };
};

export default useNavigator;
