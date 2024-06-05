import { useState } from 'react';

type UseTooltipReturnType = [boolean, () => void, () => void];

const useTooltip = (): UseTooltipReturnType => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipOpen(false);
  };

  return [isTooltipOpen, handleMouseEnter, handleMouseLeave];
};

export default useTooltip;
