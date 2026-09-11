"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;

const stages = [
    { id: "t1", at: 0.08, label: "Hosts", copy: "Quiet endpoints in a captured PCAP — the graph is still sparse." },
    { id: "t2", at: 0.32, label: "Traffic", copy: "DNS, HTTP, and TCP edges appear as packets are correlated across time." },
    { id: "t3", at: 0.58, label: "Signal", copy: "One host draws attention: TLS, SMB, and reputation-based evidence start to cluster." },
    { id: "t4", at: 0.82, label: "Confirm", copy: "A structured reading of the traffic supports likely malware behavior — the finding from the Wireshark report." },
];

const nodes = [
    { id: "h1", x: 22, y: 42, r: 1.1, appear: 0.06, hot: false, label: "Host A" },
    { id: "h2", x: 48, y: 28, r: 1.1, appear: 0.1, hot: false, label: "Host B" },
    { id: "h3", x: 70, y: 46, r: 1.35, appear: 0.14, hot: true, label: "Host C" },
    { id: "dns", x: 38, y: 68, r: 1, appear: 0.28, hot: false, label: "DNS" },
    { id: "web", x: 62, y: 72, r: 1, appear: 0.36, hot: false, label: "HTTP" },
    { id: "ext", x: 86, y: 30, r: 1.05, appear: 0.52, hot: false, label: "External" },
];

const links = [
    { from: "h1", to: "h2", appear: 0.22, fade: 0.9 },
    { from: "h2", to: "dns", appear: 0.3, fade: 1 },
    { from: "h1", to: "dns", appear: 0.34, fade: 1 },
    { from: "h3", to: "web", appear: 0.4, fade: 1 },
    { from: "h2", to: "web", appear: 0.44, fade: 0.78 },
    { from: "h3", to: "ext", appear: 0.56, fade: 1 },
    { from: "h3", to: "dns", appear: 0.6, fade: 1 },
    { from: "web", to: "ext", appear: 0.66, fade: 1 },
];

function nodePos(id: string) {
    return nodes.find((node) => node.id === id)!;
}

function GraphMark({
    progress,
    appear,
    children,
}: {
    progress: MotionValue<number>;
    appear: number;
    children: ReactNode;
}) {
    const start = appear;
    const end = Math.min(1, appear + 0.12);
    const opacity = useTransform(progress, [start, end], [0, 1]);
    return <motion.g style={{ opacity }}>{children}</motion.g>;
}

function GraphLink({
    progress,
    appear,
    fade,
    from,
    to,
}: {
    progress: MotionValue<number>;
    appear: number;
    fade: number;
    from: string;
    to: string;
}) {
    const a = nodePos(from);
    const b = nodePos(to);
    const inStart = appear;
    const inEnd = Math.min(fade - 0.02, appear + 0.1);
    const safeInEnd = inEnd > inStart ? inEnd : appear + 0.08;
    const opacity = useTransform(
        progress,
        fade < 1 ? [inStart, safeInEnd, fade, Math.min(1, fade + 0.08)] : [inStart, safeInEnd],
        fade < 1 ? [0, 0.45, 0.45, 0.08] : [0, 0.4]
    );

    return (
        <motion.line
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#a1a1aa"
            strokeWidth="0.22"
            style={{ opacity }}
        />
    );
}

