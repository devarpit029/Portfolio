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
          opacity={0.22}
          distort={0.25}
          speed={0.35}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.35}
          metalness={0.55}
        />
      </mesh>
    </Float>
  );
}

/** Slowly spinning portal ring — a nod to the Sling Ring / Sanctum portals. */
function PortalRing({ position, radius, color, speed }: {
  position: [number, number, number];
  radius: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2.4, 0.3, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
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
      color: '#F97316', scale: 1.5, // mystic orange
      geometry: new THREE.IcosahedronGeometry(0.7, 0),
    },
    {
      index: 1, position: [5, -2, -6] as [number, number, number],
      color: '#22D3EE', scale: 1.3, // electric cyan
      geometry: new THREE.OctahedronGeometry(0.65, 0),
    },
    {
      index: 2, position: [0, 4, -7] as [number, number, number],
      color: '#FB923C', scale: 1.8, // warm ember
      geometry: new THREE.TorusKnotGeometry(0.4, 0.15, 48, 6),
    },
  ], []);

  const rings = useMemo(() => [
    { position: [-4, 0, -8] as [number, number, number], radius: 1.6, color: '#F97316', speed: 0.12 },
    { position: [4.5, 1.5, -9] as [number, number, number], radius: 1.1, color: '#22D3EE', speed: -0.18 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.75} color="#F97316" />
      <directionalLight position={[-3, -2, 3]} intensity={0.4} color="#22D3EE" />
      {shapes.map((s) => <Shape key={s.index} {...s} />)}
      {rings.map((r, i) => <PortalRing key={i} {...r} />)}
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
