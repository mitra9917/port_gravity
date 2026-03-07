'use client';

import { useState, useEffect } from 'react';

export type TimeTheme = 'morning' | 'afternoon' | 'golden-hour' | 'night';

export const useTimeTheme = () => {
    const [theme, setTheme] = useState<TimeTheme>('night');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const determineTheme = (): TimeTheme => {
            const hour = new Date().getHours();

            if (hour >= 6 && hour < 12) {
                return 'morning';
            } else if (hour >= 12 && hour < 16) {
                return 'afternoon';
            } else if (hour >= 16 && hour < 19) {
                return 'golden-hour';
            } else {
                return 'night';
            }
        };

        setTheme(determineTheme());

        const interval = setInterval(() => {
            setTheme(determineTheme());
        }, 1000 * 60 * 5); // check every 5 mins

        return () => clearInterval(interval);
    }, []);

    return { theme, mounted };
};
