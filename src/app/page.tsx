"use client";

import { motion } from "framer-motion";
import { ScrollSequence } from "@/components/animation/ScrollSequence";
import { ArrowRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* Hero Animation Section */}
      <section className="relative w-full bg-black z-0">
        {isMobile ? (
          <div className="w-full h-[80vh] relative flex items-center justify-center">
            {/* Fallback Static Hero for Mobile Performance */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" />
            <Image
              src="/assets/hero-sequence/keyboard sequence/00192.png"
              alt="Hero Fallback"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <ScrollSequence
            frameCount={192}
            folderPath="/assets/hero-sequence/keyboard sequence"
            prefix=""
            indexPadding={5}
            extension="png"
            playOnce={false}
          />
        )}

        {/* Absolute overlay at the very bottom of the scroll sequence container if we wanted it to overlay perfectly at the end, 
            but standard scrollflow handles this elegantly by placing the next section organically below it. 
        */}
      </section>

      {/* Content that fades in AFTER animation ends */}
      <section className="relative z-10 w-full bg-background rounded-t-[3rem] -mt-12 pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Custom spring-like easing
          className="max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[1.1]">
            Where Code Meets<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Interaction
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/50 text-balance max-w-2xl mx-auto font-light">
            Computer Science undergraduate developing end-to-end web applications,
            combining modern frontend engineering, scalable backend logic,
            and early-stage AI integrations.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-16"
          >
            <button className="flex items-center justify-center gap-3 group w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span>Explore my work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </button>
            <button className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium tracking-wide hover:bg-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              Work
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Additional spacing to enjoy the footer and bottom flow */}
      <section className="min-h-[50vh] w-full bg-background flex items-center justify-center pb-32">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white/40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500"
          >
            <h3 className="text-white/80 font-medium mb-4 text-lg">Systems Thinking</h3>
            <p className="text-sm leading-relaxed">Approaching projects by thinking about how different parts of an application
              work together, from user interface to basic backend logic.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500"
          >
            <h3 className="text-white/80 font-medium mb-4 text-lg">Full-Stack Foundations</h3>
            <p className="text-sm leading-relaxed">Building complete web applications by working across frontend features
              and foundational backend functionality.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 border border-white/5 rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-500"
          >
            <h3 className="text-white/80 font-medium mb-4 text-lg">Applied AI</h3>
            <p className="text-sm leading-relaxed">Exploring practical AI features such as intelligent automation,
              data-driven insights, and AI-assisted user workflows in real projects.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
