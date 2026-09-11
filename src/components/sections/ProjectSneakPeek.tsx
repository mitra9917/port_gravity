"use client";

import { projects } from "@/data/projects";
import { ProjectSpotlight } from "@/components/projects/ProjectSpotlight";

const FEATURED_SLUGS = ["averion_ai", "breathe_map", "port_gravity", "vision_badminton_engine"] as const;

const featured = FEATURED_SLUGS
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

export function ProjectSneakPeek() {
    return (
        <ProjectSpotlight
            projects={featured}
            kicker="02 / PROJECTS"
            title="Selected work."
            subtitle="A curated slice of what I've shipped — hover to explore, or open the full archive."
            archiveHref="/projects"
            archiveLabel="Explore all projects ↗"
        />
    );
}
