import { useState, useEffect, useRef } from "react";

interface UseImageSequenceProps {
    frameCount: number;
    folderPath: string;
    prefix?: string;
    extension?: string;
    indexPadding?: number;
}

export function useImageSequence({
    frameCount,
    folderPath,
    prefix = "frame_",
    extension = "webp",
    indexPadding = 4,
}: UseImageSequenceProps) {
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;

        // Initialize or clear the tracking buffer
        imagesRef.current = new Array(frameCount);

        const loadImage = (index: number, isPriority: boolean = false): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                const paddedIndex = (index + 1).toString().padStart(indexPadding, "0");
                img.src = `${folderPath}/${prefix}${paddedIndex}.${extension}`;

                // Heavily deprioritize backfill frames, prioritize the initial keyframes
                if (!isPriority && 'fetchPriority' in img) {
                    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
                } else if (isPriority && index < 20 && 'fetchPriority' in img) {
                    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
                }

                img.onload = () => {
                    if (!isMounted) return resolve();
                    loadedCount++;
                    imagesRef.current[index] = img;

                    setProgress(Math.round((loadedCount / frameCount) * 100));

                    // Instantly unlock the UI loader so user can start scrolling once the top buffer is filled!
                    if (loadedCount >= Math.min(10, frameCount) && !loaded) {
                        setLoaded(true);
                    }
                    resolve();
                };

                img.onerror = () => {
                    if (!isMounted) return resolve();
                    console.warn(`Failed to load frame: ${img.src}`);
                    loadedCount++;
                    if (loadedCount >= Math.min(10, frameCount) && !loaded) {
                        setLoaded(true);
                    }
                    resolve();
                };
            });
        };

        // Two-pass loading strategy for remote CDNs (Vercel) with Strict Concurrency Limits
        const loadAllAsyncQueue = async () => {
            const KEYFRAME_GAP = 8; // Load every 8th frame first
            const CONCURRENCY = 4;  // Max 4 parallel network requests to prevent browser choking

            // Pass 1: Keyframes
            for (let i = 0; i < frameCount; i += KEYFRAME_GAP * CONCURRENCY) {
                if (!isMounted) break;
                const batch = [];
                for (let j = 0; j < CONCURRENCY && (i + j * KEYFRAME_GAP) < frameCount; j++) {
                    batch.push(loadImage(i + j * KEYFRAME_GAP, true));
                }
                await Promise.all(batch);
                // Tiny yield
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            // Pass 2: Backfill
            for (let i = 0; i < frameCount; i += CONCURRENCY) {
                if (!isMounted) break;
                const batch = [];
                for (let j = 0; j < CONCURRENCY && (i + j) < frameCount; j++) {
                    const idx = i + j;
                    if (idx % KEYFRAME_GAP !== 0) {
                        batch.push(loadImage(idx, false));
                    }
                }
                if (batch.length > 0) {
                    await Promise.all(batch);
                }
                // Yield more aggressively during backfill to keep main thread completely free
                await new Promise(resolve => setTimeout(resolve, 5));
            }
        };

        if (frameCount > 0) {
            loadAllAsyncQueue();
        }

        return () => {
            isMounted = false;
        };
    }, [frameCount, folderPath, prefix, extension, indexPadding]); // We deliberately removed `loaded` from deps

    return { images: imagesRef.current, loaded, progress };
}
