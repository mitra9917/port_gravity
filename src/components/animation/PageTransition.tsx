"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const reduceMotion = usePrefersReducedMotion();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-grow flex-col"
            >
                {!reduceMotion && (
                    <motion.div
                        aria-hidden
                        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-black"
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY: 1 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    />
                )}
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
