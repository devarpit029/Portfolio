import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const scrollState = { y: 0 };
const mouseState = { x: 0, y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => { scrollState.y = window.scrollY; }, { passive: true });
}

function Shape({
  index, position, color, geometry, scale,
}: {
  index: number;
  position: [number, number, number];
  color: string;
  geometry: THREE.BufferGeometry;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const scrollOff = useRef(0);
  const delay = index * 0.15;

  useFrame(() => {
    if (!ref.current) return;
    const sf = Math.min(scrollState.y / 500, 1);
    scrollOff.current += (sf * 4 - scrollOff.current) * 0.04;

    const mx = position[0] + mouseState.x * 0.4;
    const my = position[1] - mouseState.y * 0.4;

    ref.current.position.x += (mx - ref.current.position.x) * 0.03;
    ref.current.position.y += (my - scrollOff.current - ref.current.position.y) * 0.03;
  });

  return (
    <Float speed={0.5 + delay} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <primitive object={geometry} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.2}
          distort={0.2}
          speed={0.3}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const { gl } = useThree();

  useFrame(({ mouse }) => {
    mouseState.x = mouse.x;
    mouseState.y = mouse.y;
  });

  const listener = useMemo(() => {
    const handle = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouseState.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseState.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    return handle;
  }, [gl]);

  gl.domElement.addEventListener('mousemove', listener);

  const shapes = useMemo(() => [
    {
      index: 0, position: [-5, 2, -5] as [number, number, number],
      color: '#8B5CF6', scale: 1.5,
      geometry: new THREE.IcosahedronGeometry(0.7, 0),
    },
    {
      index: 1, position: [5, -2, -6] as [number, number, number],
      color: '#22D3EE', scale: 1.3,
      geometry: new THREE.OctahedronGeometry(0.65, 0),
    },
    {
      index: 2, position: [0, 4, -7] as [number, number, number],
      color: '#A78BFA', scale: 1.8,
      geometry: new THREE.TorusKnotGeometry(0.4, 0.15, 48, 6),
    },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#8B5CF6" />
      <directionalLight position={[-3, -2, 3]} intensity={0.2} color="#22D3EE" />
      {shapes.map((s) => <Shape key={s.index} {...s} />)}
    </>
  );
}

export function HeroScene3D() {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
