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
    const previewSrc = project.previewImage;
    const previewFit = project.previewImageFit ?? "cover";
    const previewPosition = project.previewImagePosition ?? "center";

    const indexLabel = (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
    );

    const techPill = (
        <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
            {project.techStack[0]}
        </span>
    );

    const contentBlock = (
        <div className={cn("space-y-5", previewSrc && "space-y-3.5")}>
            <div>
                <h3
                    className={cn(
                        "type-display leading-[1.02] tracking-tight text-white",
                        previewSrc
                            ? "text-[clamp(1.35rem,3vw,2rem)]"
                            : "text-[clamp(1.75rem,4vw,3rem)]"
                    )}
                >
                    {project.title}
                </h3>
                <p
                    className={cn(
                        "mt-3 max-w-lg leading-relaxed text-white/65",
                        previewSrc
                            ? "line-clamp-2 text-xs sm:text-sm"
                            : "text-sm sm:text-[0.95rem]"
                    )}
                >
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

            <div
                className={cn(
                    "flex flex-wrap items-center gap-6 border-t border-white/[0.08] text-sm",
                    previewSrc ? "gap-4 pt-3.5" : "pt-5"
                )}
            >
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
    );

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
                "relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-950 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]",
                className
            )}
        >
            {previewSrc ? (
                <>
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={previewSrc}
                            alt={`${project.title} product preview`}
                            className={cn(
                                "absolute inset-0 h-full w-full",
                                previewFit === "contain" ? "object-contain" : "object-cover"
                            )}
                            style={{ objectPosition: previewPosition }}
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/55 to-transparent"
                        />
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-5">
                            {indexLabel}
                            {techPill}
                        </div>
                    </div>
                    <div className="relative min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
                        {contentBlock}
                    </div>
                </>
            ) : (
                <>
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
                            {indexLabel}
                            {techPill}
                        </div>
                        <div className="mt-auto">{contentBlock}</div>
                    </div>
                </>
            )}
        </motion.article>
    );
}
