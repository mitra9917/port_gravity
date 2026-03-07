'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HorizontalScrollProps {
    children: ReactNode;
}

export function HorizontalScroll({ children }: HorizontalScrollProps) {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Map vertical scroll progress (0 to 1) to horizontal translation (0% to -100% plus viewport width)
    // We use 1vw padding offset to ensure it scrolls exactly to the end
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-8 sm:px-16 lg:px-32 w-max items-center">
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
