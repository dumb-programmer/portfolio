import { CodeBracketIcon, InboxIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { countNewMessages } from "../lib/data";

export default async function Sidebar() {
    const count = await countNewMessages();

    return <aside className="p-10" style={{ backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
        <nav>
            <ul className="flex flex-col gap-8">
                <li>
                    <Link className="flex items-center gap-2 relative p-4 rounded-3xl transition-colors hover:bg-gray-300" href="/admin/dashboard">
                        <InboxIcon height={24} width={24} />
                        Messages {count > 0 && <span className="absolute top-[-8px] left-3 text-xs flex justify-center items-center bg-red-400 rounded-3xl h-4 w-4 text-fuchsia-50">{count}</span>}
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-2 p-4 rounded-3xl transition-colors hover:bg-gray-300" href="/admin/dashboard/projects">
                        <CodeBracketIcon height={24} width={24} />
                        Projects
                    </Link>
                </li>
            </ul>
        </nav>
    </aside>;
}