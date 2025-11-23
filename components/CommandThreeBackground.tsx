'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

// Command-specific particles with high-tech theme
function CommandParticle({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return

    const time = state.clock.elapsedTime
    // Faster, more energetic movement for command center
    meshRef.current.position.y += Math.sin(time * 1.2 + position[0]) * 0.005
    meshRef.current.position.x += Math.cos(time * 0.9 + position[1]) * 0.004
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.012

    // Pulse effect
    const scale = 1 + Math.sin(time * 5 + position[0]) * 0.2
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.06, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Command geometric shapes - tech/cyberpunk feel
function CommandGeometricShape({
  position,
  rotation,
  color,
  shape,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
  shape: 'box' | 'dodecahedron' | 'torus'
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return

    const time = state.clock.elapsedTime
    // Dynamic rotation
    meshRef.current.rotation.x += 0.008
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.z += 0.005

    // Float pattern
    meshRef.current.position.y += Math.sin(time * 0.8 + position[0]) * 0.008
    meshRef.current.position.x += Math.cos(time * 0.6 + position[1]) * 0.006
  })

  const getGeometry = () => {
    switch (shape) {
      case 'box':
        return <boxGeometry args={[0.25, 0.25, 0.25]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.2, 0]} />
      case 'torus':
        return <torusGeometry args={[0.15, 0.05, 16, 32]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      {getGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={1.0}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// Grid floor for "Command Center" feel
function CommandGrid() {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return null

  return (
    <gridHelper args={[30, 30, 0x4f46e5, 0x222222]} position={[0, -2, 0]} rotation={[0, 0, 0]} />
  )
}

// Command camera controller
function CommandCameraController() {
  const { camera, size } = useThree()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / size.width) * 2 - 1,
        y: -(e.clientY / size.height) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size, shouldReduceMotion])

  useFrame(() => {
    if (shouldReduceMotion) return

    // Dynamic camera movement
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.08
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.08
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Command lights - moody and vibrant
function CommandAnimatedLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const lightRef2 = useRef<THREE.PointLight>(null)
  const lightRef3 = useRef<THREE.PointLight>(null)
  const shouldReduceMotion = useReducedMotion()

  useFrame((state) => {
    if (shouldReduceMotion) return

    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5
      lightRef.current.intensity = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.5
    }

    if (lightRef2.current) {
      lightRef2.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 6
      lightRef2.current.position.z = Math.sin(state.clock.elapsedTime * 0.4) * 6
      lightRef2.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.4
    }

    if (lightRef3.current) {
      lightRef3.current.position.x = -Math.sin(state.clock.elapsedTime * 0.6) * 4
      lightRef3.current.position.z = -Math.cos(state.clock.elapsedTime * 0.6) * 4
      lightRef3.current.intensity = 0.6 + Math.cos(state.clock.elapsedTime * 2.5) * 0.3
    }
  })

  return (
    <>
      <pointLight ref={lightRef} intensity={1.0} color="#00ffff" distance={10} />
      <pointLight ref={lightRef2} intensity={0.8} color="#d946ef" distance={10} />
      <pointLight ref={lightRef3} intensity={0.6} color="#4f46e5" distance={10} />
      <ambientLight intensity={0.2} />
    </>
  )
}

// Command scene
function CommandScene() {
  const shouldReduceMotion = useReducedMotion()

  // Particles
  const particles = Array.from({ length: shouldReduceMotion ? 20 : 60 }, () => {
    const colors = ['#00ffff', '#d946ef', '#4f46e5', '#3b82f6', '#f472b6']
    return {
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  })

  // Shapes
  const shapes = Array.from({ length: shouldReduceMotion ? 3 : 8 }, () => {
    const colors = ['#00ffff', '#d946ef', '#4f46e5']
    const shapeTypes: ('box' | 'dodecahedron' | 'torus')[] = ['box', 'dodecahedron', 'torus']
    return {
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
        number,
        number,
        number,
      ],
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    }
  })

  return (
    <>
      <CommandCameraController />
      <CommandAnimatedLight />
      {!shouldReduceMotion && <CommandGrid />}
      {particles.map((particle, i) => (
        <CommandParticle key={`p-${i}`} position={particle.position} color={particle.color} />
      ))}
      {shapes.map((shape, i) => (
        <CommandGeometricShape
          key={`s-${i}`}
          position={shape.position}
          rotation={shape.rotation}
          color={shape.color}
          shape={shape.shape}
        />
      ))}
      <fog attach="fog" args={['#030712', 5, 20]} />
    </>
  )
}

// Command Three.js background
export function CommandThreeBackground() {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background" />
    )
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-40 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        performance={{ min: 0.5 }}
      >
        <CommandScene />
      </Canvas>
    </div>
  )
}
