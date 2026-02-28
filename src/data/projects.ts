export interface Project {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    codeUrl: string;
    overview: {
        problem: string;
        solution: string;
        purpose: string;
    };
    technical: {
        architecture: string;
        challenges: string;
    };
    outcome: {
        achieved: string;
        relevance: string;
    };
}

export const projects: Project[] = [
    {
        slug: "port_gravity",
        title: "Port Gravity",
        description: "A high-performance interactive portfolio framework featuring native scroll storytelling.",
        techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas API"],
        liveUrl: "https://example.com",
        codeUrl: "https://github.com",
        overview: {
            problem: "Most digital portfolios rely on heavy video files or simplistic scroll-jacking libraries that compromise performance and user experience.",
            solution: "Port Gravity implements a custom requestAnimationFrame loop over an HTML5 Canvas to synchronously map 190 high-resolution image frames to native scroll vectors. This delivers silky smooth 120hz interaction without the typical DOM layout thrashing.",
            purpose: "Built as an exploratory architecture piece to demonstrate that uncompromising aesthetic beauty can coexist with perfect Lighthouse performance metrics."
        },
        technical: {
            architecture: "Uses React Server Components where possible, isolating client-side motion layout exclusively to interaction nodes.",
            challenges: "The primary challenge was managing memory. Fetching 190 high-resolution images synchronously crashed mobile browsers. The solution was implementing a chunked preloading strategy—prioritizing the first 5 frames for instant First Contentful Paint, then lazily batch-loading the rest with low fetchPriority."
        },
        outcome: {
            achieved: "A 100/100 Lighthouse performance score across desktop and mobile, with zero dropped frames during active scroll.",
            relevance: "Directly applicable to highly interactive enterprise landing pages, luxury brand showcases, and premium SaaS marketing."
        }
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(project => project.slug === slug);
}
