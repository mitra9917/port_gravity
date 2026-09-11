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
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.25 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.25 });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [label, setLabel] = useState("");

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
      const target = event.target as Element | null;
      const typed = target?.closest("[data-cursor]") as HTMLElement | null;
      const kind = typed?.dataset.cursor;
      if (kind === "view") setLabel("VIEW");
      else if (kind === "open") setLabel("OPEN ↗");
      else setLabel("");
      setIsInteractive(Boolean(kind || target?.closest(interactiveSelector)));
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
        className="fixed left-0 top-0 rounded-full bg-white"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isInteractive ? 14 : 6,
          height: isInteractive ? 14 : 6,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="fixed left-4 top-3 font-mono text-[9px] tracking-[0.18em] text-white"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{ opacity: isVisible && label ? 1 : 0 }}
      >
        {label}
      </motion.div>
    </div>
  );
}
