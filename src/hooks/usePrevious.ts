import { useRef, useEffect } from 'react';

const usePrevious = <T>(value: T): T => {
  const ref = useRef<T | any>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
