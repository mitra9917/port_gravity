'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

function ScrollGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);
    const meshRefOuter = useRef<THREE.Mesh>(null);

    // Track continuous scroll progress
    const { scrollYProgress } = useScroll();

    // Apply a spring to the scroll progress for smooth "scrubbing"
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 100,
        mass: 1
    });

    // Interpolate scroll progress into dynamic rotation and scaling
    const rotationX = useTransform(smoothProgress, [0, 1], [0, Math.PI * 4]);
    const rotationY = useTransform(smoothProgress, [0, 1], [0, Math.PI * 8]);
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.8, 0.8]);

    // Outer ring rotation
    const outerRotationZ = useTransform(smoothProgress, [0, 1], [0, -Math.PI * 4]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x = rotationX.get();
            meshRef.current.rotation.y = rotationY.get();

            const s = scale.get();
            meshRef.current.scale.set(s, s, s);
        }

        if (meshRefOuter.current) {
            meshRefOuter.current.rotation.x = rotationY.get() * 0.5;
            meshRefOuter.current.rotation.z = outerRotationZ.get();
        }
    });

    return (
        <group>
            {/* Inner complex shape */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshStandardMaterial
                    color="#ffffff"
                    wireframe={true}
                    wireframeLinewidth={2}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Outer subtle orbiting ring */}
            <mesh ref={meshRefOuter}>
                <torusGeometry args={[2.5, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#888888"
                    emissive="#444444"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    );
}

export function Scroll3DViewer() {
    return (
        // Height 300vh allows for plenty of scrolling to scrub the timeline smoothly
        <div className="relative h-[300vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Subtle premium background glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-black to-neutral-900 opacity-50 pointer-events-none" />

                <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="absolute inset-0 z-10 pointer-events-none">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={2} />
                    <ScrollGeometry />
                </Canvas>

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center mix-blend-difference">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter uppercase max-w-4xl text-balance">
                        Interfaces to <br /> <span className="text-white/60">INTELLIGENT SYSTEMS</span>
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto text-balance tracking-wide">
                        Frontend-focused developer expanding into backend and AI.
                    </p>
                </div>
            </div>
        </div>
    );
}
