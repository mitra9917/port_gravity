import { cn } from "@/lib/utils";

type LogoProps = {
    className?: string;
    /** Light navbar backgrounds need a dark mark */
    variant?: "light" | "dark";
};

/** Canonical brand mark — /public/logo.png */
export function Logo({ className, variant = "dark" }: LogoProps) {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className={cn(
                "h-7 w-auto transition-[opacity,filter] duration-300 ease-premium sm:h-8",
                variant === "light"
                    ? "brightness-0 opacity-[0.82] hover:opacity-100"
                    : "opacity-[0.88] hover:opacity-100 hover:brightness-105",
                className
            )}
        />
    );
}
