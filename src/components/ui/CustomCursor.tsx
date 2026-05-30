"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[data-cursor='interactive']",
].join(",");

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 450, damping: 34, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 34, mass: 0.4 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldEnable = finePointer.matches && !reducedMotion.matches;

    setIsEnabled(shouldEnable);
    document.documentElement.classList.toggle("custom-cursor-enabled", shouldEnable);

    if (!shouldEnable) {
      return () => {
        document.documentElement.classList.remove("custom-cursor-enabled");
      };
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
      setIsInteractive(Boolean((event.target as Element | null)?.closest(interactiveSelector)));
    };

    const handlePointerLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [cursorX, cursorY]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-white/70"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isInteractive ? 56 : 32,
          height: isInteractive ? 56 : 32,
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 1.08 : 1,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.75)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 0.45 : 1,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </div>
  );
}
