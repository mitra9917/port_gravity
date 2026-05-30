"use client";

import { motion, Variants } from "framer-motion";
import {
    Bot,
    Briefcase,
    Braces,
    Code2,
    Database,
    GraduationCap,
    Layers3,
    Palette,
    Radar,
    Rocket,
    Server,
    type LucideIcon,
} from "lucide-react";
import { DistortedImage } from "@/components/animation/DistortedImage";

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

const toolkitCards: {
    title: string;
    subtitle: string;
    icon: LucideIcon;
}[] = [
        {
            title: "React & Next.js",
            subtitle: "App Router, Server Components",
            icon: Code2,
        },
        {
            title: "TypeScript",
            subtitle: "Typed, maintainable codebases",
            icon: Braces,
        },
        {
            title: "Tailwind & shadcn/ui",
            subtitle: "Fast, consistent interfaces",
            icon: Palette,
        },
        {
            title: "Hugging Face",
            subtitle: "Models, datasets, transformers",
            icon: Bot,
        },
        {
            title: "RAG & Agents",
            subtitle: "LangChain, LlamaIndex patterns",
            icon: Layers3,
        },
        {
            title: "Vector Search",
            subtitle: "Embeddings, pgvector, Chroma",
            icon: Radar,
        },
        {
            title: "AI Evaluation",
            subtitle: "Prompt tests, quality checks",
            icon: Server,
        },
        {
            title: "Supabase & Postgres",
            subtitle: "Auth, RLS, relational data",
            icon: Database,
        },
        {
            title: "Vercel",
            subtitle: "Deployment, analytics, edge",
            icon: Rocket,
        },
    ];

const experienceItems = [
    {
        title: "Technology Executive Intern",
        meta: "Seatrick Innovations Pvt Ltd • Singapore-based maritime tech • May 2026 - Jul 2026",
        description:
            "Supporting testing, analysis, technical coordination, documentation, and project execution for digital initiatives serving the maritime technology ecosystem.",
        tags: ["Maritime Tech", "Testing", "Analysis"],
    },
    {
        title: "Frontend Web Developer",
        meta: "NEXUS VIT • Full-time • Aug 2025 - Present",
        description:
            "Working on Web development side for club projects, focusing on responsive interfaces, clean component structure, and user-facing web experiences.",
        tags: ["Front-End", "React", "UI Development"],
    },
    {
        title: "Design Department",
        meta: "Microsoft Innovations Club VITC • Full-time • Aug 2025 - Present",
        description:
            "Contributing to design work for club initiatives, with attention to visual clarity, layout systems, and polished digital presentation.",
        tags: ["Design", "Figma", "Visual Systems"],
    },
];

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
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 rounded-3xl border border-white/10 shadow-2xl overflow-hidden pointer-events-none">
                            <DistortedImage src="/Professional_mitra.png" className="opacity-80 mix-blend-screen" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Narrative Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="max-w-3xl mb-24 space-y-8"
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

                {/* Experience Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-[0.8fr_2fr] gap-8 md:gap-12 mb-28"
                >
                    <motion.div variants={fadeIn} className="flex items-center md:items-start gap-3">
                        <Briefcase className="w-6 h-6 text-white/50 mt-1" />
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
                            <p className="mt-3 text-sm leading-relaxed text-white/40">
                                Project-based work across full-stack, AI, and interaction design.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={staggerContainer} className="space-y-4">
                        {experienceItems.map((item) => (
                            <motion.article
                                key={item.title}
                                variants={fadeIn}
                                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-[#00FFFF]/30 transition-colors"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold group-hover:text-[#00FFFF] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-white/45">{item.meta}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:justify-end">
                                        {item.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-white/65">
                                    {item.description}
                                </p>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.section>

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
                            <motion.div variants={fadeIn} className="group relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/40 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold group-hover:text-[#00FFFF] transition-colors">B.Tech. Computer Science</h4>
                                <p className="text-white/50 text-sm mb-2">Vellore Institute of Technology • 2024 - 2028</p>
                                <p className="text-white/70 text-sm">Currently pursuing a Bachelor’s degree in Computer Science,
                                    with coursework covering programming fundamentals, data structures,
                                    web development, and software engineering concepts.</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="group relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold group-hover:text-[#00FFFF] transition-colors">Web Design Specialist Certification</h4>
                                <p className="text-white/50 text-sm mb-2">Figma • 2025</p>
                                <p className="text-white/70 text-sm">Focused on clean UI, typography in digital spaces, and advanced prototyping.</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="group relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold group-hover:text-[#00FFFF] transition-colors">Exploring Networking with Cisco Packet Tracer</h4>
                                <p className="text-white/50 text-sm mb-2">Cisco Networking Academy • 2025</p>
                                <p className="text-white/70 text-sm">Built wired and wireless networks using Cisco Packet Tracer & Configured routers, switches, and wireless devices</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="group relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold group-hover:text-[#00FFFF] transition-colors">Introduction to Agile Development and Scrum</h4>
                                <p className="text-white/50 text-sm mb-2">IBM • 2026</p>
                                <p className="text-white/70 text-sm">Kanban board created as part of the Agile Scrum final project, demonstrating end-to-end workflow management using GitHub Projects. The board includes Icebox, Product Backlog and other Reiterative methodologies.</p>
                            </motion.div>

                            <motion.div variants={fadeIn} className="group relative">
                                <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                <h4 className="text-lg font-semibold group-hover:text-[#00FFFF] transition-colors">Supervised Machine Learning: Regression and Classification </h4>
                                <p className="text-white/50 text-sm mb-2">DeepLearning.AI • 2026</p>
                                <p className="text-white/70 text-sm">Completed DeepLearning.AI’s Supervised Machine Learning course, covering core regression and classification techniques used to build predictive models. Gained practical understanding of model training, cost functions, gradient descent, and evaluation for real-world machine learning problems.</p>
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

                        <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {toolkitCards.map(({ title, subtitle, icon: Icon }) => (
                                <div
                                    key={title}
                                    className="group min-h-36 p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between gap-4 hover:bg-white/[0.05] hover:border-[#00FFFF]/40 transition-colors"
                                >
                                    <Icon className="w-5 h-5 text-white/40" />
                                    <div className="flex flex-col gap-2">
                                        <span className="font-medium leading-tight group-hover:text-[#00FFFF] transition-colors">{title}</span>
                                        <span className="text-xs leading-relaxed text-white/50">{subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
