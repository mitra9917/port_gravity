"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Lab palette — warm stone + soft ivory on white */
const LAB_STONE = "#E3E0DA";
const LAB_IVORY = "#F2F0EB";
const LAB_WHITE = "#FFFFFF";

const experiments = [
    {
        id: "01",
        title: "Keyboard sequence",
        meta: "Canvas · 192 frames",
        href: "/projects/port_gravity",
        note: "Scroll-mapped sprite sheets drawn to canvas instead of DOM images.",
    },
    {
        id: "02",
        title: "WebGL globe",
        meta: "Three.js · R3F",
        href: "/",
        note: "Wireframe systems globe with scroll-scrubbed camera and nodes.",
    },
    {
        id: "03",
        title: "Image shader",
        meta: "Vertex + RGB split",
        href: "/about",
        note: "Scroll-velocity distortion on the about portrait.",
    },
    {
        id: "04",
        title: "AI interface",
        meta: "RAG · citations",
        href: "/projects/averion_ai",
        note: "Averion.ai — grounded answers over internal documents.",
    },
    {
        id: "05",
        title: "Network visualizer",
        meta: "Temporal graph",
        href: "/research",
        note: "Hosts and protocol edges unfolding from the Wireshark analysis.",
    },
    {
        id: "06",
        title: "Vision game loop",
        meta: "OpenCV · MediaPipe",
        href: "/projects/vision_badminton_engine",
        note: "Gesture-controlled badminton engine — 2.5D court, no full 3D stack.",
    },
];

export function ExperimentLab() {
    const pathname = usePathname();
    const reduceMotion = usePrefersReducedMotion();
    const onLabPage = pathname === "/lab";

    return (
        <section
            className="relative w-full px-5 py-32 sm:px-8 md:px-12 md:py-40 lg:px-16"
            style={{ backgroundColor: LAB_WHITE }}
        >
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-[11px] tracking-[0.18em] text-zinc-500">07 / LAB</p>
                <h2 className="type-display mt-6 text-display-sm text-zinc-950">
                    {["Experiment.", "Learn.", "Repeat."].map((line, index) => (
                        <motion.span
                            key={line}
                            className="block"
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.08 * index, ease }}
                        >
                            {line}
                        </motion.span>
                    ))}
                </h2>

                <div className="mt-16 grid grid-cols-1 gap-3 overflow-visible sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {experiments.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            data-cursor={item.href.startsWith("http") ? "open" : "view"}
                            className="group relative isolate z-0 overflow-hidden rounded-2xl border p-8 transition-all duration-500 ease-premium motion-safe:hover:z-20 motion-safe:hover:scale-[1.045] motion-safe:hover:border-[#d8d4cd] motion-safe:hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.14)]"
                            style={{ backgroundColor: LAB_WHITE, borderColor: LAB_STONE }}
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 group-hover:opacity-100"
                                style={{
                                    background: index % 2 === 0
                                        ? `linear-gradient(135deg, ${LAB_IVORY} 0%, ${LAB_WHITE} 48%, ${LAB_STONE} 100%)`
                                        : `linear-gradient(135deg, ${LAB_WHITE} 0%, ${LAB_IVORY} 42%, ${LAB_STONE} 100%)`,
                                    opacity: 0.92,
                                }}
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 transition-opacity duration-700"
                                style={{
                                    background: `linear-gradient(to bottom, ${LAB_IVORY}, transparent)`,
                                    opacity: 0.85,
                                }}
                            />
                            <div className="relative z-10">
                                <p className="font-mono text-[10px] tracking-[0.18em] text-zinc-400 transition-colors duration-700 group-hover:text-zinc-500">
                                    {item.id}
                                </p>
                                <h3 className="mt-6 text-xl font-medium tracking-tight text-zinc-900 transition-colors duration-700 group-hover:text-zinc-950">
                                    {item.title}
                                </h3>
                                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                    {item.meta}
                                </p>
                                <p className="mt-6 text-sm leading-relaxed text-zinc-600 transition-colors duration-700 group-hover:text-zinc-700">
                                    {item.note}
                                </p>
                                <span className="mt-8 inline-block text-sm text-zinc-400 transition-colors duration-700 group-hover:text-zinc-900">
                                    ↗
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {!onLabPage && (
                    <div className="mt-14 pt-8" style={{ borderTop: `1px solid ${LAB_STONE}` }}>
                        <Link
                            href="/lab"
                            className="text-sm text-zinc-500 transition-colors duration-500 hover:text-zinc-900"
                        >
                            Full lab index ↗
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
