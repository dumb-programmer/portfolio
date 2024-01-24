import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import LoadingIcon from "../LoadingIcon";
import { Project } from "@/app/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/schema";
import CreateForm from "./CreateForm";
import { createProject } from "@/app/lib/actions";

const formId = "create-project-form";
export default function CreateModal({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess: (project: Project) => void }) {
    const { register, formState: { errors, isSubmitting }, setValue, handleSubmit, reset } = useForm<Project>({
        defaultValues: {
            title: "",
            description: "",
            github: "",
            live: "",
            preview: [""]
        },
        resolver: zodResolver(projectSchema)
    });

    return <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Add Project</AlertDialogTitle>
            </AlertDialogHeader>
            <CreateForm formId={formId} errors={errors} register={register} setValue={setValue} />
            <AlertDialogFooter className="flex gap-4">
                <AlertDialogCancel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit(async (data) => {
                    const formData = new FormData();
                    for (const [key, value] of Object.entries(data)) {
                        if (key === "preview") {
                            formData.set(key, JSON.stringify(value));
                            break;
                        }
                        formData.set(key, value as string);
                    }

                    const result = await createProject(formData);
                    if (result.success) {
                        onSuccess({ ...data, id: result.id } as Project);
                        reset();
                    }
                })} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-purple-600 text-fuchsia-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm cursor-pointer hover:bg-purple-500 h-9 min-w-24 px-4 py-2">
                    {
                        isSubmitting ? <LoadingIcon size={20} /> : "Add"
                    }
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}