"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
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

export function DataTable<TValue>({
    columns,
    data,
    deleteProject,
}: { columns: ColumnDef<Project, TValue>[], data: Project[], deleteProject: (id: string) => void }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>();
    const [selectedProject, setSelectedProject] = useState<Project>();

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
            setProjectId: (id: string) => setSelectedProjectId(id),
        }
    })

    return (
        <>
            <div className="h-full">
                <div className="flex items-center py-4">
                    <input
                        placeholder="Filter Name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="min-w-full border border-gray-200 p-2 rounded-md"
                    />
                </div>
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
            <EditModal project={selectedProject} onClose={() => setSelectedProject(undefined)} onSuccess={(project: Project) => {}} />
        </>
    )
}
