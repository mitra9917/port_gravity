"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useSpriteSheet } from "@/hooks/animation/useSpriteSheet";
import { cn } from "@/lib/utils";

interface ScrollSequenceProps {
    frameCount: number;
    folderPath: string;
    className?: string;
    containerClassName?: string;
    fallbackColor?: string;
    playOnce?: boolean;
    onComplete?: () => void;
}

export function ScrollSequence({
    frameCount,
    folderPath,
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

    // Load the 8 hardware-safe Sprite Sheets
    const { sprites, loaded, progress } = useSpriteSheet({
        folderPath,
        sheetCount: 8
    });

    // Map scroll progress (0-1) to frame index (0 to frameCount - 1)
    const currentFrameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // Render function using requestAnimationFrame for smooth performance
    const renderFrame = (index: number) => {
        if (!loaded || !canvasRef.current || !sprites || sprites.length === 0) return;

        // Ensure index is within bounds and rounded safely
        const safeIndex = Math.min(Math.max(0, Math.round(index)), frameCount - 1);

        // Calculate which of the 8 sheets this frame belongs to
        const FRAMES_PER_SHEET = 24;
        const sheetIndex = Math.floor(safeIndex / FRAMES_PER_SHEET);
        const localIndex = safeIndex % FRAMES_PER_SHEET;

        const sprite = sprites[sheetIndex];
        if (!sprite) return;

        // Find the specific coordinate box on the Sprite Sheet
        // Assumes a 4-column grid and 1000x563 original frame sizes based on the build script
        const COLUMNS = 4;
        const SOURCE_WIDTH = 1000;
        const SOURCE_HEIGHT = 563;

        const col = localIndex % COLUMNS;
        const row = Math.floor(localIndex / COLUMNS);
        const sourceX = col * SOURCE_WIDTH;
        const sourceY = row * SOURCE_HEIGHT;

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

        // Draw background fallback if needed
        ctx.fillStyle = fallbackColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratio preserving dimensions showing full image (cover)
        // We use the SOURCE clip dimensions rather than the massive sprite dimensions
        const imgRatio = SOURCE_WIDTH / SOURCE_HEIGHT;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        // Opt target mobile width: use 'contain' behavior to avoid cropping.
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // CONTAIN logic (fits the whole image within the canvas without cropping sides)
            if (canvasRatio > imgRatio) {
                // Canvas is wider than image
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                // Canvas is taller than image (typical mobile)
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            }
        } else {
            // COVER logic (laptop/desktop behavior - fills whole canvas, crops overflow)
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
        }

        // Draw the specific cropped frame from the sprite sheet onto the canvas
        ctx.drawImage(
            sprite,
            sourceX, sourceY, SOURCE_WIDTH, SOURCE_HEIGHT,
            Math.round(offsetX), Math.round(offsetY), Math.round(drawWidth), Math.round(drawHeight)
        );
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
