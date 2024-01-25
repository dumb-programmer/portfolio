"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { logout } from "../lib/actions";


export default function LogoutButton() {
    return <button onClick={async () => {
        await logout();
    }} className="absolute bottom-5 right-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-purple-600 text-fuchsia-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm cursor-pointer hover:bg-purple-500 h-9 min-w-24 px-4 py-2">
        <ArrowLeftStartOnRectangleIcon height={20} width={20} />
        Logout
    </button>
}