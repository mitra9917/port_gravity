"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "634374a7-2135-4a19-9b5c-cfef17dd6072",
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setIsSuccess(true);
                setFormState({ name: "", email: "", message: "" });
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                console.error("Form submission failed:", result);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-black text-white pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                >
                    {/* Left Column: Contact Info & Message */}
                    <div className="space-y-12">
                        <motion.div variants={itemVariants}>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                                Let&apos;s <span className="text-white/40">Connect</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-md font-light">
                                Whether you have a project in mind, a question about my work, or just want to say hi, I&apos;m always open to discussing new opportunities.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="group flex flex-col">
                                <span className="text-sm font-medium text-white/40 mb-2 uppercase tracking-widest">Email</span>
                                <a
                                    href="mailto:work.shubham.dev@gmail.com"
                                    className="text-2xl md:text-3xl font-light hover:text-white/80 transition-colors inline-flex items-center gap-4"
                                >
                                    work.shubham.dev@gmail.com
                                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                </a>
                            </div>

                            <div className="group flex flex-col pt-6">
                                <span className="text-sm font-medium text-white/40 mb-4 uppercase tracking-widest">Socials</span>
                                <div className="flex gap-6">
                                    <a href="https://github.com/mitra9917" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                                        <span className="sr-only">GitHub</span>
                                        <Github className="w-6 h-6" />
                                    </a>
                                    <a href="https://x.com/mitra9917" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                                        <span className="sr-only">Twitter</span>
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shubham-kumar-mitra-335626336/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300">
                                        <span className="sr-only">LinkedIn</span>
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative gradient orb */}
                        <div className="absolute top-0 right-0 -mt-32 -mr-32 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-white/60 pl-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-white/60 pl-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="abc@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-white/60 pl-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formState.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full relative flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-xl py-4 mt-4 overflow-hidden group hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <span className="flex flex-row items-center gap-2">
                                        <span className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                                        Sending...
                                    </span>
                                ) : isSuccess ? (
                                    <span className="text-green-600">Message Sent!</span>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                </motion.div>

            </div>
        </div>
    );
}
