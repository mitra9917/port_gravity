"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Code2, Layout, Database, Zap } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug } from "@/data/projects";
import { notFound } from "next/navigation";

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

export default function ProjectDetail({ params }: { params: { slug: string } }) {
    const projectData = getProjectBySlug(params.slug);

    if (!projectData) {
        notFound();
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-4xl">

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <Link href="/projects" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors group">
                        <ArrowUpRight className="w-4 h-4 mr-2 rotate-[-135deg] group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform" />
                        Back to Projects
                    </Link>
                </motion.div>

                {/* 1. Project Hero */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 mb-24"
                >
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                        {projectData.title}
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/50 leading-relaxed font-light max-w-2xl">
                        {projectData.description}
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-4">
                        {projectData.techStack.map((tag) => (
                            <span
                                key={tag}
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Decorative Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0.9 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-px bg-white/10 mb-24 origin-left"
                />

                {/* 2. Overview Section */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-32"
                >
                    <motion.div variants={fadeUp}>
                        <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest sticky top-32">Overview</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold flex items-center gap-3">
                                <Layout className="w-5 h-5 text-white/50" /> The Problem
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.overview.problem}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold flex items-center gap-3">
                                <Zap className="w-5 h-5 text-white/50" /> The Solution
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.overview.solution}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold flex items-center gap-3">
                                <ExternalLink className="w-5 h-5 text-white/50" /> The Purpose
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.overview.purpose}</p>
                        </div>
                    </motion.div>
                </motion.section>

                {/* 3. Technical Section */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-32"
                >
                    <motion.div variants={fadeUp}>
                        <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest sticky top-32">Technical</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-12 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold flex items-center gap-3">
                                <Database className="w-5 h-5 text-white/50" /> Architecture
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.technical.architecture}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold flex items-center gap-3">
                                <Code2 className="w-5 h-5 text-white/50" /> Decisions & Challenges
                            </h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.technical.challenges}</p>
                        </div>
                    </motion.div>
                </motion.section>

                {/* 4. Outcomes Section */}
                <motion.section
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-32"
                >
                    <motion.div variants={fadeUp}>
                        <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest sticky top-32">Impact</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-12">
                        <div className="space-y-4 border-l border-white/10 pl-8 relative">
                            <div className="absolute w-2 h-2 rounded-full bg-white/50 -left-[4px] top-2" />
                            <h3 className="text-2xl font-semibold">Outcome Achieved</h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.outcome.achieved}</p>
                        </div>
                        <div className="space-y-4 border-l border-white/10 pl-8 relative">
                            <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[4px] top-2" />
                            <h3 className="text-2xl font-semibold">Real World Relevance</h3>
                            <p className="text-lg text-white/70 leading-relaxed font-light">{projectData.outcome.relevance}</p>
                        </div>
                    </motion.div>
                </motion.section>

                {/* 5. Action Buttons (CTA) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6 pt-16 border-t border-white/10"
                >
                    <a rel="noopener noreferrer" target="_blank" href={projectData.liveUrl} className="flex justify-center items-center gap-3 group w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <span>View Live Project</span>
                        <ExternalLink className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                    </a>

                    <a rel="noopener noreferrer" target="_blank" href={projectData.codeUrl} className="flex justify-center items-center gap-3 w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium tracking-wide hover:bg-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <Github className="w-5 h-5 opacity-70" />
                        <span>View Source Code</span>
                    </a>
                </motion.div>

            </div>
        </div>
    );
}
