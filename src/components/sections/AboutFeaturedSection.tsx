"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const featuredSlides = [
    {
        src: "/projects/env-hacks-ticket.png",
        alt: "Environmental Hacks hackathon registration ticket",
        caption: "Registered for Environmental Hacks · Bharat Builds Tour",
    },
    {
        src: "/projects/env-hacks-judges-marks.jpeg",
        alt: "Judges marks and remarks for RE:GENESIS — 26 out of 30",
        caption: "Judges' marks — 26 / 30 · RE:GENESIS",
    },
] as const;

export function AboutFeaturedSection({ staggerVariants }: { staggerVariants: Variants }) {
    const [index, setIndex] = useState(0);
    const total = featuredSlides.length;
    const slide = featuredSlides[index];

    const goPrev = useCallback(() => {
        setIndex((i) => (i - 1 + total) % total);
    }, [total]);

    const goNext = useCallback(() => {
        setIndex((i) => (i + 1) % total);
    }, [total]);

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-8 md:gap-12 mb-28"
        >
            <motion.div variants={fadeIn} className="flex items-center md:items-start gap-3">
                <Sparkles className="mt-1 h-6 w-6 shrink-0 text-white/50" />
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/40">
                        Latest hackathon highlight —{" "}
                        <Link
                            href="https://www.wemakedevs.org/aws/env"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/55 underline-offset-2 hover:text-white hover:underline"
                        >
                            Environmental Hacks
                        </Link>
                    </p>
                </div>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-6">
                <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="relative aspect-[16/10] w-full bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={slide.src}
                            src={slide.src}
                            alt={slide.alt}
                            className="h-full w-full object-contain object-center p-2 sm:p-3"
                        />
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous featured image"
                            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next featured image"
                            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-3">
                        <p className="text-xs text-white/50">{slide.caption}</p>
                        <div className="flex items-center gap-1.5">
                            {featuredSlides.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Show slide ${i + 1}`}
                                    onClick={() => setIndex(i)}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all",
                                        i === index ? "w-5 bg-white/80" : "w-1.5 bg-white/25 hover:bg-white/40"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </article>

                <div className="space-y-5 rounded-2xl border border-white/[0.06] bg-transparent p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="text-xl font-semibold tracking-tight">RE:GENESIS · E-waste recovery</h3>
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-300/90">
                            26 / 30 judges&apos; score
                        </span>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-white/65">
                        <p>
                            <span className="font-medium text-white/80">The problem I saw: </span>
                            Enterprise hardware still holds recoverable GPUs, RAM, and SSDs, yet most e-waste
                            paths shred first and sort metal later—destroying reuse value and leaving secondary
                            buyers with no trustworthy proof of what was actually recovered.
                        </p>
                        <p>
                            <span className="font-medium text-white/80">How I approached it: </span>
                            I built RE:GENESIS as an AWS-native recovery pipeline—upload an interior photo,
                            run hybrid SageMaker YOLO detection with catalog-assisted fallback, audit BOM
                            completeness, rank disassembly with a Reuse Value Score, and issue KMS-signed
                            Second-Life Passports operators can verify on stage.
                        </p>
                        <p>
                            <span className="font-medium text-white/80">What was hard: </span>
                            Keeping the demo alive when the vision endpoint was cold or low-confidence, wiring
                            Step Functions so every stage stayed visible and retryable, and shipping a UI that
                            talked to API Gateway without hiding failures behind mocks. Judges pushed on HTTPS
                            for production—a fair tradeoff I documented while focusing the hackathon on depth of
                            execution and tamper-evident passports.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-1 text-sm">
                        <Link
                            href="/projects/regenesis"
                            className="text-white transition-opacity hover:opacity-75"
                        >
                            Case study ↗
                        </Link>
                        <a
                            href="http://regenesis-dev-uibucket-13iieilvqhoa.s3-website.ap-south-1.amazonaws.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/55 transition-colors hover:text-white"
                        >
                            Live demo ↗
                        </a>
                        <a
                            href="https://github.com/mitra9917/ReGenesis"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/55 transition-colors hover:text-white"
                        >
                            GitHub ↗
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}
