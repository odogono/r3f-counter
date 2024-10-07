import { Vector3 } from "three"
import { Digit } from "./Digit"
import { useMemo, useRef, useEffect } from "react";
import { Group } from "three";


type DigitStripProps = {
  value: number;
  position: Vector3;
}

export const DigitStrip: React.FC<DigitStripProps> = ({ position,value }) => {
  const groupRef = useRef<Group>(null);
  const digits = Array.from({ length: 10 }, (_, i) => i);

  const digitPositions = useMemo(() => {
    return digits.map((digit, index) => new Vector3(0, -index * 1, 0))
  }, [digits])

  useEffect(() => {
    if (groupRef.current) {
      const { x,z } = position;
      groupRef.current.position.set(x, value, z);
    }
  }, [position, value])

  return (
    <group ref={groupRef}>
      {digits.map((digit, index) => (
        <Digit key={index} value={digit} position={digitPositions[index]} />
      ))}
    </group>
  )
} 