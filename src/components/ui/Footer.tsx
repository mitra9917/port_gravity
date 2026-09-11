import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto w-full border-t border-white/[0.06] py-8">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    © {currentYear} Shubham
                </div>

                <div className="flex items-center gap-5">
                    <Link href="https://github.com/mitra9917" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-4 w-4" />
                    </Link>
                    <Link href="https://x.com/mitra9917" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-4 w-4" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/shubham-kumar-mitra-335626336/" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-foreground">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
