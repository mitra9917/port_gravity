"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectPreviewPanel } from "@/components/projects/ProjectPreviewPanel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type ProjectSpotlightProps = {
    projects: Project[];
    kicker?: string;
    title: string;
    subtitle?: string;
    archiveHref?: string;
    archiveLabel?: string;
    className?: string;
};

function MobileProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
    return (
        <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/55">{project.description}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
                {project.techStack.slice(0, 4).join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm">
                <Link href={`/projects/${project.slug}`}>Case study ↗</Link>
                {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live ↗</a>
                ) : null}
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
        </article>
    );
}

export function ProjectSpotlight({
    projects: projectList,
    kicker = "02 / PROJECTS",
    title,
    subtitle,
    archiveHref,
    archiveLabel = "View full archive ↗",
    className,
}: ProjectSpotlightProps) {
    const reduceMotion = usePrefersReducedMotion();
    const isMobile = useMediaQuery("(max-width: 1023px)");
    const previewRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const total = projectList.length;
    const current = projectList[active] ?? projectList[0];

    const handlePointerMove = useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (reduceMotion || isMobile || !previewRef.current) return;
            const rect = previewRef.current.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            setTilt({ x: -y * 4, y: x * 5 });
        },
        [isMobile, reduceMotion]
    );

    const resetTilt = useCallback(() => setTilt({ x: 0, y: 0 }), []);

    if (!current) return null;

    if (reduceMotion || isMobile) {
        return (
            <section className={cn("relative w-full px-5 py-24 sm:px-8 md:px-12 lg:px-16", className)}>
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted">{kicker}</p>
                <h2 className="type-display mt-6 text-display-sm text-foreground">{title}</h2>
                {subtitle ? <p className="mt-4 max-w-xl text-sm text-foreground/45">{subtitle}</p> : null}
                <div className="mt-12 space-y-5">
                    {projectList.map((project, index) => (
                        <MobileProjectCard key={project.slug} project={project} index={index} total={total} />
                    ))}
                </div>
                {archiveHref ? (
                    <Link href={archiveHref} className="mt-10 inline-block text-sm text-foreground/70 transition-opacity hover:opacity-80">
                        {archiveLabel}
                    </Link>
                ) : null}
            </section>
        );
    }

    return (
        <section className={cn("relative w-full px-5 py-28 sm:px-8 md:px-12 md:py-32 lg:px-16", className)}>
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-muted">{kicker}</p>
                    <h2 className="type-display mt-6 text-display-sm text-foreground">{title}</h2>
                    {subtitle ? (
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/45">{subtitle}</p>
                    ) : null}
                </div>

                <div className="mt-14 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
                    <div className="flex flex-col" role="tablist" aria-label="Projects">
                        {projectList.map((project, index) => {
                            const isActive = index === active;
                            return (
                                <button
                                    key={project.slug}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onMouseEnter={() => setActive(index)}
                                    onFocus={() => setActive(index)}
                                    onClick={() => setActive(index)}
                                    className={cn(
                                        "group border-t border-white/[0.08] py-6 text-left transition-colors duration-500",
                                        isActive
                                            ? "border-l-2 border-l-white/70 pl-4 text-foreground"
                                            : "border-l-2 border-l-transparent pl-4 text-foreground/40 hover:text-foreground/70"
                                    )}
                                >
                                    <div className="flex items-start gap-5">
                                        <span className="mt-1 font-mono text-[11px] tracking-[0.16em] text-muted">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <motion.h3
                                                animate={{
                                                    fontSize: isActive ? "clamp(1.5rem, 2.4vw, 2.25rem)" : "1.125rem",
                                                    letterSpacing: isActive ? "-0.03em" : "-0.015em",
                                                }}
                                                transition={{ duration: 0.4, ease }}
                                                className="font-semibold leading-tight tracking-tight"
                                            >
                                                {project.title}
                                            </motion.h3>
                                            <AnimatePresence mode="wait">
                                                {isActive ? (
                                                    <motion.p
                                                        key={`${project.slug}-meta`}
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3, ease }}
                                                        className="mt-3 overflow-hidden text-sm leading-relaxed text-foreground/50"
                                                    >
                                                        {project.overview.solution.split(".")[0]}.
                                                    </motion.p>
                                                ) : null}
                                            </AnimatePresence>
                                            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/30">
                                                {project.techStack.slice(0, 3).join(" · ")}
                                            </p>
                                        </div>
                                        <span
                                            className={cn(
                                                "mt-2 text-sm transition-all duration-500",
                                                isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                                            )}
                                            aria-hidden
                                        >
                                            ↗
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        ref={previewRef}
                        onPointerMove={handlePointerMove}
                        onPointerLeave={resetTilt}
                        className="sticky top-24 h-[min(72vh,38rem)]"
                    >
                        <AnimatePresence mode="wait">
                            <ProjectPreviewPanel
                                key={current.slug}
                                project={current}
                                index={active}
                                total={total}
                                tiltX={tilt.x}
                                tiltY={tilt.y}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {archiveHref ? (
                    <div className="mt-12 flex items-center justify-between gap-6 border-t border-white/[0.08] pt-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                            Hover a project to preview · {total} case studies
                        </p>
                        <Link
                            href={archiveHref}
                            className="shrink-0 text-sm text-foreground/70 transition-opacity hover:opacity-80"
                        >
                            {archiveLabel}
                        </Link>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
