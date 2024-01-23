import { deleteProject } from "@/app/lib/actions";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function DeleteConfirmationModal({ projectId, onClose, onSuccess }: { projectId: string | undefined, onClose: () => void, onSuccess: (id: string) => void }) {
    const [loading, setLoading] = useState(false);

    return <AlertDialog open={projectId !== undefined} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this project, you will not be able to recover it.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-4">
                <AlertDialogCancel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</AlertDialogCancel>
                <AlertDialogAction className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 min-w-24 px-4 py-2" onClick={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    if (projectId) {
                        const data = new FormData();
                        data.set("projectId", projectId);
                        const result = await deleteProject(data);
                        if (result.success) {
                            onSuccess(projectId);
                            onClose();
                        }
                    }
                    setLoading(false);
                }}>{
                        loading ? <LoadingIcon size={20} /> : "Delete"
                    }</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}