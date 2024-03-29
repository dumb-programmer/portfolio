import { getProjects } from "@/app/lib/data";
import ProjectsList from "@/app/ui/ProjectsList";

export default async function Page() {
    const projects = await getProjects();
    return <main className="p-24 flex justify-center items-center"><ProjectsList projects={projects} /></main>
}