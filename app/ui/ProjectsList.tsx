import { Project } from "../lib/types";
import ProjectItem from "./ProjectItem";

export default function ProjectsList({ projects }: { projects: Project[] }) {
    return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
        {projects.map(project => <ProjectItem key={project.id} project={project} />)}
    </div>
}