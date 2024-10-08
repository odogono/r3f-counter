import { useEffect, useMemo, useRef } from 'react';
import { Group, Plane,Vector3, ShaderMaterial, Texture } from 'three';
import { useSpring, animated } from '@react-spring/three';
import {
  createInstances,
  InstancedAttribute
} from '@react-three/drei';

type DigitStripProps = {
  value: number;
  position: Vector3;
  planeConstants: [number, number];
  texture: Texture;
};

const log = (...args: unknown[]) => console.log('[DigitStrip]', ...args);

type DigitAttributes = {
  aIndex: number;
};

const [DigitInstances, Digit] = createInstances<DigitAttributes>();

const InstancedDigits: React.FC<{ count: number, planeConstants: [number, number], texture: Texture }> = ({
  count,
  planeConstants = [0, 1],
  texture
}) => {
  const materialRef = useRef<ShaderMaterial>(null);
  

  const clippingPlanes = useMemo(() => [
    new Plane(new Vector3(0, -1, 0), 0.5),
    new Plane(new Vector3(0, 1, 0), -0.5)
  ], []);
  
  // update the y positions of the clipping planes
  // note: not a very accurate way of updating the positions
  useEffect(() => {
    clippingPlanes[0].constant = planeConstants[0] + (0.5 * planeConstants[1]);
    clippingPlanes[1].constant = -(planeConstants[0] - (0.5 * planeConstants[1])); 
  }, [clippingPlanes, planeConstants]);

  return (
      <DigitInstances limit={count}>
        <InstancedAttribute name="aIndex" defaultValue={0} />
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
        ref={materialRef}
          attach="material"
          transparent={true}
          clipping={true}
          clippingPlanes={clippingPlanes}
          args={[
            {
              uniforms: {
                uTexture: { value: texture },
                uCount: { value: count },
                uSmoothness: { value: 0.3 },
              },
              vertexShader: `
                uniform float uCount;
                attribute float aIndex;
                varying vec2 vUv;

                #include <clipping_planes_pars_vertex>

                void main() {
                  #include <begin_vertex>

                  vUv = uv;
                  vUv.y = (vUv.y + uCount - aIndex - 1.0) / uCount;
                  
                  #include <project_vertex>
                  #include <clipping_planes_vertex>
                }
              `,
              fragmentShader: `
                uniform sampler2D uTexture;
                uniform float uSmoothness;
                varying vec2 vUv;

                #include <clipping_planes_pars_fragment>

                void main() {

                  #include <clipping_planes_fragment>

                  vec4 texColor = texture2D(uTexture, vUv);
                  float alpha = smoothstep(0.5 - uSmoothness, 0.5 + uSmoothness, texColor.a);
                  gl_FragColor = vec4(texColor.rgb, alpha);
                }
              `,
            },
          ]}
        />
    
        {Array.from({ length: count }, (_, i) => (
          <Digit key={i} position={[0, -i * 1, 0]} aIndex={i} />
        ))}
      </DigitInstances>
  );
};

export const DigitStrip: React.FC<DigitStripProps> = ({ position, value, planeConstants, texture }) => {
  const groupRef = useRef<Group>(null);
  
  // Create a spring animation for the y position
  const { y } = useSpring({
    y: value,
    config: { mass: 1, tension: 200, friction: 20 }
  });

  return (
    <animated.group
      ref={groupRef}
      position-x={position.x}
      position-y={y}
      position-z={position.z}>
      <InstancedDigits count={10} planeConstants={planeConstants} texture={texture} />
    </animated.group>
  );
};
