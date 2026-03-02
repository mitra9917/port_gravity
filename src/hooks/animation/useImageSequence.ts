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

        const loadImage = (index: number) => {
            const img = new Image();
            const paddedIndex = (index + 1).toString().padStart(indexPadding, "0");
            img.src = `${folderPath}/${prefix}${paddedIndex}.${extension}`;

            // Heavily deprioritize loading for off-screen end frames to unlock network threads
            if (index > 25 && 'fetchPriority' in img) {
                (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
            }

            img.onload = () => {
                if (!isMounted) return;
                loadedCount++;
                imagesRef.current[index] = img;

                setProgress(Math.round((loadedCount / frameCount) * 100));

                // Instantly unlock the UI loader so user can start scrolling once the top buffer is filled!
                if (loadedCount >= Math.min(10, frameCount) && !loaded) {
                    setLoaded(true);
                }
            };

            img.onerror = () => {
                if (!isMounted) return;
                console.warn(`Failed to load frame: ${img.src}`);
                loadedCount++;
                if (loadedCount >= Math.min(10, frameCount) && !loaded) {
                    setLoaded(true);
                }
            };
        };

        const loadAllAsyncQueue = async () => {
            for (let i = 0; i < frameCount; i++) {
                if (!isMounted) break;
                loadImage(i);

                // Yield to main thread every 4 requests to completely prevent browser freezes
                if (i % 4 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
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
