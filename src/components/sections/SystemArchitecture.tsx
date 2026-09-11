"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

type NodeId = "user" | "next" | "api" | "cache" | "database" | "external" | "cloud";

const nodes: {
    id: NodeId;
    label: string;
    x: number;
    y: number;
    title: string;
    body: string;
    trace: string[];
}[] = [
    {
        id: "user",
        label: "USER",
        x: 50,
        y: 8,
        title: "Interface",
        body: "The user-facing layer: App Router views, interaction, and the questions people actually ask.",
        trace: ["→ render page", "→ capture intent", "→ send request"],
    },
    {
        id: "next",
        label: "NEXT.JS",
        x: 50,
        y: 26,
        title: "Application",
        body: "Next.js App Router with React Server Components where possible, and client islands only where interaction requires them.",
        trace: ["→ route match", "→ RSC fetch", "→ hydrate UI"],
    },
    {
        id: "api",
        label: "API",
        x: 50,
        y: 44,
        title: "Boundary",
        body: "Typed API routes and REST endpoints that keep UI, business logic, and data access cleanly separated.",
        trace: ["→ validate input", "→ auth check", "→ dispatch handler"],
    },
    {
        id: "cache",
        label: "VECTOR STORE",
        x: 18,
        y: 64,
        title: "Retrieval",
        body: "Embeddings stored with pgvector so queries can retrieve similar chunks instead of scanning every document.",
        trace: ["→ embed query", "→ cosine search", "→ top-k chunks"],
    },
    {
        id: "database",
        label: "DATABASE",
        x: 50,
        y: 64,
        title: "Postgres",
        body: "Supabase PostgreSQL with structured records, auth, and relational integrity for product data.",
        trace: ["→ SQL query", "→ row lock", "→ return rows"],
    },
    {
        id: "external",
        label: "EXTERNAL",
        x: 82,
        y: 64,
        title: "Model APIs",
        body: "Groq / OpenAI-compatible generation after retrieval, with filtering so answers stay grounded in context.",
        trace: ["→ build prompt", "→ stream tokens", "→ filter output"],
    },
    {
        id: "cloud",
        label: "CLOUD",
        x: 50,
        y: 86,
        title: "Vercel",
        body: "Deployment and delivery on Vercel, with the frontend close to the edge and APIs in the same system.",
        trace: ["→ edge deploy", "→ CDN cache", "→ global delivery"],
    },
];

const edges: [NodeId, NodeId][] = [
    ["user", "next"],
    ["next", "api"],
    ["api", "cache"],
    ["api", "database"],
    ["api", "external"],
    ["cache", "cloud"],
    ["database", "cloud"],
    ["external", "cloud"],
];

const overview = {
    label: "OVERVIEW",
    title: "End-to-end flow",
    body: "A typical request moves from the interface through Next.js, hits typed APIs, fans out to retrieval and data stores, then returns through the cloud edge.",
    trace: ["user → next → api → data → cloud"],
};

function nodeById(id: NodeId) {
    return nodes.find((node) => node.id === id)!;
}

