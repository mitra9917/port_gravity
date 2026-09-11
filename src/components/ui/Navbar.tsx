"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/research", label: "Research" },
    { href: "/skills", label: "Skills" },
    { href: "/lab", label: "Lab" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isLightPage = pathname === "/skills" || pathname === "/lab";
    const isSolidNav = isScrolled;
    const useBlendNav = isHome && !isScrolled;
    const useLightNavText = isLightPage && !isScrolled;

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textPrimary = useLightNavText
        ? "text-zinc-900"
        : isSolidNav || !useBlendNav
          ? "text-foreground"
          : "text-white";
    const textSecondary = useLightNavText
        ? "text-zinc-500"
        : isSolidNav || !useBlendNav
          ? "text-muted"
          : "text-white/80";
    const textHover = useLightNavText
        ? "hover:text-zinc-700"
        : isSolidNav || !useBlendNav
          ? "hover:text-foreground"
          : "hover:text-white";
    const underline = useLightNavText
        ? "bg-zinc-900/70"
        : isSolidNav || !useBlendNav
          ? "bg-foreground/70"
          : "bg-white/70";
    const statusDot = useLightNavText
        ? "bg-zinc-700"
        : isSolidNav || !useBlendNav
          ? "bg-foreground/75"
          : "bg-white/75";

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-premium",
                    isSolidNav
                        ? "border-b border-white/[0.06] bg-background/90 py-3 backdrop-blur-md"
                        : useLightNavText
                          ? "border-b border-[#E3E0DA]/80 bg-white/85 py-5 backdrop-blur-md"
                          : "bg-transparent py-5"
                )}
            >
                <div
                    className={cn(
                        "relative mx-auto grid max-w-7xl grid-cols-2 items-center px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8",
                        useBlendNav && "mix-blend-difference"
                    )}
                >
                    <Link
                        href="/"
                        aria-label="Shubham — home"
                        className="z-50 inline-flex items-center"
                    >
                        <Logo variant={useLightNavText && !isSolidNav ? "light" : "dark"} />
                    </Link>

                    <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                                        isActive ? textPrimary : cn(textSecondary, textHover)
                                    )}
                                    aria-current={isActive ? "page" : undefined}
                                >
                                    {link.label}
                                    <span
                                        className={cn(
                                            "absolute -bottom-1 left-0 h-px w-full origin-left transition-transform duration-300 ease-premium",
                                            underline,
                                            isActive ? "scale-x-100" : "scale-x-0"
                                        )}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center justify-end gap-5 lg:flex">
                        <p
                            className={cn(
                                "hidden items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] lg:flex",
                                isSolidNav || !useBlendNav ? "text-muted" : "text-white/80"
                            )}
                        >
                            <span className={cn("h-1.5 w-1.5 rounded-full", statusDot)} aria-hidden />
                            Available
                        </p>
                        <Link
                            href="/contact"
                            className={cn(
                                "text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                                textPrimary,
                                textHover
                            )}
                        >
                            Let&apos;s Talk ↗
                        </Link>
                    </div>

                    <button
                        className={cn(
                            "z-50 justify-self-end p-2 transition-colors lg:hidden",
                            textPrimary,
                            textHover
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </header>

            <div
                className={cn(
                    "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background transition-opacity duration-300 lg:hidden",
                    isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                )}
            >
                {navLinks.map((link, index) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "text-2xl font-medium tracking-tight text-foreground transition-all duration-300",
                            isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                        )}
                        style={{ transitionDelay: `${index * 60}ms` }}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </>
    );
}
