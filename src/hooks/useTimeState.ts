import { useState } from 'react';

export const useTimedState = (initialState: boolean, timeout: number = 3000) => {
  const [state, setState] = useState(initialState);

  const handleAction = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, timeout);
  };

  return [state, handleAction] as const;
};
