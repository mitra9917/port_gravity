export interface Project {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    /** Optional hero screenshot for project cards (path under /public). */
    previewImage?: string;
    /** CSS object-position for preview framing (default `center`). */
    previewImagePosition?: string;
    /** How the preview fills its frame (default `cover`). */
    previewImageFit?: "cover" | "contain";
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
        slug: "averion_ai",
        title: "Averion.ai",
        description: "A secure RAG platform for uploading internal documents, searching organizational knowledge, and receiving grounded AI answers with source citations.",
        previewImage: "/projects/averion-ai-preview.png",
        previewImageFit: "contain",
        previewImagePosition: "50% 0%",
        techStack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "FastAPI",
            "Supabase",
            "PostgreSQL pgvector",
            "sentence-transformers",
            "Groq/OpenAI"
        ],
        liveUrl: "https://averion-ai.vercel.app/",
        codeUrl: "https://github.com/mitra9917/Averion.ai",
        overview: {
            problem: "Organizations often keep knowledge scattered across PDFs, handbooks, policy documents, and internal notes, making it hard for teams to find reliable answers quickly. Regular chatbots can also hallucinate or expose information without clear source grounding.",
            solution: "Averion.ai provides a secure company knowledge assistant where users can upload documents, run semantic search, and ask questions through a RAG workflow that returns grounded responses with source citations and page-aware references.",
            purpose: "The project was built to explore production-minded AI systems: document ingestion, vector retrieval, organization-level access control, citation enforcement, and feedback loops for improving answer quality."
        },
        technical: {
            architecture: "A monorepo architecture with a Next.js frontend, FastAPI backend, Supabase Auth, Supabase PostgreSQL, and pgvector. Uploaded PDF, TXT, and DOCX files are processed, cleaned, chunked, embedded with sentence-transformers/all-MiniLM-L6-v2, and stored with metadata and vectors. User queries pass through prompt-injection checks, embedding generation, similarity-threshold retrieval, RAG prompt construction, LLM generation through Groq/OpenAI-compatible providers, output filtering, and citation mapping.",
            challenges: "Key challenges included building a secure RAG flow instead of a generic chatbot, enforcing organization isolation for multi-tenant workspaces, blocking prompt-injection patterns, keeping answers grounded in retrieved context, managing document-processing jobs, and designing feedback export for future model evaluation."
        },
        outcome: {
            achieved: "Implemented document upload and processing, semantic vector search, grounded chat with source citations, persistent conversation history, role-based organization workflows, security audit logging, answer feedback, and exportable feedback records for improvement.",
            relevance: "Enterprise knowledge assistants; internal support tools; secure RAG platforms; document intelligence systems; AI products that require citations, access control, and retrieval-backed reliability."
        }
    },
    {
        slug: "pitchground",
        title: "Pitchground",
        description: "Adaptive multilingual communication training that records baseline and pressure takes, detects where speech breaks under interview conditions, and prescribes targeted retry challenges.",
        previewImage: "/projects/pitchground-preview.png",
        previewImageFit: "contain",
        previewImagePosition: "50% 38%",
        techStack: [
            "Next.js",
            "TypeScript",
            "FastAPI",
            "Nhost Postgres",
            "Google OAuth",
            "Sarvam / OpenAI"
        ],
        liveUrl: "https://pitch-ground.vercel.app/",
        codeUrl: "https://github.com/mitra9917/pitchground",
        overview: {
            problem: "Interview and presentation skills often degrade under time limits, interruptions, and code-switching between languages, but most coaching tools give generic feedback instead of pinpointing the exact failure mode in a repeatable loop.",
            solution: "Pitchground runs a structured session: baseline capture, controlled pressure (time limit and interruption), deterministic signal extraction and failure detection, then LLM-assisted diagnosis and a replay challenge on the same knobs so learners compare improvement with evidence chips—not vibes.",
            purpose: "Built to explore production-shaped adaptive training: paired phone/laptop capture, multilingual metrics (English and Hindi in P0), orchestrated session phases, and honest ML boundaries where scores stay deterministic and LLMs only explain or rephrase."
        },
        technical: {
            architecture: "Split monorepo: Next.js frontend on Vercel (`pitch-ground.vercel.app`) and FastAPI backend on Render with Google OAuth, JWT sessions, Nhost Postgres for learners/sessions/attempts, and Nhost storage for attempt media. The orchestrator drives a 13-phase state machine; BackgroundTasks run transcription and signal fusion; WebSocket events keep the coach UI in sync with `advance` lockstep.",
            challenges: "Key challenges included keeping frontend and backend phases aligned without drift, separating deterministic scoring from LLM prose so diagnoses cannot hallucinate new failure types, stubbing ML when APIs are unavailable for demo reliability, and wiring OAuth, CORS, and media upload across local, Vercel, and Render environments."
        },
        outcome: {
            achieved: "Shipped the public landing and demo auth path, deployed frontend and backend with documented env matrices, implemented the adaptive loop architecture (baseline → pressure → diagnose → challenge → compare), and integrated Google sign-in with Nhost-backed persistence for session and media storage.",
            relevance: "Interview prep products; multilingual communication coaching; adaptive learning loops with evidence-backed feedback; full-stack ML-adjacent systems where deterministic metrics and constrained LLM agents must coexist."
        }
    },
    {
        slug: "regenesis",
        title: "RE:GENESIS",
        description: "Adaptive electronics recovery platform—computer vision, BOM completeness audits, RVS-ranked disassembly plans, and KMS-signed Second-Life Passports for enterprise hardware before shredding.",
        previewImage: "/projects/regenesis-preview.png",
        previewImageFit: "contain",
        previewImagePosition: "50% 0%",
        techStack: [
            "React",
            "Vite",
            "AWS Lambda",
            "Step Functions",
            "SageMaker YOLOv8",
            "DynamoDB",
            "KMS"
        ],
        liveUrl: "http://regenesis-dev-uibucket-13iieilvqhoa.s3-website.ap-south-1.amazonaws.com/",
        codeUrl: "https://github.com/mitra9917/ReGenesis",
        overview: {
            problem: "Most e-waste workflows destroy still-valuable GPUs, RAM, and SSDs for bulk metal recovery, with no tamper-evident lineage for secondary markets and opaque environmental claims.",
            solution: "RE:GENESIS treats retired servers and laptops as recoverable products: ingest an interior photo, run hybrid YOLO or catalog-assisted detection, audit BOM completeness, plan teardown with a Reuse Value Score, simulate diagnostics, and issue KMS-signed Second-Life Passports with honest impact ranges.",
            purpose: "Built for Environmental Hacks (Bharat Builds Tour, e-waste track) to demonstrate an end-to-end AWS pipeline—vision, orchestration, cryptography, and operator UI—that judges and operators can trace stage by stage."
        },
        technical: {
            architecture: "React UI on S3 static hosting talks to API Gateway → ingest Lambda → Step Functions `RecoveryFlow` (detect → parse → audit → plan → test → passport → impact). SageMaker serves YOLOv8n with catalog-assisted fallback; Tesseract OCR can confirm model plates; DynamoDB stores devices, components, and events; passports are canonical JSON signed with AWS KMS and verified via API.",
            challenges: "Major challenges included hybrid vision when the SageMaker endpoint is cold or low-confidence, preventing single-zone failures from collapsing the pipeline, keeping a stable nine-class detection schema across training and inference, and deploying a production UI bundle that calls API Gateway directly without a same-origin proxy."
        },
        outcome: {
            achieved: "Delivered the live multi-page UI, full recovery workflow with visible stage progression, passport verify/tamper demo, impact metrics with cited LCA ranges, SageMaker training/serving scripts, and documented demo path for upload → detect → plan → passport → verify.",
            relevance: "Circular economy and ITAD platforms; computer vision on hardware teardown; regulated reuse credentials; Step Functions–style auditable pipelines; hackathon-grade AWS architecture with operable fallbacks."
        }
    },
    {
        slug: "breathe_map",
        title: "Breathe Map: ML‑Driven Urban AQI Analytics & Simulation",
        description: "A full-stack air quality analytics platform that models zone-level AQI using trained ML inference, visualizes city-wise pollution patterns on an interactive map, and runs intervention simulations with persistent results in Supabase.",
        previewImage: "/projects/breathe-map-preview.png",
        previewImageFit: "cover",
        previewImagePosition: "50% 42%",
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
        previewImage: "/projects/port-gravity-preview.png",
        previewImageFit: "cover",
        previewImagePosition: "22% 38%",
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
