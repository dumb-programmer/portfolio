"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    TableMeta,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Project } from "@/app/lib/types";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditModal from "./EditModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateModal from "./CreateModal";

export function DataTable<TValue>({
    columns,
    data,
    addProject,
    editProject,
    deleteProject,
}: { columns: ColumnDef<Project, TValue>[], data: Project[], addProject: (project: Project) => void, editProject: (project: Project) => void, deleteProject: (id: string) => void }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>();
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
        meta: {
            setProjectId: (id: string) => {
                setSelectedProjectId(id)
            },
        }
    });

    return (
        <>
            <div className="h-full flex flex-col gap-2">
                <div className="flex items-center">
                    <input
                        placeholder="Filter Name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="min-w-full border border-gray-200 p-2 rounded-md"
                    />
                </div>
                <div className="flex justify-end"><button className="flex justify-center items-center rounded-full text-fuchsia-50 text-sm bg-purple-600 p-2 min-w-36 gap-2 transition-colors hover:bg-purple-500" onClick={() => setShowCreateProjectModal(true)}><PlusIcon height={20} width={20} color="#fff" /> Add Project</button></div>
                <div className="rounded-md border h-5/6 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="cursor-pointer transition-shadow hover:shadow-[0_0_6px_2px_rgba(0,0,0,0.3)]"
                                        onClick={() => setSelectedProject(row.original)}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DeleteConfirmationModal projectId={selectedProjectId} onClose={() => setSelectedProjectId(undefined)} onSuccess={deleteProject} />
            <EditModal project={selectedProject} onClose={() => setSelectedProject(undefined)} onSuccess={(project: Project) => {
                editProject(project);
                setSelectedProject(undefined);
            }} />
            <CreateModal open={showCreateProjectModal} onClose={() => setShowCreateProjectModal(false)} onSuccess={(project) => {
                addProject(project)
                setShowCreateProjectModal(false);
            }} />
        </>
    )
}
