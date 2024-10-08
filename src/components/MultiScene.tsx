import { Color, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { ScrollingCounter } from './ScrollingCounter';
import { useIncrementingValue } from './useIncrementingValue';
import { useRandomValue } from './useRandomValue';

const Box = ({ color }: { color: string }) => {
  return (
    <mesh>
      <boxGeometry args={[6, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#7CFC00" />
    </mesh>
  );
};

export const MultiScene = () => {
  const value = useIncrementingValue({
    initialValue: 0,
    increment: 1,
    delay: 500,
  });
  const value2 = useRandomValue({ min: 0, max: 999999, delay: 500 });

  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.setClearColor(new Color('skyblue'));
        gl.localClippingEnabled = true;
      }}
      camera={{ position: [5, 5, 5], fov: 75 }}>
      <OrbitControls />

      <ambientLight intensity={0.5} />
      
      <pointLight position={[10, 10, 10]} />

      <Ground />

      <group position={[-2.5, 2, 0]} rotation={[0, 0.5, 0]} scale={1}>
        <Box color="hotpink" />
        <ScrollingCounter
          position={new Vector3(0, 0, 0.6)}
          value={value}
          padding={6}
          texturePath={'/numbers.png'}
        />
      </group>

      <group position={[3, 0, -1]} rotation={[0, -0.2, 0]} scale={0.5}>
        <Box color="#FF5733" />
        <ScrollingCounter
          position={new Vector3(0, 0, 0.6)}
          value={value2}
          padding={6}
          texturePath={'/numbers.png'}
        />
      </group>

      <axesHelper args={[5]} />
    </Canvas>
  );
};
