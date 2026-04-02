'use client';

import { useRef, ReactNode, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextMaskProps {
    text: string;
    backgroundContent?: ReactNode;
}

export function TextMask({ text, backgroundContent }: TextMaskProps) {
    const container = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    // Stay at scale 1 for the first 40% of the scroll section, then scale dramatically to "fly through"
    const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 90]);

    return (
        <div ref={container} className="relative h-[300vh] w-full bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">

                {/* The scaling mask layer */}
                <motion.div
                    style={{ scale }}
                    className="relative z-10 w-full h-full flex items-center justify-center origin-center"
                >
                    {/* 
            SVG Mask: 
            The white rect keeps the black overlay visible.
            The black text cuts a hole through the black overlay, revealing what's behind it.
          */}
                    <svg className="w-full h-full object-cover" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <mask id="textMask">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize={isMobile ? "23" : "95"}
                                    fontWeight="900"
                                    letterSpacing="0.05em"
                                    fill="black"
                                    className="font-sans uppercase"
                                >
                                    {text}
                                </text>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" fill="black" mask="url(#textMask)" />
                    </svg>
                </motion.div>

                {/* The content revealed inside the text */}
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100">
                    {backgroundContent || (
                        // A highly vibrant, premium Apple-like gradient perfectly contrasting monotonic black
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-350" />
                    )}
                </div>

            </div>
        </div>
    );
}
