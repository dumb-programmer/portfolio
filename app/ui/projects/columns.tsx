"use client"

import { Project } from "@/app/lib/types"
import { ArrowDownIcon, ArrowUpIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "preview",
        header: "Preview",
        cell: (row) => {
            return <Image src={row.getValue() as string} height={100} width={200} alt="" />
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return <button className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Title
                {
                    column.getIsSorted() === "desc" || column.getIsSorted() === false ? <ArrowUpIcon height={10} width={10} /> : <ArrowDownIcon height={10} width={10} />
                }
            </button>
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "actions",
        cell: () => <div className="flex gap-4">
            <button className="hover:bg-gray-200 p-2 rounded-lg transition-colors"><PencilIcon height={15} width={15} /></button>
            <button className="hover:bg-gray-200 p-2 rounded-lg transition-colors"><TrashIcon height={15} width={15} /></button>
        </div>
    }
]
