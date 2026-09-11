"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { getProjectAccent } from "@/lib/projectAccents";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type ProjectPreviewPanelProps = {
    project: Project;
    index: number;
    total: number;
    tiltX?: number;
    tiltY?: number;
    className?: string;
};

export function ProjectPreviewPanel({
    project,
    index,
    total,
    tiltX = 0,
    tiltY = 0,
    className,
}: ProjectPreviewPanelProps) {
    const accent = getProjectAccent(index);
    const hasLive = Boolean(project.liveUrl);

    return (
        <motion.article
            key={project.slug}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease }}
            style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformPerspective: 1200,
            }}
            className={cn(
                "relative h-full min-h-[22rem] overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]",
                className
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(ellipse 90% 70% at 20% 0%, ${accent.glow}, transparent 55%),
                        linear-gradient(145deg, ${accent.from}22 0%, transparent 42%),
                        linear-gradient(320deg, ${accent.to}18 0%, transparent 50%)`,
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "linear-gradient(to bottom, black, transparent 85%)",
                }}
            />

            <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-4 select-none font-mono text-[clamp(5rem,14vw,9rem)] leading-none text-white/[0.06]"
            >
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </p>
                    <span
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55"
                    >
                        {project.techStack[0]}
                    </span>
                </div>

                <div className="mt-auto space-y-5">
                    <div>
                        <h3 className="type-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.02] tracking-tight text-white">
                            {project.title}
                        </h3>
                        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:text-[0.95rem]">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 font-mono text-[10px] text-white/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 border-t border-white/[0.08] pt-5 text-sm">
                        <Link
                            href={`/projects/${project.slug}`}
                            data-cursor="view"
                            className="text-white transition-opacity hover:opacity-75"
                        >
                            Case study ↗
                        </Link>
                        {hasLive ? (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="open"
                                className="text-white/55 transition-colors hover:text-white"
                            >
                                Live demo ↗
                            </a>
                        ) : null}
                        <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="open"
                            className="text-white/55 transition-colors hover:text-white"
                        >
                            GitHub ↗
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
