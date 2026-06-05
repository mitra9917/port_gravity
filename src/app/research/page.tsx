"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, BookOpen, FileText, FlaskConical, Microscope } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const researchItems = [
    {
        title: "Summer Research Internship 2026",
        context: "Vellore Institute of Technology",
        description: "Research-oriented technical work focused on literature study, experimentation, analysis, and documentation inside an academic workflow.",
        tags: ["Research", "Analysis", "Documentation"],
    },
];

const blogItems = [
    {
        title: "Network Traffic Analysis for Malware Presence Confirmation using Wireshark",
        type: "Technical Blog • April 09, 2026",
        description: "A structured passive network forensics report using DNS, HTTP, TCP, TLS, ARP, DHCP, SMB, and reputation-based evidence to confirm likely malware behavior from PCAP traffic.",
        href: "https://network-malware-analysis-shubham.blogspot.com/2026/04/network-traffic-analysis-for-malware.html",
        tags: ["Wireshark", "Malware Analysis", "Network Forensics"],
    },
];

export default function ResearchPage() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white/40">
                        <Microscope className="h-4 w-4" />
                        Research & Writing
                    </motion.div>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Research <span className="text-white/40">Notes</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed text-balance font-light">
                        A focused archive of research work, technical writing, and engineering notes around full-stack systems, AI, ML, and interactive product design.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-16">
                    <motion.section
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-3 border-t border-white/10 pt-8">
                            <FlaskConical className="h-5 w-5 text-white/50" />
                            <h2 className="text-3xl font-bold tracking-tight">Research Work</h2>
                        </motion.div>

                        <div className="space-y-4">
                            {researchItems.map((item) => (
                                <motion.article
                                    key={item.title}
                                    variants={fadeUp}
                                    className="group rounded-3xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-[#00FFFF]/35 transition-colors duration-500"
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="space-y-3">
                                            <p className="text-xs uppercase tracking-widest text-white/35">{item.context}</p>
                                            <h3 className="text-2xl font-semibold leading-tight group-hover:text-[#00FFFF] transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 group-hover:text-[#00FFFF] transition-colors" />
                                    </div>
                                    <p className="mt-5 text-sm leading-relaxed text-white/60">{item.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-6"
                    >
                        <motion.div variants={fadeUp} className="flex items-center gap-3 border-t border-white/10 pt-8">
                            <BookOpen className="h-5 w-5 text-white/50" />
                            <h2 className="text-3xl font-bold tracking-tight">Technical Blog</h2>
                        </motion.div>

                        <div className="space-y-4">
                            {blogItems.map((item) => (
                                <motion.article
                                    key={item.title}
                                    variants={fadeUp}
                                    className="group rounded-3xl border border-white/5 bg-white/[0.015] p-6 hover:bg-[#00FFFF]/10 hover:border-[#00FFFF]/35 transition-colors duration-500"
                                >
                                    <div className="flex items-start gap-4">
                                        <FileText className="mt-1 h-5 w-5 shrink-0 text-white/35" />
                                        <div>
                                            <p className="mb-3 text-xs uppercase tracking-widest text-white/35">{item.type}</p>
                                            <h3 className="text-2xl font-semibold leading-tight group-hover:text-[#00FFFF] transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="mt-4 text-sm leading-relaxed text-white/60">{item.description}</p>
                                            <Link
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-[#00FFFF] transition-colors"
                                            >
                                                Read official blog
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-2 pl-9">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
