"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const LAB_STONE = "#E3E0DA";
const LAB_IVORY = "#F2F0EB";
const LAB_WHITE = "#FFFFFF";
const LAB_STONE_DARK = "#C9C5BE";
const LAB_INK = "#3F3F46";
const LAB_INK_MUTED = "#71717A";

type ClusterId = "systems" | "frontend" | "backend" | "ai" | "cloud" | "research";

const clusters: {
    id: ClusterId;
    label: string;
    summary: string;
    items: string[];
    orbit?: { x: number; y: number };
}[] = [
    {
        id: "systems",
        label: "SYSTEMS",
        summary: "How pieces connect — version control, APIs, auth, and automation glue.",
        items: ["Git / GitHub", "Typed APIs", "Auth & RLS", "n8n", "ngrok"],
    },
    {
        id: "frontend",
        label: "FRONTEND",
        summary: "Interfaces people touch — motion, layout, and component systems.",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
        orbit: { x: 50, y: 14 },
    },
    {
        id: "backend",
        label: "BACKEND",
        summary: "Data, logic, and the services that power the product underneath.",
        items: ["Node.js", "PostgreSQL", "Supabase", "RESTful APIs", "FastAPI"],
        orbit: { x: 86, y: 38 },
    },
    {
        id: "ai",
        label: "AI / ML",
        summary: "Retrieval, agents, and model workflows wired into real applications.",
        items: ["Python", "RAG", "Agents", "Hugging Face", "Vector Search", "Machine Learning"],
        orbit: { x: 74, y: 82 },
    },
    {
        id: "cloud",
        label: "CLOUD",
        summary: "Shipping and running code — containers, deploys, and hosting.",
        items: ["Vercel", "Docker", "Render", "Railways"],
        orbit: { x: 26, y: 82 },
    },
    {
        id: "research",
        label: "RESEARCH",
        summary: "Structured inquiry — reading, experimenting, analyzing, documenting.",
        items: ["Literature study", "Experimentation", "Analysis", "Documentation", "Wireshark", "Network forensics"],
        orbit: { x: 14, y: 38 },
    },
];

