"use client";

import { motion, Variants } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function ProjectsPage() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Selected <span className="text-white/40">Works</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed text-balance font-light">
                        A collection of projects showcasing high-performance engineering paired with uncompromising aesthetic design.
                    </motion.p>
                </motion.div>

                {/* Projects List */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-8"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.slug}
                            variants={fadeUp}
                        >
                            <Link href={`/projects/${project.slug}`} className="group block">
                                <article className="relative bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                                        <div className="space-y-4 max-w-2xl">
                                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
                                                {project.title}
                                            </h2>
                                            <p className="text-lg text-white/50 leading-relaxed font-light line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.techStack.slice(0, 4).map((tech) => (
                                                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 4 && (
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50">
                                                        +{project.techStack.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0">
                                            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                        </div>
                                    </div>

                                    {/* Subtle hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
