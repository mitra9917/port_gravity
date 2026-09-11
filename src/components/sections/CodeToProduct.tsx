"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { getProjectBySlug } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ScrollTypedCode, TYPED_CODE_SNIPPET } from "@/components/sections/ScrollTypedCode";

const product = getProjectBySlug("averion_ai")!;

const stages = [
    { id: "01", label: "CODE" },
    { id: "02", label: "COMPONENT" },
    { id: "03", label: "INTERFACE" },
    { id: "04", label: "PRODUCT" },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

/** Stage 0 scroll band — code types out here, rewinds on scroll up */
const CODE_TYPE_START = 0;
const CODE_TYPE_END = 0.26;

function StageCode({ progress }: { progress: MotionValue<number> }) {
    return (
        <div className="w-full">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
                <span className="ml-2 font-mono text-[10px] text-zinc-500">retrieve.ts</span>
            </div>
            <ScrollTypedCode progress={progress} start={CODE_TYPE_START} end={CODE_TYPE_END} />
        </div>
    );
}

function StageComponent() {
    return (
        <div className="panel-surface w-full max-w-md rounded-2xl p-5">
            <p className="panel-kicker">Query</p>
            <div className="panel-body mt-3 flex items-center justify-between rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-sm">
                <span>Ask the knowledge base</span>
                <span className="panel-title">→</span>
            </div>
        </div>
    );
}

function StageInterface() {
    return (
        <div className="w-full space-y-4">
            <div className="panel-body rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm">
                Search organizational knowledge
            </div>
            <div className="panel-surface rounded-2xl p-5">
                <p className="panel-body text-sm leading-relaxed">{product.overview.solution}</p>
                <p className="panel-muted mt-4 font-mono text-[10px] tracking-[0.14em]">
                    Grounded · Citations · pgvector
                </p>
            </div>
        </div>
    );
}

function StageProduct() {
    return (
        <div>
            <p className="panel-kicker">04 / Product</p>
            <h3 className="panel-title type-display mt-3 text-4xl md:text-5xl">{product.title}</h3>
            <p className="panel-body mt-4 max-w-xl text-sm leading-relaxed">{product.description}</p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <Link href={`/projects/${product.slug}`} className="panel-title transition-opacity hover:opacity-80">
                    Case study ↗
                </Link>
                <a
                    href={product.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-body transition-opacity hover:opacity-80"
                >
                    Live ↗
                </a>
                <a
                    href={product.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-body transition-opacity hover:opacity-80"
                >
                    GitHub ↗
                </a>
            </div>
        </div>
    );
}

function renderStage(active: number, progress: MotionValue<number>) {
    switch (active) {
        case 0:
            return <StageCode progress={progress} />;
        case 1:
            return <StageComponent />;
        case 2:
            return <StageInterface />;
        case 3:
            return <StageProduct />;
        default:
            return null;
    }
}

export function CodeToProduct() {
    const reduceMotion = usePrefersReducedMotion();
    const targetRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const next = Math.min(stages.length - 1, Math.max(0, Math.floor(value * stages.length)));
        setActive((current) => (current === next ? current : next));
    });

    return (
        <section className="relative w-full bg-background">
            <div className="px-5 pb-8 pt-24 sm:px-8 md:px-12 lg:px-16">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted">03 / PROCESS</p>
                <h2 className="type-display mt-6 text-display text-foreground">
                    {["From code", "to product."].map((line, index) => (
                        <motion.span
                            key={line}
                            className="block"
                            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.08 * index, ease }}
                        >
                            {line}
                        </motion.span>
                    ))}
                </h2>
                <p className="panel-body mt-6 max-w-xl text-sm">
                    How Averion.ai went from retrieval logic to a grounded product interface.
                </p>
            </div>

            {reduceMotion ? (
                <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-32 sm:px-8 md:grid-cols-2 md:px-12 lg:px-16">
                    <pre className="panel-surface panel-body overflow-x-auto rounded-2xl p-6 font-mono text-xs">
                        {TYPED_CODE_SNIPPET}
                    </pre>
                    <div className="panel-surface space-y-4 rounded-2xl p-6 text-sm">
                        <p className="panel-body">{product.description}</p>
                        <Link href={`/projects/${product.slug}`} className="panel-title inline-block">
                            Averion.ai case study ↗
                        </Link>
                    </div>
                </div>
            ) : (
                <div ref={targetRef} className="relative h-[220svh] md:h-[300svh]">
                    <div className="sticky top-20 flex h-[calc(100svh-5rem)] items-center px-5 sm:px-8 md:px-12 lg:px-16">
                        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[11rem_1fr] lg:gap-10">
                            <ol className="hidden flex-col justify-center gap-4 lg:flex">
                                {stages.map((stage, index) => (
                                    <li
                                        key={stage.id}
                                        className={cn(
                                            "font-mono text-[11px] tracking-[0.16em] transition-colors duration-300",
                                            index === active ? "panel-title" : "panel-muted"
                                        )}
                                    >
                                        {stage.id} {stage.label}
                                    </li>
                                ))}
                                <li className="mt-4 flex gap-1.5" aria-hidden>
                                    {stages.map((_, index) => (
                                        <span
                                            key={index}
                                            className={cn(
                                                "h-1 flex-1 rounded-full transition-colors duration-300",
                                                index === active ? "bg-white/80" : "bg-white/15"
                                            )}
                                        />
                                    ))}
                                </li>
                                <li className="panel-muted mt-6 font-mono text-[10px] uppercase tracking-[0.14em]">
                                    {active === 0 ? "Scroll to type code" : "Scroll to advance"}
                                </li>
                            </ol>

                            <div className="panel-surface relative flex min-h-[24rem] w-full flex-col rounded-2xl sm:min-h-[28rem]">
                                <p className="panel-kicker px-6 pt-6 sm:px-8 sm:pt-8 lg:hidden">
                                    {stages[active].id} {stages[active].label}
                                </p>

                                <div className="flex flex-1 items-center overflow-hidden p-6 sm:p-8 lg:p-10">
                                    {active === 0 ? (
                                        <div className="w-full overflow-y-auto max-h-[min(52vh,28rem)]">
                                            <StageCode progress={scrollYProgress} />
                                        </div>
                                    ) : (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={active}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.35, ease }}
                                                className="w-full"
                                            >
                                                {renderStage(active, scrollYProgress)}
                                            </motion.div>
                                        </AnimatePresence>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
