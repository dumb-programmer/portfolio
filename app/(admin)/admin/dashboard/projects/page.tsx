import { getProjects } from "@/app/lib/data";
import ProjectsTable from "@/app/ui/projects/ProjectsTable";

export default async function Page() {
    const data = await getProjects();
    return <ProjectsTable initialData={data}/>;
}