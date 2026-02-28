import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 border-t border-white/10 mt-auto backdrop-blur-md bg-background/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-white/50">
                        © {currentYear} Shubham. All rights reserved.
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="https://github.com/mitra9917" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <span className="sr-only">GitHub</span>
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="https://x.com/mitra9917" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/shubham-kumar-mitra-335626336/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
