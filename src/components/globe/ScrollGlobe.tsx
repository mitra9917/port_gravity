"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type NodeDef = {
    id: string;
    label: string;
    copy: string;
    lat: number;
    lon: number;
    appear: number;
};

const NODES: NodeDef[] = [
    {
        id: "systems",
        label: "SYSTEMS",
        copy: "Approaching projects by thinking about how different parts of an application work together, from user interface to basic backend logic.",
        lat: 22,
        lon: -28,
        appear: 0.16,
    },
    {
        id: "fullstack",
        label: "FULL-STACK",
        copy: "Building complete web applications by working across frontend features and foundational backend functionality.",
        lat: -8,
        lon: 48,
        appear: 0.3,
    },
    {
        id: "ai",
        label: "APPLIED AI",
        copy: "Exploring practical AI features such as intelligent automation, data-driven insights, and AI-assisted user workflows in real projects.",
        lat: 18,
        lon: 130,
        appear: 0.44,
    },
    {
        id: "research",
        label: "RESEARCH",
        copy: "Research-oriented technical work focused on literature study, experimentation, analysis, and documentation inside an academic workflow.",
        lat: 42,
        lon: -130,
        appear: 0.58,
    },
    {
        id: "work",
        label: "WORK",
        copy: "A collection of projects showcasing high-performance engineering paired with uncompromising aesthetic design.",
        lat: -32,
        lon: 88,
        appear: 0.72,
    },
];

const LINKS: [string, string][] = [
    ["systems", "fullstack"],
    ["fullstack", "ai"],
    ["systems", "research"],
    ["ai", "work"],
    ["research", "work"],
];

function sph(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
}

function GlobeRig({
    progressRef,
    reduced,
    isMobile,
}: {
    progressRef: React.MutableRefObject<number>;
    reduced: boolean;
    isMobile: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const positions = useMemo(
        () => NODES.map((node) => sph(node.lat, node.lon, 1.62)),
        []
    );
    const linkPositions = useMemo(() => {
        return LINKS.map(([a, b]) => {
            const from = positions[NODES.findIndex((n) => n.id === a)];
            const to = positions[NODES.findIndex((n) => n.id === b)];
            return [from, to] as const;
        });
    }, [positions]);

    useFrame(({ camera }) => {
        const p = progressRef.current;
        if (!groupRef.current) return;

        const rotY = reduced ? 0.35 : p * 1.15;
        const rotX = reduced ? 0.12 : 0.18 + p * 0.28;
        groupRef.current.rotation.y = rotY;
        groupRef.current.rotation.x = rotX;

        const camZ = isMobile ? 7.2 - p * 1.1 : 7.6 - p * 1.8;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 - p * 0.2, 0.08);
        camera.lookAt(0, 0, 0);

        if (glowRef.current) {
            const mat = glowRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.04 + p * 0.06;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <icosahedronGeometry args={[1.5, isMobile ? 0 : 1]} />
                <meshStandardMaterial
                    color="#f4f4f5"
                    wireframe
                    emissive="#d4d4d8"
                    emissiveIntensity={0.18}
                    transparent
                    opacity={0.72}
                />
            </mesh>
            {!isMobile && (
                <>
                    <mesh>
                        <sphereGeometry args={[1.52, 32, 24]} />
                        <meshBasicMaterial color="#a1a1aa" wireframe transparent opacity={0.08} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
                        <torusGeometry args={[2.15, 0.008, 8, 80]} />
                        <meshBasicMaterial color="#737373" transparent opacity={0.45} />
                    </mesh>
                    <mesh ref={glowRef}>
                        <sphereGeometry args={[1.7, 24, 16]} />
                        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.05} />
                    </mesh>
                </>
            )}

            {positions.map((pos, index) => (
                <NodeMark
                    key={NODES[index].id}
                    position={pos}
                    appear={NODES[index].appear}
                    progressRef={progressRef}
                />
            ))}

            {!isMobile && linkPositions.map(([from, to], index) => (
                <Connection
                    key={LINKS[index].join("-")}
                    from={from}
                    to={to}
                    appear={Math.max(NODES.find((n) => n.id === LINKS[index][0])!.appear, NODES.find((n) => n.id === LINKS[index][1])!.appear)}
                    progressRef={progressRef}
                />
            ))}
        </group>
    );
}

function NodeMark({
    position,
    appear,
    progressRef,
}: {
    position: THREE.Vector3;
    appear: number;
    progressRef: React.MutableRefObject<number>;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (!meshRef.current) return;
        const t = THREE.MathUtils.clamp((progressRef.current - appear) / 0.08, 0, 1);
        meshRef.current.scale.setScalar(0.2 + t * 0.8);
        const mat = meshRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = t;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#f8fafc" transparent opacity={0} />
        </mesh>
    );
}

function Connection({
    from,
    to,
    appear,
    progressRef,
}: {
    from: THREE.Vector3;
    to: THREE.Vector3;
    appear: number;
    progressRef: React.MutableRefObject<number>;
}) {
    const lineRef = useRef<THREE.Line>(null);
    const geometry = useMemo(() => {
        const curve = new THREE.QuadraticBezierCurve3(
            from,
            from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.05),
            to
        );
        return new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
    }, [from, to]);

    useFrame(() => {
        const line = lineRef.current;
        if (!line) return;
        const t = THREE.MathUtils.clamp((progressRef.current - appear) / 0.12, 0, 1);
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = t * 0.35;
    });

    return (
        <line ref={lineRef} geometry={geometry}>
            <lineBasicMaterial color="#d4d4d8" transparent opacity={0} />
        </line>
    );
}

