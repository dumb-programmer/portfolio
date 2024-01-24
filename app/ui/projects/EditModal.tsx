import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import LoadingIcon from "../LoadingIcon";
import { Project } from "@/app/lib/types";
import { projectSchema } from "@/app/lib/schema";
import EditForm from "./EditForm";
import { editProject } from "@/app/lib/actions";

export default function EditModal({ project, onClose, onSuccess }: { project: Project | undefined, onClose: () => void, onSuccess: (project: Project) => void }) {
    const { register, formState: { errors, isSubmitting }, handleSubmit, setValue, getValues } = useForm<Project>({
        defaultValues: {
            ...project
        },
        resolver: zodResolver(projectSchema)
    });

    useEffect(() => {
        if (project) {
            for (const [key, value] of Object.entries(project)) {
                setValue(key, value);
            }
        }
    }, [project, setValue]);

    return <AlertDialog open={project !== undefined} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit Project</AlertDialogTitle>
            </AlertDialogHeader>
            <EditForm errors={errors} register={register} setValue={setValue} getValues={getValues} />
            <AlertDialogFooter className="flex gap-4">
                <AlertDialogCancel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</AlertDialogCancel>
                <AlertDialogAction className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-purple-600 text-fuchsia-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:bg-purple-500 h-9 min-w-24 px-4 py-2" onClick={handleSubmit(async (data) => {
                    const formData = new FormData();
                    for (const [key, value] of Object.entries(data)) {
                        if (key === "preview") {
                            formData.set(key, JSON.stringify(value));
                            break;
                        }
                        formData.set(key, value as string);
                    }
                    const result = await editProject(formData);
                    if (result.success) {
                        onSuccess(data);
                    }
                })}>{
                        isSubmitting ? <LoadingIcon size={20} /> : "Save"
                    }</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}