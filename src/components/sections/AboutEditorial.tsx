"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const headline = ["More than", "just a", "developer."];
const ease = [0.16, 1, 0.3, 1] as const;

const notes = [
    { label: "Degree", value: "B.Tech. Computer Science" },
    { label: "University", value: "Vellore Institute of Technology" },
    { label: "Timeline", value: "2024 — 2028" },
];

const roles = [
    "Technology Executive Intern, Seatrick Innovations",
    "Summer Research Intern, VIT",
    "Frontend Web Developer, NEXUS VIT",
    "Design Department, Microsoft Innovations Club VITC",
];

export function AboutEditorial() {
    const reduceMotion = usePrefersReducedMotion();

    return (
        <section className="relative w-full bg-background px-5 py-32 sm:px-8 md:px-12 md:py-40 lg:px-16">
            <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
                <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-muted">01 / ABOUT</p>
                    <h2 className="type-display mt-6 text-display text-foreground">
                        {headline.map((line, index) => (
                            <motion.span
                                key={line}
                                className="block"
                                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.85, delay: 0.08 * index, ease }}
                            >
                                {line}
                            </motion.span>
                        ))}
                    </h2>

                    <motion.p
                        className="type-body mt-10 max-w-xl text-lg text-foreground/55"
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.28, ease }}
                    >
                        I&apos;m Shubham, a Computer Science undergraduate exploring full-stack development,
                        combining interactive user interfaces with backend logic and early-stage AI concepts.
                    </motion.p>

                    <motion.p
                        className="type-body mt-6 max-w-xl text-[0.95rem] text-foreground/40"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4, ease }}
                    >
                        My journey into software development began with curiosity about how ideas
                        turn into real, usable systems — how code connects logic, design, and
                        user experience into something people can actually interact with.
                    </motion.p>

                    <Link
                        href="/about"
                        className="mt-10 inline-block text-sm tracking-wide text-foreground transition-opacity hover:opacity-70"
                    >
                        Full profile ↗
                    </Link>
                </div>

                <motion.aside
                    className="flex flex-col gap-8 lg:pt-6"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.85, delay: 0.2, ease }}
                >
                    <div className="panel-surface rounded-2xl p-6 sm:p-7">
                        <p className="panel-kicker">Education</p>
                        <dl className="mt-5 space-y-4">
                            {notes.map((note) => (
                                <div key={note.label} className="flex items-baseline justify-between gap-4">
                                    <dt className="panel-muted shrink-0 font-mono text-[10px] uppercase tracking-[0.14em]">
                                        {note.label}
                                    </dt>
                                    <dd className="panel-body text-right text-sm">{note.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="panel-surface rounded-2xl p-6 sm:p-7">
                        <p className="panel-kicker">Experience</p>
                        <ul className="mt-5 space-y-4">
                            {roles.map((role) => (
                                <li key={role} className="flex gap-3">
                                    <span
                                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"
                                        aria-hidden
                                    />
                                    <span className="panel-body text-sm leading-relaxed">{role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Focus", value: "Full-stack" },
                            { label: "Stack", value: "React / Next" },
                            { label: "Interest", value: "Applied AI" },
                        ].map((chip) => (
                            <div key={chip.label} className="panel-surface rounded-2xl px-3 py-3 text-center">
                                <p className="panel-muted font-mono text-[9px] uppercase tracking-[0.16em]">
                                    {chip.label}
                                </p>
                                <p className="panel-body mt-1.5 text-xs">{chip.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.aside>
            </div>
        </section>
    );
}