export function SystemArchitecture() {
    const reduceMotion = usePrefersReducedMotion();
    const [active, setActive] = useState<NodeId | null>(null);

    const connected = useMemo(() => {
        if (!active) return new Set<NodeId>(nodes.map((node) => node.id));
        const set = new Set<NodeId>([active]);
        edges.forEach(([from, to]) => {
            if (from === active || to === active) {
                set.add(from);
                set.add(to);
            }
        });
        return set;
    }, [active]);

    const detail = active ? nodes.find((node) => node.id === active) : null;
    const panel = detail ?? overview;

    return (
        <section className="relative w-full bg-background px-5 pt-32 pb-16 sm:px-8 md:px-12 md:pt-40 md:pb-20 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted">04 / SYSTEMS</p>
                <h2 className="type-display mt-6 text-display-sm text-foreground">
                    {["How I", "think."].map((line, index) => (
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
                <p className="mt-6 max-w-md text-sm text-foreground/45">
                    Designing systems that scale — from the interface down to retrieval, data, and deployment.
                </p>

                <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                    <svg
                        viewBox="0 0 100 100"
                        className="h-auto w-full max-h-[36rem] overflow-visible"
                        role="img"
                        aria-label="System architecture from user through Next.js and APIs to data, models, and cloud"
                    >
                        <defs>
                            <style>
                                {`
                                    @keyframes arch-flow {
                                        to { stroke-dashoffset: -4; }
                                    }
                                    .arch-edge-active {
                                        stroke-dasharray: 0.8 0.6;
                                        animation: arch-flow 1.4s linear infinite;
                                    }
                                `}
                            </style>
                        </defs>

                        {edges.map(([from, to]) => {
                            const a = nodeById(from);
                            const b = nodeById(to);
                            const lit = connected.has(from) && connected.has(to);
                            return (
                                <line
                                    key={`${from}-${to}`}
                                    x1={a.x}
                                    y1={a.y}
                                    x2={b.x}
                                    y2={b.y}
                                    stroke={lit ? "rgba(244,244,245,0.35)" : "rgba(244,244,245,0.08)"}
                                    strokeWidth="0.2"
                                    className={lit && !reduceMotion ? "arch-edge-active" : undefined}
                                />
                            );
                        })}

                        {nodes.map((node) => {
                            const lit = connected.has(node.id);
                            const isActive = active === node.id;
                            return (
                                <g
                                    key={node.id}
                                    className="cursor-pointer"
                                    onMouseEnter={() => setActive(node.id)}
                                    onMouseLeave={() => setActive(null)}
                                    onFocus={() => setActive(node.id)}
                                    onBlur={() => setActive(null)}
                                    tabIndex={0}
                                >
                                    {isActive && !reduceMotion && (
                                        <rect
                                            x={node.x - 12.5}
                                            y={node.y - 5.5}
                                            width="25"
                                            height="10.5"
                                            rx="0.6"
                                            fill="none"
                                            stroke="rgba(244,244,245,0.2)"
                                            strokeWidth="0.15"
                                        >
                                            <animate
                                                attributeName="stroke-opacity"
                                                values="0.15;0.45;0.15"
                                                dur="2s"
                                                repeatCount="indefinite"
                                            />
                                        </rect>
                                    )}
                                    <rect
                                        x={node.x - 11}
                                        y={node.y - 4.2}
                                        width="22"
                                        height="8.4"
                                        rx="0.4"
                                        fill="#050506"
                                        stroke={lit ? "rgba(244,244,245,0.35)" : "rgba(244,244,245,0.1)"}
                                        strokeWidth="0.25"
                                    />
                                    <text
                                        x={node.x}
                                        y={node.y + 0.8}
                                        textAnchor="middle"
                                        fill={lit ? "#f4f4f5" : "#737373"}
                                        fontSize="2.2"
                                        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                        letterSpacing="0.12em"
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    <div className="panel-surface rounded-2xl p-6 sm:p-7 lg:min-h-[18rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={panel.label}
                                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                                transition={{ duration: 0.35, ease }}
                            >
                                <p className="panel-kicker">{panel.label}</p>
                                <h3 className="panel-title mt-3 text-xl">{panel.title}</h3>
                                <p className="panel-body mt-3 text-sm leading-relaxed">{panel.body}</p>

                                <div className="mt-6 rounded-2xl border border-white/20 bg-black/70 p-4 font-mono text-[11px] leading-relaxed">
                                    {(detail?.trace ?? overview.trace).map((line, index) => (
                                        <motion.p
                                            key={line}
                                            className="panel-body"
                                            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.08 * index, ease }}
                                        >
                                            <span className="panel-muted">{String(index + 1).padStart(2, "0")}</span>
                                            {"  "}
                                            {line}
                                        </motion.p>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <p className="panel-muted mt-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                            Hover a node to trace its path
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