function activeNode(progress: number) {
    const visible = NODES.filter((node) => progress >= node.appear);
    return visible[visible.length - 1] ?? NODES[0];
}

export function ScrollGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);
    const reduceMotion = usePrefersReducedMotion();
    const [inView, setInView] = useState(false);
    const [hasRendered, setHasRendered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [node, setNode] = useState(NODES[0]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 28, mass: 0.7 });

    useMotionValueEvent(smooth, "change", (value) => {
        progressRef.current = value;
        setNode((current) => {
            const next = activeNode(value);
            return current.id === next.id ? current : next;
        });
    });

    const overlayOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0.55, 0.22, 0.12, 0.04]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
                if (entry.isIntersecting) setHasRendered(true);
            },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[170vh] w-full bg-black md:h-[280vh]">
            <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
                <motion.div
                    aria-hidden
                    style={{ opacity: gridOpacity }}
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(226,232,240,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [transform:perspective(1000px)_rotateX(64deg)_scale(1.35)] origin-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.72)_80%)]" />

                {hasRendered && !reduceMotion && (
                    <Canvas
                        className="absolute inset-0 z-10 pointer-events-none"
                        camera={{ position: [0, 0.2, 7.6], fov: isMobile ? 42 : 38 }}
                        dpr={isMobile ? 1 : [1, 1.5]}
                        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
                        frameloop={inView ? "always" : "never"}
                    >
                        <ambientLight intensity={0.35} />
                        <directionalLight position={[6, 8, 4]} intensity={0.9} />
                        <GlobeRig progressRef={progressRef} reduced={false} isMobile={isMobile} />
                    </Canvas>
                )}

                {reduceMotion && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="h-48 w-48 rounded-full border border-white/15" />
                    </div>
                )}

                <motion.div
                    style={{ opacity: overlayOpacity }}
                    className="relative z-20 flex h-full w-full flex-col justify-between px-5 py-24 sm:px-8 md:px-12 lg:px-16"
                >
                    <div>
                        <p className="font-mono text-[11px] tracking-[0.18em] text-muted">06 / WORLD</p>
                        <h2 className="type-display mt-4 max-w-xl text-display-sm text-foreground">
                            Interfaces to
                            <span className="block text-foreground/45">intelligent systems.</span>
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {node.label}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-white/55">{node.copy}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
