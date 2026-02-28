"use client";

import { motion, Variants } from "framer-motion";
import { GraduationCap, Code2, BookOpen, Coffee } from "lucide-react";

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function About() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <motion.div variants={fadeIn} className="space-y-8">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Shubham</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
                            I’m a Computer Science undergraduate exploring full-stack development,
                            combining interactive user interfaces with backend logic and early-stage AI concepts.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeIn} className="relative aspect-square w-full max-w-md mx-auto md:ml-auto">
                        {/* Using a placeholder for the personal photo, using a sleek dark gradient as structural fill */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay grayscale"></div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Narrative Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="max-w-3xl mb-32 space-y-8"
                >
                    <motion.h2 variants={fadeIn} className="text-3xl font-bold tracking-tight mb-8">
                        My Story
                    </motion.h2>
                    <motion.p variants={fadeIn} className="text-lg text-white/70 leading-relaxed">
                        My journey into software development began with curiosity about how ideas
                        turn into real, usable systems. I was drawn to the way code connects logic,
                        design, and user experience into something people can actually interact with.
                    </motion.p>
                    <motion.p variants={fadeIn} className="text-lg text-white/70 leading-relaxed">
                        As a Computer Science undergraduate, I’ve been exploring full-stack development
                        by building projects that combine modern interfaces with supporting backend logic.
                        Along the way, I’ve also started experimenting with applied AI features to
                        understand how intelligent systems can enhance real-world applications.
                    </motion.p>
                    <motion.p variants={fadeIn} className="text-lg text-white/70 leading-relaxed">
                        I’m especially interested in learning how good software balances clarity,
                        performance, and usability. Each project I work on helps me better understand
                        how thoughtful engineering choices shape reliable and scalable products.
                    </motion.p>
                </motion.div>

                {/* Details Grid: Education & Interests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Education */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                            <GraduationCap className="w-6 h-6 text-white/50" />
                            <h3 className="text-2xl font-bold">Education</h3>
                        </motion.div>

                        <div className="space-y-6 border-l border-white/10 pl-6 ml-3">
                            <motion.div variants={fadeIn} className="relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/40 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold">B.Tech. Computer Science</h4>
                                <p className="text-white/50 text-sm mb-2">Vellore Institute of Technology • 2024 - 2028</p>
                                <p className="text-white/70 text-sm">Currently pursuing a Bachelor’s degree in Computer Science,
                                    with coursework covering programming fundamentals, data structures,
                                    web development, and software engineering concepts.</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold">Web Design Specialist Certification</h4>
                                <p className="text-white/50 text-sm mb-2">Figma • 2025</p>
                                <p className="text-white/70 text-sm">Focused on clean UI, typography in digital spaces, and advanced prototyping.</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold">Exploring Networking with Cisco Packet Tracer</h4>
                                <p className="text-white/50 text-sm mb-2">Cisco Networking Academy • 2025</p>
                                <p className="text-white/70 text-sm">Built wired and wireless networks using Cisco Packet Tracer & Configured routers, switches, and wireless devices</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold">Introduction to Agile Development and Scrum</h4>
                                <p className="text-white/50 text-sm mb-2">IBM • 2026</p>
                                <p className="text-white/70 text-sm">Kanban board created as part of the Agile Scrum final project, demonstrating end-to-end workflow management using GitHub Projects. The board includes Icebox, Product Backlog and other Reiterative methodologies.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Interests & Toolkit */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-8"
                    >
                        <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                            <Code2 className="w-6 h-6 text-white/50" />
                            <h3 className="text-2xl font-bold">Toolkit & Interests</h3>
                        </motion.div>

                        <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 hover:bg-white/[0.05] transition-colors">
                                <BookOpen className="w-5 h-5 text-white/40" />
                                <span className="font-medium">Whisk & Flow</span>
                                <span className="text-xs text-white/50">Prompt Image Render</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 hover:bg-white/[0.05] transition-colors">
                                <Coffee className="w-5 h-5 text-white/40" />
                                <span className="font-medium">Creative Coding</span>
                                <span className="text-xs text-white/50">Generative art algorithms</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 hover:bg-white/[0.05] transition-colors">
                                <Code2 className="w-5 h-5 text-white/40" />
                                <span className="font-medium">Modern React</span>
                                <span className="text-xs text-white/50">Next.js 14, Server Components</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2 hover:bg-white/[0.05] transition-colors">
                                <GraduationCap className="w-5 h-5 text-white/40" />
                                <span className="font-medium">Typography</span>
                                <span className="text-xs text-white/50">Grid systems, micro-interactions</span>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
