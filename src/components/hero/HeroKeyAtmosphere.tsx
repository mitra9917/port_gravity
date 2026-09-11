"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function HeroKeyAtmosphere({ progress }: { progress: MotionValue<number> }) {
    const reduceMotion = usePrefersReducedMotion();
    const isMobile = useMediaQuery("(max-width: 767px)");
    const glowOpacity = useTransform(progress, [0.2, 0.34, 0.52, 0.66], [0, 0.55, 0.8, 0]);
    const ambientOpacity = useTransform(progress, [0.22, 0.4, 0.6], [0, 0.22, 0]);
    const glowY = useTransform(progress, [0.2, 0.55], [16, -18]);
    const glowScale = useTransform(progress, [0.2, 0.45, 0.62], [0.92, 1.06, 1.35]);

    if (reduceMotion || isMobile) {
        return null;
    }

    return (
        <>
            <motion.div
                aria-hidden
                style={{ opacity: ambientOpacity }}
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,220,235,0.07),transparent_58%)]"
            />
            <motion.div
                aria-hidden
                style={{ opacity: glowOpacity, y: glowY, scale: glowScale }}
                className="absolute left-1/2 top-[58%] h-[min(38vw,22rem)] w-[min(38vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.22)_0%,transparent_68%)] mix-blend-screen"
            />
        </>
    );
}
