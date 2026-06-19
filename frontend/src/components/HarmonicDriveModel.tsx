import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, type Group } from "three";

type HarmonicDriveModelProps = {
  autoRotate?: boolean;
};

const steel = { color: "#6b7280", metalness: 0.88, roughness: 0.22 };
const darkSteel = { color: "#374151", metalness: 0.9, roughness: 0.18 };
const accent = { color: "#0071e3", metalness: 0.75, roughness: 0.28 };
const ring = { color: "#9ca3af", metalness: 0.82, roughness: 0.3 };

export default function HarmonicDriveModel({ autoRotate = false }: HarmonicDriveModelProps) {
  const root = useRef<Group>(null);
  const flexSpline = useRef<Group>(null);
  const waveGen = useRef<Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && root.current) root.current.rotation.y += delta * 0.4;
    if (flexSpline.current) flexSpline.current.rotation.z += delta * 0.15;
    if (waveGen.current) waveGen.current.rotation.z -= delta * 0.25;
  });

  return (
    <group ref={root} scale={1.15}>
      {/* Circular spline — fixed outer ring */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.14, 20, 72]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.04, 12, 72]} />
        <meshStandardMaterial {...ring} />
      </mesh>

      {/* Flex spline — thin cup */}
      <group ref={flexSpline}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.05, 1.12, 0.55, 48, 1, true]} />
          <meshStandardMaterial {...steel} side={DoubleSide} />
        </mesh>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
          <torusGeometry args={[1.05, 0.06, 12, 48]} />
          <meshStandardMaterial {...accent} />
        </mesh>
      </group>

      {/* Wave generator — elliptical cam */}
      <group ref={waveGen} rotation={[0, 0, Math.PI / 6]}>
        <mesh castShadow receiveShadow scale={[1, 0.82, 1]}>
          <cylinderGeometry args={[0.62, 0.62, 0.38, 32]} />
          <meshStandardMaterial {...darkSteel} />
        </mesh>
        <mesh castShadow receiveShadow scale={[1.08, 0.78, 1.08]}>
          <cylinderGeometry args={[0.48, 0.48, 0.42, 32]} />
          <meshStandardMaterial color="#1f2937" metalness={0.92} roughness={0.15} />
        </mesh>
      </group>

      {/* Output shaft */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.7, 24]} />
        <meshStandardMaterial {...ring} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Mounting flange */}
      <mesh castShadow receiveShadow position={[0, -0.42, 0]}>
        <cylinderGeometry args={[1.18, 1.18, 0.12, 48]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle) => (
        <mesh
          key={angle}
          castShadow
          position={[Math.cos(angle) * 0.95, -0.48, Math.sin(angle) * 0.95]}
        >
          <cylinderGeometry args={[0.06, 0.06, 0.1, 12]} />
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}
