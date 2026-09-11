"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const headline = ["Ideas", "to", "Impact."];

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroOverlay({ progress }: { progress: MotionValue<number> }) {
    const reduceMotion = usePrefersReducedMotion();
    const [stage, setStage] = useState("01");

    const copyOpacity = useTransform(progress, [0, 0.08, 0.28], [1, 1, 0]);
    const copyY = useTransform(progress, [0, 0.28], [0, -20]);
    const indicatorOpacity = useTransform(progress, [0, 0.12], [1, 0]);
    const lineScale = useTransform(progress, [0, 1], [0.08, 1]);
    const stageOpacity = useTransform(progress, [0, 0.88, 0.96], [1, 1, 0]);
    const scrimOpacity = useTransform(progress, [0, 0.22], [1, 0.85]);

    useMotionValueEvent(progress, "change", (value) => {
        if (value < 0.14) setStage("01");
        else if (value < 0.38) setStage("02");
        else if (value < 0.48) setStage("03");
        else if (value < 0.64) setStage("04");
        else setStage("05");
    });

    return (
        <div className="relative flex h-full w-full flex-col">
            {/* Readability scrims — keep copy off the keyboard keys */}
            <motion.div
                style={reduceMotion ? undefined : { opacity: scrimOpacity }}
                className="pointer-events-none absolute inset-0"
                aria-hidden
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/15 to-black/70" />
            </motion.div>

            <motion.p
                style={reduceMotion ? undefined : { opacity: stageOpacity }}
                className="absolute left-5 top-24 z-20 font-mono text-[11px] tracking-[0.18em] text-white/55 sm:left-8 md:left-12 lg:left-16"
            >
                {stage} / 06
            </motion.p>

            <motion.div
                style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
                className="relative z-20 flex h-full flex-col px-5 pb-10 pt-28 sm:px-8 md:px-12 lg:px-16"
            >
                {/* Copy stays in the upper band — keyboard keeps the lower frame */}
                <div className="max-w-lg">
                    <p className="type-kicker mb-6 text-white/65">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />
                        Available for opportunities
                    </p>

                    <h1 className="type-display text-display text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                        {headline.map((line, index) => (
                            <motion.span
                                key={line}
                                className="block"
                                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08 * index, ease }}
                            >
                                {line}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p
                        className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-gray-400 sm:text-base"
                        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.32, ease }}
                    >
                        Computer Science undergraduate developing end-to-end web applications,
                        combining modern frontend engineering, scalable backend logic,
                        and early-stage AI integrations.
                    </motion.p>

                    <motion.div
                        className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.48, ease }}
                    >
                        <Link
                            href="/projects"
                            className="pointer-events-auto text-sm tracking-wide text-white transition-opacity hover:opacity-70"
                        >
                            View My Work ↗
                        </Link>
                        <Link
                            href="/about"
                            className="pointer-events-auto text-sm tracking-wide text-white/55 transition-colors hover:text-white"
                        >
                            About Me ↗
                        </Link>
                        <a
                            href="/assets/MY_RESUME.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pointer-events-auto text-sm tracking-wide text-white/55 transition-colors hover:text-white"
                        >
                            Resume ↗
                        </a>
                    </motion.div>
                </div>

                <div className="flex-1" aria-hidden />

                <motion.div
                    style={reduceMotion ? undefined : { opacity: indicatorOpacity }}
                    className="flex flex-col items-start gap-3"
                >
                    <div className="h-px w-16 overflow-hidden bg-white/25">
                        <motion.div
                            className="h-px w-full origin-left bg-white/80"
                            style={{ scaleX: lineScale }}
                        />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                        Scroll to explore
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
