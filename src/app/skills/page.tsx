"use client";

import { motion, Variants } from "framer-motion";

const skillsData = [
    {
        category: "Frontend & UI",
        items: [
            "React",
            "Next.js 14",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion"
        ],
    },
    {
        category: "Backend & Systems",
        items: [
            "Node.js",
            "PostgreSQL",
            "RESTful APIs",
            "Supabase",
        ],
    },
    {
        category: "Design & Tooling",
        items: [
            "Figma",
            "Git / GitHub",
            "Docker",
            "Vercel",
        ],
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
        }
    },
};

export default function Skills() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Technical <span className="text-white/40">Expertise</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed text-balance font-light">
                        A curated list of the tools and technologies I use to bridge the gap between complex engineering and elegant design.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
                >
                    {skillsData.map((group) => (
                        <motion.div key={group.category} variants={categoryVariants} className="space-y-8 border-t border-white/10 pt-8">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                {group.category}
                            </h2>
                            <motion.ul
                                className="space-y-4"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                                    }
                                }}
                            >
                                {group.items.map((skill) => (
                                    <motion.li
                                        key={skill}
                                        variants={itemVariants}
                                        className="flex items-center text-white/70 hover:text-white transition-colors py-1 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-4 group-hover:bg-white/80 transition-colors" />
                                        <span className="text-lg">{skill}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
