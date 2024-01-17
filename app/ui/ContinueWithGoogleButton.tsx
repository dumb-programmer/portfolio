"use client";

import google from "@/public/google-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ContinueWithGoogleButton() {
    const router = useRouter();

    return <button className="bg-fuchsia-50 p-2 rounded-md flex items-center gap-4 border border-gray-300 shadow-md" onClick={() => router.push("/api/auth/google")}>
        <Image src={google} width={20} height={20} alt="google" />
        Continue with Google
    </button>
}