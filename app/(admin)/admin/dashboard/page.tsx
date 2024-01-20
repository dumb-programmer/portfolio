import { getMessages } from "@/app/lib/data";
import MessagesTable from "@/app/ui/messages/MesssagesTable";

export default async function Page() {
    const data = await getMessages();
    return <MessagesTable initialData={data}/>;
}