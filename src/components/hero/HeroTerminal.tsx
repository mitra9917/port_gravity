"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollTypedCode } from "@/components/sections/ScrollTypedCode";
import { HERO_PROFILE_TOKENS } from "@/components/hero/heroProfileTokens";

/** Hero scroll band — profile code types while the keyboard sequence plays */
const TYPE_START = 0.12;
const TYPE_END = 0.4;

export function HeroTerminal({ progress }: { progress: MotionValue<number> }) {
    const reduceMotion = usePrefersReducedMotion();

    const opacity = useTransform(progress, [0.1, 0.16, 0.44, 0.58], [0, 1, 0.7, 0]);
    const y = useTransform(progress, [0.1, 0.2], [20, 0]);

    return (
        <motion.aside
            style={reduceMotion ? { opacity } : { opacity, y }}
            className="pointer-events-none absolute left-5 top-[38%] z-10 w-[min(26rem,calc(100%-2.5rem))] rounded-2xl border border-white/[0.1] bg-black/55 p-4 backdrop-blur-md sm:left-8 sm:p-5 md:left-auto md:right-10 md:top-[34%] lg:right-14"
            aria-hidden={true}
        >
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">02 / terminal</p>

            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-2.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden />
                <span className="ml-1.5 font-mono text-[10px] text-zinc-500">profile.ts</span>
            </div>

            <ScrollTypedCode
                progress={progress}
                start={TYPE_START}
                end={TYPE_END}
                tokens={HERO_PROFILE_TOKENS}
            />
        </motion.aside>
    );
}
