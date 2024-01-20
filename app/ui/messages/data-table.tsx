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
import MessageModal from "./MessageModal"
import { Message } from "./columns"
import clsx from "clsx"

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }

export function DataTable<TValue>({
    columns,
    data,
    markRowAsRead
}: { columns: ColumnDef<Message, TValue>[], data: Message[], markRowAsRead: (id: string) => void }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message>();

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
        }
    })

    return (
        <>
            <div className="h-full">
                <div className="flex items-center py-4">
                    <input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
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
                                        data-state={row.getIsSelected() && "selected"}
                                        className={clsx("cursor-pointer transition-shadow hover:shadow-[0_0_6px_2px_rgba(0,0,0,0.3)]", row.original.isNew && "bg-green-200 hover:bg-green-200")}
                                        onClick={() => {
                                            setSelectedMessage(row.original)
                                            if (row.original.isNew) {
                                                fetch(`${process.env.NEXT_PUBLIC_API}/messages/${row.original.id}`, { method: "POST", body: JSON.stringify({ isNew: false }) });
                                                markRowAsRead(row.original.id);
                                            }
                                        }}
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
            <MessageModal open={selectedMessage !== undefined} message={selectedMessage} onClose={() => setSelectedMessage(undefined)} />
        </>
    )
}
