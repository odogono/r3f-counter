import { Vector3 } from "three"
import { Digit } from "./Digit"
import { useMemo, useRef } from "react";
import { Group } from "three";
import { useSpring, animated } from "@react-spring/three";

type DigitStripProps = {
  value: number;
  position: Vector3;
}

export const DigitStrip: React.FC<DigitStripProps> = ({ position, value }) => {
  const groupRef = useRef<Group>(null);
  const digits = Array.from({ length: 10 }, (_, i) => i);

  const digitPositions = useMemo(() => digits.map((index) => new Vector3(0, -index * 1, 0)), [digits])

  // Create a spring animation for the y position
  const { y } = useSpring({
    y: value,
    config: { mass: 1, tension: 180, friction: 12 }
  });

  return (
    <animated.group
      ref={groupRef}
      position-x={position.x}
      position-y={y}
      position-z={position.z}
    >
      {digits.map((digit, index) => (
        <Digit key={index} value={digit} position={digitPositions[index]} />
      ))}
    </animated.group>
  )
}