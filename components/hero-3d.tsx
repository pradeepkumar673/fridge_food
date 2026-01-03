"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

function FloatingTomato({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#dc2626"
          roughness={0.2}
          metalness={0.1}
          emissive="#dc2626"
          emissiveIntensity={0.3}
        />
        {/* Tomato stem */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.15, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.8} />
        </mesh>
      </mesh>
    </Float>
  )
}

function FloatingApple({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={[1, 0.9, 1]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          roughness={0.3}
          metalness={0.2}
          emissive="#dc2626"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function FloatingLettuce({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1.8}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial
            color="#22c55e"
            roughness={0.6}
            metalness={0.1}
            emissive="#16a34a"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingCarrot({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={2.2}>
      <group ref={meshRef} position={position} rotation={[0.3, 0.5, 0]}>
        <mesh>
          <coneGeometry args={[0.3, 1.2, 12]} />
          <meshStandardMaterial
            color="#f97316"
            roughness={0.4}
            metalness={0.1}
            emissive="#ea580c"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Carrot top */}
        <mesh position={[0, 0.65, 0]}>
          <coneGeometry args={[0.15, 0.3, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  const ingredients = useMemo(
    () => [
      { type: "tomato", position: [-2.5, 1.5, -3] as [number, number, number] },
      { type: "apple", position: [2.8, -1, -4] as [number, number, number] },
      { type: "lettuce", position: [0.5, 2.5, -5] as [number, number, number] },
      { type: "carrot", position: [-3.2, -1.8, -3.5] as [number, number, number] },
      { type: "tomato", position: [3.5, 1, -4.5] as [number, number, number] },
      { type: "apple", position: [-1, -2.5, -4] as [number, number, number] },
    ],
    [],
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#dc2626" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#f59e0b" />

      {ingredients.map((ingredient, i) => {
        switch (ingredient.type) {
          case "tomato":
            return <FloatingTomato key={i} position={ingredient.position} />
          case "apple":
            return <FloatingApple key={i} position={ingredient.position} />
          case "lettuce":
            return <FloatingLettuce key={i} position={ingredient.position} />
          case "carrot":
            return <FloatingCarrot key={i} position={ingredient.position} />
          default:
            return null
        }
      })}
      <Environment preset="sunset" />
    </>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
