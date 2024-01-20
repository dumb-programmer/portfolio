"use client";

import { useState } from "react";
import { Message, columns } from "./columns";
import { DataTable } from "./data-table";

export default function MessagesTable({ initialData }: { initialData: Message[] }) {
    const [data, setData] = useState(initialData);
    return <DataTable data={data} columns={columns} markRowAsRead={(id: string) => {
        setData(messages => {
            const newData: Message[] = [];
            for (const message of messages) {
                if (message.id === id) {
                    message.isNew = false;
                }
                newData.push(message);
            }
            return newData;
        })
    }} />;
}