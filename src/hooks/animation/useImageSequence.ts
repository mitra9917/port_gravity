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
                    resolve(new Image());
                };
            });
        };

        const loadAllImages = async () => {
            const promises = [];
            for (let i = 0; i < frameCount; i++) {
                promises.push(loadImage(i));
            }

            await Promise.all(promises);

            if (isMounted) {
                setImages([...loadedImages]);
                setLoaded(true); // Only signal ready when EVERY image is buffered in memory
            }
        };

        if (frameCount > 0) {
            loadAllImages();
        }

        return () => {
            isMounted = false;
            // Note: Full memory collection of 190 Image objects will happen
            // when the component unmounts and references are dropped automatically.
        };
    }, [frameCount, folderPath, prefix, extension, indexPadding]);

    return { images, loaded, progress };
}
