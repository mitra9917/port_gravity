"use client";

import { type MotionValue } from "framer-motion";
import { HeroOverlay } from "@/components/hero/HeroOverlay";
import { HeroTerminal } from "@/components/hero/HeroTerminal";
import { HeroKeyAtmosphere } from "@/components/hero/HeroKeyAtmosphere";
import { HeroDigitalWorld } from "@/components/hero/HeroDigitalWorld";

export function HeroStage({ progress }: { progress: MotionValue<number> }) {
    return (
        <>
            <HeroKeyAtmosphere progress={progress} />
            <HeroDigitalWorld progress={progress} />
            <HeroOverlay progress={progress} />
            <HeroTerminal progress={progress} />
        </>
    );
}
