"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useImageSequence } from "@/hooks/animation/useImageSequence";
import { cn } from "@/lib/utils";

interface ScrollSequenceProps {
    frameCount: number;
    folderPath: string;
    prefix?: string;
    indexPadding?: number;
    extension?: string;
    className?: string;
    containerClassName?: string;
    fallbackColor?: string;
    playOnce?: boolean;
    onComplete?: () => void;
}

export function ScrollSequence({
    frameCount,
    folderPath,
    prefix,
    indexPadding,
    extension,
    className,
    containerClassName,
    fallbackColor = "#000000",
    playOnce = false,
    onComplete
}: ScrollSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const maxFrameRef = useRef(0);
    const hasCompletedRef = useRef(false);

    // Track scroll progress within the container using strict intersection mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Using "start center" ensures mobile browsers don't wait for the invisible 
        // 100vh height to trigger the bottom offset calculations
        offset: ["start start", "end end"]
    });

    // Load and cache all images
    const { images, loaded, progress } = useImageSequence({
        frameCount,
        folderPath,
        prefix,
        indexPadding,
        extension,
    });

    // Map scroll progress (0-1) to frame index (0 to frameCount - 1)
    const currentFrameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // Render function using requestAnimationFrame for smooth performance
    const renderFrame = (index: number) => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        // Ensure index is within bounds and rounded safely
        const safeIndex = Math.min(Math.max(0, Math.round(index)), frameCount - 1);

        // Find the absolute closest loaded frame searching backwards to prevent blank drops
        // if the user scrolls faster than the background network chunk buffer can load them.
        let exactIndex = safeIndex;
        let img = images[exactIndex];

        while (!img && exactIndex > 0) {
            exactIndex--;
            img = images[exactIndex];
        }

        if (!img) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle high DPI displays for crisp rendering
        const dpr = window.devicePixelRatio || 1;

        // Match canvas internal resolution to its display size multiplied by DPR
        // Avoid resetting dimensions on every frame if they haven't changed
        const rect = canvas.getBoundingClientRect();
        const targetWidth = rect.width * dpr;
        const targetHeight = rect.height * dpr;

        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
            canvas.width = targetWidth;
            canvas.height = targetHeight;
        }

        // Clear previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // We specifically avoid setting imageSmoothingQuality="high" because running aggressive 
        // bilinear filtering 192 times on huge decoded PNG memory buffers causes Safari GPU lag.

        // Draw background fallback if needed
        ctx.fillStyle = fallbackColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratio preserving dimensions showing full image (cover)
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image (relative) - crop top/bottom
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image (relative) - crop sides
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        // Draw the image onto the canvas, rounding coordinates to prevent sub-pixel blur
        ctx.drawImage(img, Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight));
    };

    // Initial and progressive render when images finish loading in the background
    useEffect(() => {
        if (loaded) {
            requestAnimationFrame(() => renderFrame(currentFrameIndex.get()));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, progress]);

    // Update canvas when scroll position changes
    useMotionValueEvent(currentFrameIndex, "change", (latest) => {
        let targetIndex = latest;

        if (playOnce) {
            if (latest > maxFrameRef.current) {
                maxFrameRef.current = latest;
            }
            targetIndex = maxFrameRef.current;
        }

        if (latest >= frameCount - 1 && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
        }

        requestAnimationFrame(() => renderFrame(targetIndex));
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (loaded) {
                requestAnimationFrame(() => renderFrame(currentFrameIndex.get()));
            }
        };

        window.addEventListener('resize', handleResize);
        // Initial draw loop trigger to assure size is picked up
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full", containerClassName)}
            // Replace unreliable vh unit on mobile devices with an absolute pixel calculation factor.
            // SVH (small viewport height) supports iOS Safari bottom bars properly. 
            // We use a high multiplier to stretch the "track" that the canvas will animate along.
            style={{ height: `${frameCount * 2}svh` }}
        >
            <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex items-center justify-center bg-black">
                {/* Loading overlay */}
                {!loaded && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm text-white">
                        <div className="text-sm font-mono tracking-widest uppercase mb-4 text-white/70">
                            Loading Assets
                        </div>
                        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="mt-2 text-xs font-mono text-white/50">{progress}%</div>
                    </div>
                )}

                {/* The canvas that renders the frames */}
                <canvas
                    ref={canvasRef}
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-1000",
                        loaded ? "opacity-100" : "opacity-0",
                        className
                    )}
                />
            </div>
        </div>
    );
}
