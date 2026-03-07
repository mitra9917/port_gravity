'use client';

import { useTimeTheme } from '@/hooks/useTimeTheme';
import { useEffect } from 'react';

export function ThemeProvider() {
    const { theme, mounted } = useTimeTheme();

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        root.classList.remove('theme-morning', 'theme-afternoon', 'theme-golden-hour', 'theme-night');
        root.classList.add(`theme-${theme}`);

        // Ensure 'dark' is always present since our premium themes are all dark variants
        if (!root.classList.contains('dark')) {
            root.classList.add('dark');
        }
    }, [theme, mounted]);

    return null; // This component strictly handles side-effects
}
