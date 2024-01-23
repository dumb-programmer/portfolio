"use client";

import { Project } from "@/app/lib/types";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ProjectsTable({ initialData }: { initialData: Project[] }) {
    const [projects, setProjects] = useState(initialData);
    return <DataTable data={projects} columns={columns} deleteProject={(id) => setProjects(projects => projects.filter(project => project.id !== id))} />;
}