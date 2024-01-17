import begone_devil from "@/public/begone_devil.jpg";
import Image from "next/image";

export default function Page() {
    return <main className="min-h-screen flex flex-col justify-center items-center gap-4">
        <Image src={begone_devil} width={400} height={300} alt="begone devil meme" />
        <h1 className="text-3xl text-bold">Begone Devil!!</h1>
    </main>
}