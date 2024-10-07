import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 colorRight;
  uniform vec3 colorLeft;
  uniform vec3 colorTop;
  uniform vec3 colorBottom;
  uniform vec3 colorFront;
  uniform vec3 colorBack;

  void main() {
    vec3 color;
    if (vUv.x < 0.01) color = colorLeft;
    else if (vUv.x > 0.99) color = colorRight;
    else if (vUv.y < 0.01) color = colorBottom;
    else if (vUv.y > 0.99) color = colorTop;
    else if (abs(vUv.x - vUv.y) < 0.01) color = colorFront;
    else color = colorBack;
    gl_FragColor = vec4(color, 1.0);
  }
`

export function RotatingCube() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <boxGeometry args={[2, 2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          colorRight: { value: [1, 0, 0] },    // Red
          colorLeft: { value: [0, 1, 0] },     // Green
          colorTop: { value: [0, 0, 1] },      // Blue
          colorBottom: { value: [1, 1, 0] },   // Yellow
          colorFront: { value: [1, 0, 1] },    // Magenta
          colorBack: { value: [0, 1, 1] },     // Cyan
        }}
      />
    </mesh>
  )
}