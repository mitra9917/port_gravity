'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const vertexShader = `
  varying vec2 vUv;
  uniform float uVelocity;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave distortion based on Y position and scroll velocity
    // Higher segments in planeGeometry ensure smooth curving
    float wave = sin(pos.y * 3.0 + uVelocity * 5.0) * uVelocity * 0.15;
    pos.z += wave;
    pos.x += wave * 0.2;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uVelocity;
  varying vec2 vUv;

  void main() {
    // RGB split intensity driven by velocity
    float r = texture2D(uTexture, vUv + vec2(uVelocity * 0.02, 0.0)).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - vec2(uVelocity * 0.02, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function DistortedImageMaterial({ src }: { src: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Track continuous scroll progress
    const { scrollY } = useScroll();
    // Get raw velocity
    const scrollVelocity = useVelocity(scrollY);
    // Smooth it nicely
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    // Map large pixel velocity to small uniform values (-1 to 1 range typically)
    const velocityMultiplier = useTransform(smoothVelocity, [-1000, 1000], [-1, 1]);

    const texture = useTexture(src);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uVelocity: { value: 0 },
        }),
        [texture]
    );

    useFrame(() => {
        if (materialRef.current) {
            // Lerp uniform for butter-smooth visual deceleration
            const targetVelocity = velocityMultiplier.get();
            materialRef.current.uniforms.uVelocity.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uVelocity.value,
                targetVelocity,
                0.1
            );
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            {/* 32x32 segments allow the vertex shader wave to look smooth */}
            <planeGeometry args={[5, 3.5, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

import { Canvas } from '@react-three/fiber';

interface DistortedImageProps {
    src: string;
    className?: string;
}

export function DistortedImage({ src, className }: DistortedImageProps) {
    return (
        <div className={`relative w-full h-full overflow-hidden rounded-2xl ${className || ''}`}>
            <Canvas
                className="absolute inset-0 pointer-events-none"
                camera={{ position: [0, 0, 4] }}
            >
                <DistortedImageMaterial src={src} />
            </Canvas>
        </div>
    );
}
