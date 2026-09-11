"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ease = [0.16, 1, 0.3, 1] as const;
const headline = ["Let's build", "something", "great."];

export function ContactCinematic() {
    const reduceMotion = usePrefersReducedMotion();

    return (
        <section className="relative w-full bg-background px-5 pb-16 pt-12 sm:px-8 md:px-12 md:pb-20 md:pt-16 lg:px-16">
            <div className="mx-auto w-full max-w-6xl">
                <p className="font-mono text-[11px] tracking-[0.18em] text-muted">08 / CONTACT</p>
                <h2 className="type-display mt-6 text-display text-foreground">
                    {headline.map((line, index) => (
                        <motion.span
                            key={line}
                            className="block"
                            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.08 * index, ease }}
                        >
                            {line}
                        </motion.span>
                    ))}
                </h2>
                <p className="mt-10 max-w-md text-lg leading-relaxed text-foreground/45">
                    Open to internships, collaborations, interesting projects,
                    and conversations about technology.
                </p>
                <a
                    href="mailto:work.shubham.dev@gmail.com"
                    data-cursor="open"
                    className="mt-12 inline-block text-sm tracking-wide text-foreground transition-opacity hover:opacity-70"
                >
                    Email Me ↗
                </a>
                <div className="mt-10 flex flex-wrap gap-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    <a href="https://www.linkedin.com/in/shubham-kumar-mitra-335626336/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                        LinkedIn
                    </a>
                    <a href="https://github.com/mitra9917" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                        GitHub
                    </a>
                    <a href="https://x.com/mitra9917" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                        X
                    </a>
                </div>
            </div>
        </section>
    );
}
