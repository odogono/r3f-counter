import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform vec3 colorRight;
  uniform vec3 colorLeft;
  uniform vec3 colorTop;
  uniform vec3 colorBottom;
  uniform vec3 colorFront;
  uniform vec3 colorBack;

  void main() {
    vec3 color;
    vec3 absNormal = abs(vNormal);
    if (absNormal.x > absNormal.y && absNormal.x > absNormal.z) {
      color = vNormal.x > 0.0 ? colorRight : colorLeft;
    } else if (absNormal.y > absNormal.x && absNormal.y > absNormal.z) {
      color = vNormal.y > 0.0 ? colorTop : colorBottom;
    } else {
      color = vNormal.z > 0.0 ? colorFront : colorBack;
    }
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