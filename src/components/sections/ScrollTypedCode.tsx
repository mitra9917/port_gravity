"use client";

import { useEffect, useMemo, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type CodeToken = { text: string; className: string };

/** VS Code dark+ inspired accents */
export const VS_CODE_COLORS = {
    comment: "text-[#6a9955]",
    keyword: "text-[#569cd6]",
    fn: "text-[#dcdcaa]",
    type: "text-[#4ec9b0]",
    string: "text-[#ce9178]",
    ident: "text-[#9cdcfe]",
    punct: "text-[#d4d4d4]",
    prop: "text-[#9cdcfe]",
    number: "text-[#b5cea8]",
} as const;

const C = VS_CODE_COLORS;

const CODE_TOKENS: CodeToken[] = [
    { text: "// RAG retrieval handler — Averion.ai\n", className: C.comment },
    { text: "async", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "function", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "retrieve", className: C.fn },
    { text: "(", className: C.punct },
    { text: "query", className: C.ident },
    { text: ": ", className: C.punct },
    { text: "string", className: C.type },
    { text: ") {\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "const", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "sanitized", className: C.ident },
    { text: " = ", className: C.punct },
    { text: "sanitizeInput", className: C.fn },
    { text: "(", className: C.punct },
    { text: "query", className: C.ident },
    { text: ")\n\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "if", className: C.keyword },
    { text: " (", className: C.punct },
    { text: "await", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "isPromptInjection", className: C.fn },
    { text: "(", className: C.punct },
    { text: "sanitized", className: C.ident },
    { text: ")) {\n", className: C.punct },
    { text: "    ", className: C.punct },
    { text: "throw", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "new", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "Error", className: C.type },
    { text: "(", className: C.punct },
    { text: '"Blocked prompt pattern"', className: C.string },
    { text: ")\n", className: C.punct },
    { text: "  }\n\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "const", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "embedding", className: C.ident },
    { text: " = ", className: C.punct },
    { text: "await", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "embed", className: C.fn },
    { text: "(", className: C.punct },
    { text: "sanitized", className: C.ident },
    { text: ")\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "const", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "chunks", className: C.ident },
    { text: " = ", className: C.punct },
    { text: "await", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "pgvector", className: C.ident },
    { text: ".", className: C.punct },
    { text: "search", className: C.fn },
    { text: "(", className: C.punct },
    { text: "embedding", className: C.ident },
    { text: ", {\n", className: C.punct },
    { text: "    ", className: C.punct },
    { text: "limit", className: C.prop },
    { text: ": ", className: C.punct },
    { text: "8", className: C.number },
    { text: ",\n", className: C.punct },
    { text: "    ", className: C.punct },
    { text: "threshold", className: C.prop },
    { text: ": ", className: C.punct },
    { text: "0.72", className: C.number },
    { text: ",\n", className: C.punct },
    { text: "  })\n\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "if", className: C.keyword },
    { text: " (!", className: C.punct },
    { text: "chunks", className: C.ident },
    { text: ".", className: C.punct },
    { text: "length", className: C.prop },
    { text: ") {\n", className: C.punct },
    { text: "    ", className: C.punct },
    { text: "return", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "emptyGroundedResponse", className: C.fn },
    { text: "()\n", className: C.punct },
    { text: "  }\n\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "const", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "prompt", className: C.ident },
    { text: " = ", className: C.punct },
    { text: "buildRagPrompt", className: C.fn },
    { text: "(", className: C.punct },
    { text: "sanitized", className: C.ident },
    { text: ", ", className: C.punct },
    { text: "chunks", className: C.ident },
    { text: ")\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "const", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "stream", className: C.ident },
    { text: " = ", className: C.punct },
    { text: "await", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "llm", className: C.ident },
    { text: ".", className: C.punct },
    { text: "generate", className: C.fn },
    { text: "(", className: C.punct },
    { text: "prompt", className: C.ident },
    { text: ")\n\n", className: C.punct },
    { text: "  ", className: C.punct },
    { text: "return", className: C.keyword },
    { text: " ", className: C.punct },
    { text: "groundedAnswer", className: C.fn },
    { text: "(", className: C.punct },
    { text: "stream", className: C.ident },
    { text: ", ", className: C.punct },
    { text: "chunks", className: C.ident },
    { text: ")\n", className: C.punct },
    { text: "}", className: C.punct },
];

const FULL_TEXT = CODE_TOKENS.map((t) => t.text).join("");

function sliceTokens(tokens: CodeToken[], charCount: number): CodeToken[] {
    let remaining = Math.max(0, charCount);
    const out: CodeToken[] = [];

    for (const token of tokens) {
        if (remaining <= 0) break;
        if (token.text.length <= remaining) {
            out.push(token);
            remaining -= token.text.length;
        } else {
            out.push({ text: token.text.slice(0, remaining), className: token.className });
            remaining = 0;
        }
    }

    return out;
}

export function ScrollTypedCode({
    progress,
    start = 0,
    end = 0.24,
    showCursor = true,
    tokens = CODE_TOKENS,
}: {
    progress: MotionValue<number>;
    start?: number;
    end?: number;
    showCursor?: boolean;
    tokens?: CodeToken[];
}) {
    const reduceMotion = usePrefersReducedMotion();
    const totalChars = useMemo(() => tokens.map((t) => t.text).join("").length, [tokens]);
    const [charCount, setCharCount] = useState(reduceMotion ? totalChars : 0);

    useMotionValueEvent(progress, "change", (value) => {
        if (reduceMotion) return;
        const span = end - start;
        const t = span <= 0 ? 0 : Math.max(0, Math.min(1, (value - start) / span));
        setCharCount(Math.round(t * totalChars));
    });

    useEffect(() => {
        if (reduceMotion) {
            setCharCount(totalChars);
        } else {
            setCharCount(0);
        }
    }, [reduceMotion, totalChars]);

    const visible = useMemo(() => sliceTokens(tokens, charCount), [charCount, tokens]);
    const atEnd = charCount >= totalChars;

    return (
        <pre
            className="overflow-x-auto font-mono text-[10px] leading-[1.65] sm:text-[11px] md:text-xs"
            aria-label="RAG retrieval code typing with scroll"
        >
            <code>
                {visible.map((token, index) => (
                    <span key={index} className={token.className}>
                        {token.text}
                    </span>
                ))}
                {showCursor && (
                    <span
                        className={`ml-px inline-block h-[1.1em] w-[7px] translate-y-[2px] bg-[#aeafad] ${
                            atEnd ? "animate-pulse" : ""
                        }`}
                        aria-hidden
                    />
                )}
            </code>
        </pre>
    );
}

export { FULL_TEXT as TYPED_CODE_SNIPPET };
