import { useEffect, useState } from "react";


export type UseIncrementingValueProps = {
  initialValue: number;
  increment: number;
  delay: number;
}

export const useIncrementingValue = ({initialValue, increment, delay}: UseIncrementingValueProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value + increment);
    }, delay);
    return () => clearInterval(interval);
  }, [value, increment, delay]);

  return value;
};