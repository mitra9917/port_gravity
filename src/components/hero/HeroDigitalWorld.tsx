"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HeroDigitalWorld({ progress }: { progress: MotionValue<number> }) {
    const reduceMotion = usePrefersReducedMotion();
    const veilOpacity = useTransform(progress, [0.48, 0.68], [0, 0.62]);
    const gridOpacity = useTransform(progress, [0.5, 0.72], [0, 0.9]);
    const gridY = useTransform(progress, [0.5, 0.88], [28, -24]);
    const labelOpacity = useTransform(progress, [0.58, 0.66, 0.9, 0.97], [0, 1, 1, 0]);
    const [clip, setClip] = useState("circle(3% at 50% 58%)");

    useMotionValueEvent(progress, "change", (value) => {
        const t = Math.max(0, Math.min(1, (value - 0.46) / 0.32));
        setClip(`circle(${3 + t * 162}% at 50% 58%)`);
    });

    if (reduceMotion) {
        return (
            <motion.div
                aria-hidden
                style={{ opacity: veilOpacity }}
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"
            />
        );
    }

    return (
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ clipPath: clip }}>
            <motion.div className="absolute inset-0 bg-[#050506]" style={{ opacity: veilOpacity }} />

            <motion.div
                className="absolute -inset-[45%] origin-center"
                style={{ opacity: gridOpacity, y: gridY }}
            >
                <div
                    className="relative h-full w-full origin-center"
                    style={{ transform: "perspective(1000px) rotateX(64deg)" }}
                >
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(226,232,240,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.12) 1px, transparent 1px)",
                            backgroundSize: "64px 64px",
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(226,232,240,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(226,232,240,0.05) 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                        }}
                    />
                </div>
            </motion.div>

            <motion.div
                className="absolute inset-x-0 top-[58%] h-px bg-white/25"
                style={{ opacity: gridOpacity }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_0%,rgba(0,0,0,0.55)_78%)]" />

            <motion.p
                style={{ opacity: labelOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40"
            >
                05 / surface
            </motion.p>
        </div>
    );
}
