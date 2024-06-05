import { useState } from 'react';

type ScrollState = 'scroll' | 'hidden';

const useScrollState = (): [ScrollState, () => void, () => void] => {
  const [scroll, setScroll] = useState<ScrollState>('hidden');

  const handleMouseEnter = () => {
    setScroll('scroll');
  };

  const handleMouseLeave = () => {
    setScroll('hidden');
  };

  return [scroll, handleMouseEnter, handleMouseLeave];
};

export default useScrollState;
