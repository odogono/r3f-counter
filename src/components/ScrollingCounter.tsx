import { Vector2, Vector3 } from 'three'
import { Digit } from './Digit'
import { useMemo } from 'react'
import { DigitStrip } from './DigitStrip';

interface ScrollingCounterProps {
  value: number;
  padding: number;
}

const log = (...args: any[]) => console.log('[ScrollingCounter]', ...args);

export const ScrollingCounter: React.FC<ScrollingCounterProps> = ({ value, padding }) => {
  
  const digits = useMemo(() => String(value).padStart(padding, '0').split('').map(Number), [value, padding]);

  log(digits);

  // set the digit positions
  const digitPositions = useMemo(() => {
    const positions = [];
    const start = -1 * (padding - 1) * 1.2 / 2;
    for (let i = 0; i < padding; i++) {
      positions.push(new Vector3(start + i * 1.2, 0, 0.01));
    }
    return positions;
  }, [padding]);

  return (
    <group>
      {digits.map((digit, index) => (
        <DigitStrip key={index} value={digit} position={digitPositions[index]} />
      ))}
    </group>
  )
}