export function ResearchTemporalGraph() {
    const reduceMotion = usePrefersReducedMotion();
    const targetRef = useRef<HTMLDivElement>(null);
    const [stage, setStage] = useState(0);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const index = stages.reduce((acc, item, i) => (value >= item.at ? i : acc), 0);
        setStage(index);
    });

    const hotOpacity = useTransform(scrollYProgress, [0.52, 0.64], [0, 1]);

    return (
        <section className="relative w-full bg-background">
            <div className="px-5 pb-8 pt-24 sm:px-8 md:px-12 lg:px-16">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted">06 / RESEARCH</p>
                <h2 className="type-display mt-6 text-display-sm text-foreground">
                    {["Researching", "the unknown."].map((line, index) => (
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
                <p className="panel-body mt-6 max-w-xl text-sm leading-relaxed">
                    Temporal structure in network traffic — the same instinct as the Wireshark forensics note:
                    hosts, protocols, and evidence unfolding over time.
                </p>
            </div>

            {reduceMotion ? (
                <div className="px-5 pb-24 sm:px-8 md:px-12 lg:px-16">
                    <div className="panel-surface max-w-xl rounded-2xl p-6">
                        <p className="panel-kicker">{stages[3].label}</p>
                        <p className="panel-body mt-4 text-sm leading-relaxed">{stages[3].copy}</p>
                        <Link
                            href="https://network-malware-analysis-shubham.blogspot.com/2026/04/network-traffic-analysis-for-malware.html"
                            target="_blank"
                            rel="noreferrer"
                            className="panel-title mt-6 inline-block text-sm transition-opacity hover:opacity-80"
                        >
                            Read the traffic analysis ↗
                        </Link>
                    </div>
                </div>
            ) : (
                <div ref={targetRef} className="relative h-[160svh] md:h-[240svh]">
                    <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16">
                        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            <svg viewBox="0 0 100 100" className="h-[58vh] w-full max-w-2xl overflow-visible lg:h-[62vh]">
                                {links.map((link) => (
                                    <GraphLink key={`${link.from}-${link.to}`} progress={scrollYProgress} {...link} />
                                ))}
                                {nodes.map((node) => (
                                    <GraphMark key={node.id} progress={scrollYProgress} appear={node.appear}>
                                        {node.hot ? (
                                            <motion.circle
                                                cx={node.x}
                                                cy={node.y}
                                                r="3.4"
                                                fill="none"
                                                stroke="#e2e8f0"
                                                strokeWidth="0.18"
                                                style={{ opacity: hotOpacity }}
                                            />
                                        ) : null}
                                        <circle cx={node.x} cy={node.y} r={node.r} fill={node.hot ? "#f8fafc" : "#d4d4d8"} />
                                        <text
                                            x={node.x}
                                            y={node.y + 4.6}
                                            textAnchor="middle"
                                            fill="#d4d4d8"
                                            fontSize="2.1"
                                            fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                        >
                                            {node.label}
                                        </text>
                                    </GraphMark>
                                ))}
                            </svg>

                            <div className="panel-surface flex flex-col justify-center rounded-2xl p-6 sm:p-7 lg:min-h-[16rem]">
                                <p className="panel-kicker">
                                    Stage {stage + 1} / {stages[stage].label}
                                </p>
                                <p className="panel-body mt-4 text-sm leading-relaxed sm:text-[0.95rem]">
                                    {stages[stage].copy}
                                </p>

                                <div className="mt-6 flex gap-2">
                                    {stages.map((item, index) => (
                                        <span
                                            key={item.id}
                                            className={
                                                index === stage
                                                    ? "h-1 flex-1 rounded-full bg-white/80"
                                                    : "h-1 flex-1 rounded-full bg-white/15"
                                            }
                                            aria-hidden
                                        />
                                    ))}
                                </div>

                                <p className="panel-muted mt-6 font-mono text-[10px] uppercase tracking-[0.16em]">
                                    DNS · HTTP · TCP · TLS · ARP · DHCP · SMB
                                </p>
                                <Link
                                    href="https://network-malware-analysis-shubham.blogspot.com/2026/04/network-traffic-analysis-for-malware.html"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="panel-title mt-6 inline-block text-sm transition-opacity hover:opacity-80"
                                >
                                    Read the traffic analysis ↗
                                </Link>
                                <p className="panel-muted mt-4 font-mono text-[10px] uppercase tracking-[0.14em]">
                                    Scroll to advance the timeline
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
