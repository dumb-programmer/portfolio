import { Message, columns } from "@/app/ui/messages/columns";
import { DataTable } from "@/app/ui/messages/data-table";
import { db } from "@/firebase";
import { Timestamp, collection, getDocs, orderBy, query } from "firebase/firestore";

async function getData(): Promise<Message[]> {
    const docs = await getDocs(query(collection(db, "Messages"), orderBy("timestamp", "desc")));
    return docs.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: (doc.data().timestamp as Timestamp).toDate() })) as Message[];
}

export default async function Page() {
    const data = await getData();
    return <DataTable columns={columns} data={data} />;
}