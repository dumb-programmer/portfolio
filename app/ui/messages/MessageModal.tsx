import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Message } from "./columns";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function MessageModal({ open, message, onClose }: { open: boolean, message: Message | undefined, onClose: () => void }) {
    return <AlertDialog open={open}>
        <AlertDialogContent>
            <AlertDialogHeader className="flex flex-row justify-between items-center">
                <AlertDialogTitle>Message</AlertDialogTitle>
                    <button onClick={() => onClose()} className="flex hover:bg-gray-200 transition-colors rounded-xl p-1"><XMarkIcon height={20} width={20} /></button>
            </AlertDialogHeader>
            <div>
                Name : {message?.name}
            </div>
            <div>
                Email: <a href={message?.email}>{message?.email}</a>
            </div>
            <div>
                Message: {message?.message}
            </div>
        </AlertDialogContent>
    </AlertDialog>

}