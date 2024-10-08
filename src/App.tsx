import { Canvas } from '@react-three/fiber';
import { ScrollingCounter } from './components/ScrollingCounter';
import { RotatingCube } from './components/RotatingCube';
import { Color, Vector3 } from 'three';
import { useEffect, useState } from 'react';
import { OrbitControls, useTexture } from '@react-three/drei';

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => prevValue + 1);
      // setValue(Math.floor(Math.random() * 999999));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
      
        <ScrollingCounter position={new Vector3(0, -5, 0)} value={value} padding={6} />
      
    </Canvas>
  );
}

function Box({ color }) {
  return (
    <mesh>
      <boxGeometry args={[6, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  )
}

function Scene() {
  
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => prevValue + 1);
      setValue2(Math.floor(Math.random() * 999999));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas onCreated={({ gl }) => {
      gl.setClearColor(new Color('#333'));
      gl.localClippingEnabled = true;
    }}camera={{ position: [5, 5, 5], fov: 75 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Ground />
      <group position={[-2.5, 2, 0]} rotation={[0, 0.5, 0]} scale={1}>
        <Box color="hotpink" />
        <ScrollingCounter position={new Vector3(0, 0, 0.6)} value={value} padding={6} texturePath={'/numbers.png'} />
      </group>
      <group position={[3.5, 0, -2]} rotation={[0, -0.2, 0]} scale={0.5}>
      <Box color="lightblue" />
      <ScrollingCounter position={new Vector3(0, 0, 0.6)} value={value2} padding={6} texturePath={'/numbers.png'} />
      </group>
      
      <axesHelper args={[5]} />
    </Canvas>
  )
}

export default Scene;
