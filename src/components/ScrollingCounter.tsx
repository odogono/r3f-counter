import { Vector3, Group } from 'three';
import { useMemo, useEffect, useState, useRef } from 'react';
import { DigitStrip } from './DigitStrip';
import { useTexture } from '@react-three/drei';

interface ScrollingCounterProps {
  position: Vector3;
  value: number;
  padding: number;
  texturePath: string;
}

const log = (...args: any[]) => console.log('[ScrollingCounter]', ...args);

export const ScrollingCounter: React.FC<ScrollingCounterProps> = ({
  value,
  padding,
  position,
  texturePath,
}) => {
  const texture = useTexture(texturePath);
  const groupRef = useRef<Group>(null);
  const [planeConstants, setPlaneConstants] = useState<[number, number]>([0, 1]);

  // gets an array of numbers from the value, padding it with zeros if necessary
  const digits = useMemo(
    () => String(value).padStart(padding, '0').split('').map(Number),
    [value, padding]
  );

  // sets the plane constants for the digit strips
  // this is used to clip the digit strips to the correct position
  useEffect(() => {
    if (groupRef.current) {
      const temp = new Vector3();
      const scale = new Vector3();
      groupRef.current.getWorldPosition(temp);
      groupRef.current.getWorldScale(scale);

      setPlaneConstants([temp.y, scale.y]);
    }
  }, []);

  // sets the horizontal (x) positions of the digit strips
  const digitPositions = useMemo(() => {
    const positions = [];
    const inc = 1;
    const start = (-1 * (padding - 1) * inc) / 2;
    for (let i = 0; i < padding; i++) {
      positions.push(new Vector3(start + i * inc, 0, 0));
    }
    return positions;
  }, [padding]);

  return (
    <group position={position} ref={groupRef}>
      {digits.map((digit, index) => (
        <DigitStrip
          key={index}
          value={digit}
          position={digitPositions[index]}
          planeConstants={planeConstants}
          texture={texture}
        />
      ))}
    </group>
  );
};
