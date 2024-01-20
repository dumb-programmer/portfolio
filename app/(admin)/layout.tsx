import Sidebar from '../ui/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="h-screen min-w-screen flex overflow-hidden">
        <Sidebar/>
        <main className="p-5 flex-1 overflow-y-auto">
            {children}
        </main>
    </div>
}