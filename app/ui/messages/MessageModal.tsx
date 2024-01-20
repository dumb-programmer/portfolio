import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Message } from "./columns";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function MessageModal({ open, message, onClose }: { open: boolean, message: Message | undefined, onClose: () => void }) {

    return <AlertDialog open={open} onOpenChange={() => onClose()}>
        <AlertDialogContent>
            <AlertDialogHeader className="flex flex-row justify-between items-center">
                <AlertDialogTitle>Message Details</AlertDialogTitle>
                <button onClick={() => onClose()} className="flex hover:bg-gray-200 transition-colors rounded-xl p-1"><XMarkIcon height={20} width={20} /></button>
            </AlertDialogHeader>
            <div className="p-4">
                <div className="mb-2">
                    <span className="font-semibold">Name:</span> {message?.name}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Email:</span> <a href={`mailto:${message?.email}`} className="text-blue-500">{message?.email}</a>
                </div>
                <div>
                    <span className="font-semibold">Message:</span> {message?.message}
                </div>
            </div>
        </AlertDialogContent>
    </AlertDialog>

}