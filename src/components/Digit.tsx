import { useEffect, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { Mesh, PlaneGeometry, BufferAttribute, Vector3 } from 'three'

interface DigitProps {
  value: number // 0-9
  position: Vector3
}

const log = (...args: unknown[]) => console.log('[Digit]', ...args);

export const Digit: React.FC<DigitProps> = ({ value, position }) => {
  const meshRef = useRef<Mesh>(null)
  const texture = useTexture('/numbers.png')

  useEffect(() => {
    if (meshRef.current && texture) {
      const geometry = meshRef.current.geometry as PlaneGeometry
      const uvs = geometry.attributes.uv as BufferAttribute
      
      const totalSegments = 10;
      const segmentIndex = value;
      const segmentHeight = 1 / totalSegments;
      const vTop = 1 - (segmentIndex * segmentHeight);
      const vBottom = vTop - segmentHeight;
      const newUvs = new Float32Array([
        0, vTop,    // top-left
        1, vTop,    // top-right
        0, vBottom, // bottom-left
        1, vBottom  // bottom-right
      ]);

      uvs.set(newUvs)
      uvs.needsUpdate = true
    }
  }, [value, texture])

  log(value);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  )
}