import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1800, mouse }) {
    const mesh = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            const speed = Math.random() * 0.5 + 0.1;
            const radius = Math.random() * 0.04 + 0.01;
            temp.push({ x, y, z, speed, radius, ox: x, oy: y });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const mouseX = mouse.current[0];
        const mouseY = mouse.current[1];

        particles.forEach((p, i) => {
            // Gentle wave motion
            const wave = Math.sin(time * p.speed + i * 0.05) * 0.3;
            // Mouse repulsion
            const dx = p.ox + wave - mouseX * 8;
            const dy = p.oy - mouseY * 4;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repulsion = dist < 3 ? (3 - dist) / 3 : 0;

            dummy.position.set(
                p.ox + wave - repulsion * (mouseX * 2),
                p.oy + Math.cos(time * p.speed * 0.5) * 0.2 - repulsion * (mouseY * 2),
                p.z + Math.sin(time * p.speed * 0.3) * 0.1
            );
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <sphereGeometry args={[0.035, 4, 4]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.7} />
        </instancedMesh>
    );
}

function ConnectingLines({ count = 60 }) {
    const linesRef = useRef();

    const positions = useMemo(() => {
        const pts = [];
        for (let i = 0; i < count; i++) {
            pts.push(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 8
            );
        }
        return new Float32Array(pts);
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (linesRef.current) {
            linesRef.current.rotation.y = time * 0.015;
            linesRef.current.rotation.x = Math.sin(time * 0.01) * 0.1;
        }
    });

    return (
        <points ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#06b6d4" size={0.08} transparent opacity={0.5} />
        </points>
    );
}

function HeroScene() {
    const mouse = useRef([0, 0]);

    const handleMouseMove = (e) => {
        const { clientWidth, clientHeight } = e.currentTarget;
        mouse.current = [
            (e.clientX / clientWidth - 0.5) * 2,
            -(e.clientY / clientHeight - 0.5) * 2,
        ];
    };

    return (
        <div
            className="hero-canvas-container canvas-interactive"
            onMouseMove={handleMouseMove}
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <Particles mouse={mouse} />
                <ConnectingLines />
            </Canvas>
        </div>
    );
}

export default HeroScene;
