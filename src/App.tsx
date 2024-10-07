import { Canvas } from '@react-three/fiber'
import { ScrollingCounter } from './components/ScrollingCounter'
import { RotatingCube } from './components/RotatingCube'
import { Color } from 'three'
import { useEffect, useState } from 'react';

function App() {

  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => prevValue + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  return (
    <Canvas onCreated={({ gl }) => {
      gl.setClearColor(new Color('#333'));
    }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
      <ScrollingCounter value={value} padding={6} />
    </Canvas>
  )
}

export default App