import { Canvas } from '@react-three/fiber'
import { ScrollingCounter } from './components/ScrollingCounter'
import { Color } from 'three'


function App() {
  return (
    
      <Canvas onCreated={({ gl }) => {
        gl.setClearColor(new Color('#333'));
      }}>
        <ambientLight intensity={0.5} />
        <ScrollingCounter value={234} padding={5} />
      </Canvas>
    
  )
}

export default App