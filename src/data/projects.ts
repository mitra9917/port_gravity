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
        slug: "sports_companion",
        title: "Sports Companion",
        description: "A full-stack sports insights platform with AI-assisted analysis and real-time data presentation.",
        techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "API Integration", "Basic AI"],
        liveUrl: "https://sports-companion-app.vercel.app/",
        codeUrl: "https://github.com/mitra9917/sports-companion-app",
        overview: {
            problem: "Many fitness and sports enthusiasts rely on multiple disconnected apps to track workouts, monitor BMI, set goals, and analyze progress. Existing solutions are often cluttered, lack personalization, or fail to present progress data in a clear and motivating way.",
            solution: "Sports Companion App provides a single, clean platform to log workouts, track BMI, manage fitness goals, and visualize progress through analytics dashboards. It focuses on clarity, usability, and meaningful data presentation to help users stay consistent and informed about their fitness journey.",
            purpose: "This project was built to strengthen my full-stack development skills by designing a real-world fitness application that spans authentication, database design, UI/UX, analytics visualization, and deployment—while solving a genuine personal fitness tracking problem."
        },
        technical: {
            architecture: "Frontend built using Next.js App Router with reusable, component-driven UI;Supabase Authentication for secure user sign-up and login;PostgreSQL (Supabase) for structured storage of workouts, BMI records, goals, and profiles; Client-side and server-side data fetching for dashboards and analytics; Data visualization using charts for BMI trends, workout distribution, and progress tracking; clean separation between UI components, business logic, and data access layers",
            challenges: "One of the main challenges was designing a database schema that could handle workouts, goals, and BMI records while maintaining data consistency and integrity. Another challenge was presenting analytics in a way that was visually appealing without overwhelming the user."
        },
        outcome: {
            achieved: "Built a complete end-to-end full-stack fitness application; Gained hands-on experience with Supabase Auth, PostgreSQL, and relational data modeling; Implemented real-time fitness analytics and progress visualization; Successfully deployed and maintained a production-ready web application; Improved understanding of scalable UI design and state-driven dashboards",
            relevance: "Fitness and health tracking platforms; Data-driven dashboards and analytics applications; SaaS products with authentication and personalized user data; Full-stack web applications requiring structured data, analytics, and clean UI/UX"
        }
    }, {
        slug: "vision_badminton_engine",
        title: "Vision‑Based Badminton Game Engine",
        description: "A real-time badminton game engine controlled via computer vision, featuring hand-tracked shot detection, AI-driven rallies, and a ground‑view 2.5D court with realistic gameplay mechanics.",
        techStack: [
            "Python",
            "OpenCV",
            "MediaPipe",
            "Computer Vision",
            "Game State Machines",
            "AI Logic"
        ],
        liveUrl: "",
        codeUrl: "https://github.com/mitra9917/badminton-ai-engine",
        overview: {
            problem: "Most sports games rely on traditional controllers and lack realistic physical interaction, while vision-based sports simulations often fail to provide responsive gameplay or believable spatial depth.",
            solution: "This engine enables players to control a badminton game using real-time hand movements, translating physical gestures into shot types and rallies within a ground‑view perspective court.",
            purpose: "The project was built to explore the intersection of computer vision, game engines, and AI-driven interaction by simulating a real sport with gesture-based controls and intelligent opponents."
        },
        technical: {
            architecture: "A modular Python game loop with OpenCV rendering, MediaPipe-based hand tracking for input, a state-driven game engine for rallies, and rule-based AI for opponent behavior, cleanly separating logic, input, and visuals.",
            challenges: "Key challenges included stabilizing noisy vision input, synchronizing gesture detection with game states, preventing unrealistic shuttle behavior, and achieving a convincing ground‑view perspective without a full 3D engine."
        },
        outcome: {
            achieved: "Built a fully playable vision-controlled badminton engine; implemented shot classification, AI rallies, and skill-based catching; designed a 2.5D ground‑view court with perspective, net height illusion, and mesh rendering.",
            relevance: "Computer vision–driven games; AI-assisted sports simulations; gesture-controlled interfaces; real-time interactive systems; foundations for future full‑3D sports game development."
        }
    }, {
        slug: "breathe_map",
        title: "Breathe Map: ML‑Driven Urban AQI Analytics & Simulation",
        description: "A full-stack air quality analytics platform that models zone-level AQI using trained ML inference, visualizes city-wise pollution patterns on an interactive map, and runs intervention simulations with persistent results in Supabase.",
        techStack: [
            "Next.js",
            "TypeScript",
            "Supabase (Postgres + RLS)",
            "Python",
            "scikit-learn",
            "Leaflet",
            "Vercel"
        ],
        liveUrl: "https://breathe-map-w.vercel.app",
        codeUrl: "https://github.com/mitra9917/breathe-map",
        overview: {
            problem: "Urban air quality data is often fragmented and hard to interpret at local zone level, while most dashboards do not provide actionable what-if analysis for interventions.",
            solution: "Breathe Map combines city-scoped zone management, ML-based AQI estimation, and simulation workflows to let users understand current conditions and test potential traffic/green-cover interventions before real-world action.",
            purpose: "The project was built to bridge frontend geospatial visualization, backend data reliability, and practical ML inference in one end-to-end decision-support system for air quality planning."
        },
        technical: {
            architecture: "A Next.js app-router frontend consumes API routes backed by Supabase tables (`cities`, `zones`, `aqi_estimates`, `simulation_scenarios`, `simulation_results`). The backend performs model inference via Python/scikit-learn artifacts, stores predictions with model metadata, and enforces city-scoped querying and relational integrity.",
            challenges: "Major challenges included replacing legacy mock pipelines with live DB+ML flows, handling deployment-time inference constraints, preventing single-zone inference failures from cascading into API 500s, and maintaining consistent city-scoped behavior across dashboard, zones, analysis, and simulation routes."
        },
        outcome: {
            achieved: "Implemented end-to-end Supabase-backed CRUD and analytics; integrated ML prediction and simulation persistence; removed runtime mock dependencies; validated zone creation, AQI estimation, clustering/correlation analysis, and simulation writes across frontend and database.",
            relevance: "Environmental analytics dashboards; geospatial decision systems; ML-in-production web apps; scenario planning tools; robust full-stack architecture with typed APIs and persistent auditability."
        }
    }, {
        slug: "port_gravity",
        title: "Port Gravity",
        description: "A high-performance interactive portfolio framework featuring native scroll storytelling.",
        techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Canvas API"],
        liveUrl: "https://port-gravity.vercel.app/",
        codeUrl: "https://github.com/mitra9917/port_gravity",
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
