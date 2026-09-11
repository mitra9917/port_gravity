/** Subtle accent gradients per project — used in preview atmospheres */
export const PROJECT_ACCENTS = [
    { from: "#6366f1", to: "#a855f7", glow: "rgba(99, 102, 241, 0.35)" },
    { from: "#22d3ee", to: "#3b82f6", glow: "rgba(34, 211, 238, 0.28)" },
    { from: "#f97316", to: "#ef4444", glow: "rgba(249, 115, 22, 0.3)" },
    { from: "#34d399", to: "#14b8a6", glow: "rgba(52, 211, 153, 0.28)" },
    { from: "#e2e8f0", to: "#94a3b8", glow: "rgba(226, 232, 240, 0.18)" },
] as const;

export function getProjectAccent(index: number) {
    return PROJECT_ACCENTS[index % PROJECT_ACCENTS.length];
}
