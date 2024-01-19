import { CodeBracketIcon, InboxIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen min-w-screen flex overflow-hidden">
        <aside className="bg-purple-400 p-10">
            <ul className="flex flex-col gap-4">
                <li>
                    <Link className="flex items-center gap-2" href="/admin/dashboard">
                        <InboxIcon height={24} width={24} />
                        Messages
                    </Link>
                </li>
                <li>
                    <Link className="flex items-center gap-2" href="/admin/dashboard/projects">
                        <CodeBracketIcon height={24} width={24} />
                        Projects
                    </Link>
                </li>
            </ul>
        </aside>
        <main className="p-5 flex-1 overflow-y-auto">
            {children}
        </main>
    </div>
}