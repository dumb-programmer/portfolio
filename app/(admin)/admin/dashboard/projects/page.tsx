import { getProjects } from "@/app/lib/data";
import { columns } from "@/app/ui/projects/columns";
import { DataTable } from "@/app/ui/projects/data-table";

export default async function Page() {
    const data = await getProjects();

    return <DataTable data={data} columns={columns} />;
}