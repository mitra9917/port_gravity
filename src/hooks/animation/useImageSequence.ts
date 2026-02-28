import { useState, useEffect } from "react";

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
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = new Array(frameCount);

        const loadImage = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve) => {
                const img = new Image();
                const paddedIndex = (index + 1).toString().padStart(indexPadding, "0");
                img.src = `${folderPath}/${prefix}${paddedIndex}.${extension}`;

                // Use fetchpriority for modern browsers to deprioritize later frames
                if (index > 10 && 'fetchPriority' in img) {
                    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
                }

                img.onload = () => {
                    loadedCount++;
                    loadedImages[index] = img;
                    if (isMounted) {
                        setProgress(Math.round((loadedCount / frameCount) * 100));
                    }
                    resolve(img);
                };

                img.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}, using empty fallback.`);
                    // Resolve with dummy image to prevent sequence failure
                    resolve(new Image());
                };
            });
        };

        const loadImagesOptimized = async () => {
            // Chunk 1: The first 5 frames are critical to show the initial state immediately
            const initialPromises = [];
            for (let i = 0; i < Math.min(5, frameCount); i++) {
                initialPromises.push(loadImage(i));
            }
            await Promise.all(initialPromises);

            if (!isMounted) return;

            // We can start rendering as soon as the first few images are ready!
            setImages([...loadedImages]);
            setLoaded(true); // Signal readiness early to improve First Contentful Paint (FCP)

            // Chunk 2: Load the rest in smaller batches so we don't block the main thread
            // or overwhelm the network queue, allowing interaction to remain smooth.
            const batchSize = 10;
            for (let i = 5; i < frameCount; i += batchSize) {
                if (!isMounted) return;

                const batchPromises = [];
                for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
                    batchPromises.push(loadImage(j));
                }
                await Promise.all(batchPromises);

                // Update images array cautiously without causing too many React re-renders
                if (isMounted) {
                    setImages([...loadedImages]);
                }

                // Yield to main thread
                await new Promise(r => setTimeout(r, 10));
            }
        };

        if (frameCount > 0) {
            loadImagesOptimized();
        }

        return () => {
            isMounted = false;
            // Note: Full memory collection of 190 Image objects will happen
            // when the component unmounts and references are dropped automatically.
        };
    }, [frameCount, folderPath, prefix, extension]);

    return { images, loaded, progress };
}
