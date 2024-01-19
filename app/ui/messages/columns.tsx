"use client"

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Message = {
    id: string
    name: string
    email: string
    message: string
    isNew: boolean
    timestamp: Date
}

export const columns: ColumnDef<Message>[] = [
    {
        accessorKey: "timestamp",
        header: "",
        cell: ({ row }) => {
            const time = new Intl.DateTimeFormat("en-PK", { hour: "numeric", minute: "numeric" }).format(row.getValue("timestamp"));
            const date = new Intl.DateTimeFormat("en-PK", { dateStyle: "short" }).format(row.getValue("timestamp"));
            return <>{time} - {date}</>
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <button className="flex items-center gap-2" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Name
                {
                    column.getIsSorted() === "desc" || column.getIsSorted() === false ? <ArrowUpIcon height={10} width={10} /> : <ArrowDownIcon height={10} width={10} />
                }
            </button>
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "message",
        header: "Message",
    },
]
