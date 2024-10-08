import { useEffect, useState } from "react";



export type UseRandomValueProps = {
  min: number;
  max: number;
  delay: number;
}

export const useRandomValue = ({min, max, delay}: UseRandomValueProps) => {
  const [value, setValue] = useState(Math.floor(Math.random() * (max - min + 1)) + min);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * (max - min + 1)) + min);
    }, delay);
    return () => clearInterval(interval);
  }, [min, max, delay]);

  return value;
};