function SoftPanel({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={cn("surface-soft relative isolate", className)}
            style={{
                background: `linear-gradient(145deg, ${LAB_IVORY} 0%, ${LAB_WHITE} 45%, ${LAB_STONE} 100%)`,
                border: `1px solid ${LAB_STONE}`,
            }}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-24"
                style={{ background: `linear-gradient(to bottom, ${LAB_IVORY}, transparent)` }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export function SkillsConstellation() {
    const reduceMotion = usePrefersReducedMotion();
    const [active, setActive] = useState<ClusterId>("systems");
    const current = clusters.find((cluster) => cluster.id === active)!;

    return (
        <section
            className="relative w-full px-5 py-32 sm:px-8 md:px-12 md:py-40 lg:px-16"
            style={{ backgroundColor: LAB_WHITE }}
        >
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-[11px] tracking-[0.18em] text-zinc-500">05 / SKILLS</p>
                <h2 className="type-display mt-6 text-display-sm text-zinc-950">
                    {["An ecosystem,", "not a list."].map((line, index) => (
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
                <p className="mt-6 max-w-xl text-sm text-zinc-600">
                    Hover or tap a node in the constellation to explore each layer of the stack.
                </p>

                <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
                    <SoftPanel className="flex min-h-[22rem] items-center justify-center p-6 sm:p-8">
                        <svg
                            viewBox="0 0 100 100"
                            className="h-auto w-full max-w-md overflow-visible lg:max-w-lg"
                            role="img"
                            aria-label="Skills constellation with systems at the center"
                        >
                            {clusters
                                .filter((cluster) => cluster.orbit)
                                .map((cluster) => (
                                    <line
                                        key={`line-${cluster.id}`}
                                        x1="50"
                                        y1="50"
                                        x2={cluster.orbit!.x}
                                        y2={cluster.orbit!.y}
                                        stroke={active === cluster.id ? LAB_STONE_DARK : LAB_STONE}
                                        strokeWidth={active === cluster.id ? "0.36" : "0.26"}
                                        strokeLinecap="round"
                                    />
                                ))}

                            <circle
                                cx="50"
                                cy="50"
                                r="22"
                                fill="none"
                                stroke={LAB_STONE}
                                strokeWidth="0.22"
                                strokeDasharray="0.6 0.5"
                            />

                            {!reduceMotion && (
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="18"
                                    fill="none"
                                    stroke={LAB_STONE_DARK}
                                    strokeWidth="0.16"
                                    opacity="0.45"
                                >
                                    <animate attributeName="r" values="16;19;16" dur="4s" repeatCount="indefinite" />
                                </circle>
                            )}

                            <g
                                tabIndex={0}
                                className="cursor-pointer"
                                onClick={() => setActive("systems")}
                                onMouseEnter={() => setActive("systems")}
                                onFocus={() => setActive("systems")}
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="9"
                                    fill={active === "systems" ? LAB_STONE : LAB_WHITE}
                                    stroke={active === "systems" ? LAB_INK : LAB_STONE_DARK}
                                    strokeWidth="0.35"
                                />
                                <text
                                    x="50"
                                    y="51"
                                    textAnchor="middle"
                                    fill={LAB_INK}
                                    fontSize="2.4"
                                    fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                    letterSpacing="0.14em"
                                >
                                    SYSTEMS
                                </text>
                            </g>

                            {clusters
                                .filter((cluster) => cluster.orbit)
                                .map((cluster) => (
                                    <g
                                        key={cluster.id}
                                        tabIndex={0}
                                        className="cursor-pointer"
                                        onClick={() => setActive(cluster.id)}
                                        onMouseEnter={() => setActive(cluster.id)}
                                        onFocus={() => setActive(cluster.id)}
                                    >
                                        {active === cluster.id && !reduceMotion && (
                                            <circle
                                                cx={cluster.orbit!.x}
                                                cy={cluster.orbit!.y}
                                                r="10"
                                                fill="none"
                                                stroke={LAB_STONE_DARK}
                                                strokeWidth="0.2"
                                                opacity="0.6"
                                            >
                                                <animate
                                                    attributeName="stroke-opacity"
                                                    values="0.2;0.55;0.2"
                                                    dur="2.2s"
                                                    repeatCount="indefinite"
                                                />
                                            </circle>
                                        )}
                                        <circle
                                            cx={cluster.orbit!.x}
                                            cy={cluster.orbit!.y}
                                            r="7.2"
                                            fill={active === cluster.id ? LAB_STONE : LAB_IVORY}
                                            stroke={active === cluster.id ? LAB_INK : LAB_STONE_DARK}
                                            strokeWidth="0.32"
                                        />
                                        <text
                                            x={cluster.orbit!.x}
                                            y={cluster.orbit!.y + 0.7}
                                            textAnchor="middle"
                                            fill={active === cluster.id ? LAB_INK : LAB_INK_MUTED}
                                            fontSize="2"
                                            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                            letterSpacing="0.12em"
                                        >
                                            {cluster.label}
                                        </text>
                                    </g>
                                ))}
                        </svg>
                    </SoftPanel>

                    <SoftPanel className="flex min-h-[22rem] flex-col lg:min-h-0 lg:justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                                transition={{ duration: 0.35, ease }}
                                className="flex flex-1 flex-col p-6 sm:p-8"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="font-mono text-lg tracking-[0.12em] text-zinc-900 sm:text-xl">
                                        {current.label}
                                    </h3>
                                    <span
                                        className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] text-zinc-700"
                                        style={{
                                            backgroundColor: LAB_WHITE,
                                            border: `1px solid ${LAB_STONE_DARK}`,
                                        }}
                                    >
                                        {current.items.length} tools
                                    </span>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[0.95rem]">
                                    {current.summary}
                                </p>

                                <ul className="mt-8 space-y-2.5">
                                    {current.items.map((item, index) => (
                                        <motion.li
                                            key={item}
                                            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.25, delay: 0.03 * index, ease }}
                                            className="flex items-center gap-3 text-sm text-zinc-800"
                                        >
                                            <span
                                                className="h-1 w-1 shrink-0 rounded-full"
                                                style={{ backgroundColor: LAB_STONE_DARK }}
                                                aria-hidden
                                            />
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>

                        <div className="px-6 py-4 sm:px-8" style={{ borderTop: `1px solid ${LAB_STONE}` }}>
                            <div className="flex flex-wrap gap-2">
                                {clusters.map((cluster) => (
                                    <button
                                        key={cluster.id}
                                        type="button"
                                        onClick={() => setActive(cluster.id)}
                                        className={cn(
                                            "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-500",
                                            active === cluster.id
                                                ? "bg-zinc-900 text-white"
                                                : "text-zinc-600 hover:text-zinc-900"
                                        )}
                                        style={
                                            active === cluster.id
                                                ? undefined
                                                : {
                                                      backgroundColor: LAB_WHITE,
                                                      border: `1px solid ${LAB_STONE_DARK}`,
                                                  }
                                        }
                                    >
                                        {cluster.label}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                                Select a cluster above or click the graph
                            </p>
                        </div>
                    </SoftPanel>
                </div>
            </div>
        </section>
    );
}
