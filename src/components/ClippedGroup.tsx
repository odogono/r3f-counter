import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Group, Vector3, Plane } from 'three'

type ClippedGroupProps = {
  isEnabled: boolean;
  children: React.ReactNode;
  width: number;
  height: number;
  x?: number;
  y?: number;
}

export const ClippedGroup: React.FC<ClippedGroupProps> = ({ children, width, height, x = 0, y = 0, isEnabled = true }) => {
  const groupRef = useRef<Group>(null)
  const { gl } = useThree()

  useEffect(() => {
    const { clippingPlanes, localClippingEnabled } = gl

    if (isEnabled && groupRef.current) {
      const planes = [
        new Plane(new Vector3(-1, 0, 0), width / 2),
        new Plane(new Vector3(1, 0, 0), width / 2),
        new Plane(new Vector3(0, -1, 0), height / 2),
        new Plane(new Vector3(0, 1, 0), height / 2),
      ]

      // groupRef.current.traverse((child) => {
      //   if (child.material) {
      //     child.material.clippingPlanes = planes
      //     child.material.clipIntersection = false
      //     child.material.clipShadows = true
      //     child.material.needsUpdate = true
      //   }
      // })

      gl.clippingPlanes = planes;
      gl.localClippingEnabled = true;
    }

    return () => Object.assign(gl, { clippingPlanes, localClippingEnabled});
  }, [width, height, gl, isEnabled])

  return (
    <group ref={groupRef} position={[x, y, 0]}>
      {children}
    </group>
  )
}