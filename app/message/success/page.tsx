import CheckIcon from "@/app/ui/CheckIcon";

export default function Page() {
    return <main className="min-h-screen pl-20 pr-20 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4 max-w-xl">
            <CheckIcon size={80} />
            <h1 className="text-3xl text-bold text-center">Message Sent Sucessfully</h1>
            <p className="text-gray-600">Your message has been successfully transmitted. We appreciate your communication and will respond promptly. Thank you for reaching out to us.</p>
        </div>
    </main>
}