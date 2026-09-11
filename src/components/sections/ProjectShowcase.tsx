"use client";

import { projects } from "@/data/projects";
import { ProjectSpotlight } from "@/components/projects/ProjectSpotlight";

const headline = "Ideas shipped to reality.";

export function ProjectShowcase() {
    return (
        <ProjectSpotlight
            projects={projects}
            kicker="02 / PROJECTS"
            title={headline}
            subtitle="Hover the index to preview each build — full case studies with architecture notes, live demos, and source."
        />
    );
}
