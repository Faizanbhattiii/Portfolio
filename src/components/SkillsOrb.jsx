import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
    "Python", "C++", "Go", "TypeScript", "Rust",
    "React", "Node.js", "PyTorch", "TensorFlow", "Docker",
    "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "Linux",
    "GraphQL", "gRPC", "AWS", "Git", "FastAPI",
    "Next.js", "Supabase", "WebSockets", "CUDA", "x86 ASM"
];

const COLORS = ["#6366f1", "#06b6d4", "#a855f7", "#10b981", "#f59e0b"];

function SkillTag({ text, position, color }) {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.lookAt(state.camera.position);
        }
    });

    return (
        <group ref={ref} position={position}>
            <Text
                fontSize={0.22}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.005}
                outlineColor="black"
            >
                {text}
            </Text>
        </group>
    );
}

function OrbContent() {
    const groupRef = useRef();

    const tagPositions = useMemo(() => {
        return SKILLS.map((_, i) => {
            // Fibonacci sphere distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / SKILLS.length);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            const r = 3.2;
            return [
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ];
        });
    }, []);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.18;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Wireframe sphere */}
            <mesh>
                <sphereGeometry args={[3, 24, 24]} />
                <meshBasicMaterial
                    color="#6366f1"
                    transparent
                    opacity={0.04}
                    wireframe
                />
            </mesh>

            {/* Skill labels */}
            {SKILLS.map((skill, i) => (
                <SkillTag
                    key={skill}
                    text={skill}
                    position={tagPositions[i]}
                    color={COLORS[i % COLORS.length]}
                />
            ))}
        </group>
    );
}

function SkillsOrb() {
    return (
        <div className="orb-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
                <OrbContent />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    minPolarAngle={Math.PI * 0.2}
                    maxPolarAngle={Math.PI * 0.8}
                />
            </Canvas>
        </div>
    );
}

export default SkillsOrb;
