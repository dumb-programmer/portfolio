import { CodeBracketIcon, InboxIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { countNewMessages } from "../lib/data";

export default async function Sidebar() {
    const count = await countNewMessages();

    return <aside className="bg-purple-400 p-10">
        <ul className="flex flex-col gap-4">
            <li>
                <Link className="flex items-center gap-2 relative" href="/admin/dashboard">
                    <InboxIcon height={24} width={24} />
                    Messages {count > 0 && <span className="absolute top-[-8px] left-3 text-xs flex justify-center items-center bg-red-400 rounded-3xl h-4 w-4 text-fuchsia-50">{count}</span>}
                </Link>
            </li>
            <li>
                <Link className="flex items-center gap-2" href="/admin/dashboard/projects">
                    <CodeBracketIcon height={24} width={24} />
                    Projects
                </Link>
            </li>
        </ul>
    </aside>;
}