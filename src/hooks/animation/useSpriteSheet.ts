import { useState, useEffect, useRef } from "react";

interface UseSpriteSheetsProps {
    folderPath: string;
    sheetCount: number;
}

export function useSpriteSheet({ folderPath, sheetCount }: UseSpriteSheetsProps) {
    const spritesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        let loadedCount = 0;
        spritesRef.current = new Array(sheetCount);

        const loadSheet = (index: number) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = `${folderPath}/hero-sequence-sprite-${index}.jpeg`;

                // Prioritize the first sheet so the animation can start immediately
                if (index === 0 && 'fetchPriority' in img) {
                    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
                } else if ('fetchPriority' in img) {
                    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
                }

                img.onload = () => {
                    if (!isMounted) return resolve();
                    loadedCount++;
                    spritesRef.current[index] = img;

                    setProgress(Math.round((loadedCount / sheetCount) * 100));

                    // Unlock the UI loader instantly when the first sheet (Frames 1-24) is buffered!
                    if (index === 0 && !loaded) {
                        setLoaded(true);
                    }
                    resolve();
                };

                img.onerror = () => {
                    if (!isMounted) return resolve();
                    console.warn(`Failed to load sprite sheet part: ${img.src}`);
                    loadedCount++;
                    resolve();
                };
            });
        };

        const loadAll = async () => {
            // Guarantee the first sheet loads immediately to unlock user scrolling
            await loadSheet(0);

            // Backfill the remaining 7 sheets in parallel without freezing
            if (isMounted) {
                const remainder = [];
                for (let i = 1; i < sheetCount; i++) {
                    remainder.push(loadSheet(i));
                }
                await Promise.all(remainder);
            }
        };

        loadAll();

        return () => {
            isMounted = false;
        };
    }, [folderPath, sheetCount]);

    return { sprites: spritesRef.current, loaded, progress };
}
