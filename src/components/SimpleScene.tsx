import { Color, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';

import { RotatingCube } from './RotatingCube';
import { ScrollingCounter } from './ScrollingCounter';
import { useIncrementingValue } from './useIncrementingValue';

export const SimpleScene = () => {
  
  const value = useIncrementingValue({ initialValue: 0, increment: 1, delay: 500 });

  return (
    <Canvas
      gl={{ localClippingEnabled: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new Color('#333'));
        gl.localClippingEnabled = true;
      }}
      camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <RotatingCube />

      <ScrollingCounter
        position={new Vector3(0, 0, 0)}
        value={value}
        padding={6}
        texturePath={'/numbers.png'}
      />
    </Canvas>
  );
};
