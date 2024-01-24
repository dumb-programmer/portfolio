import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon";
import { Project } from "@/app/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/app/lib/schema";
import clsx from "clsx";
import FileInput from "../FileInput";

export default function EditModal({ project, onClose, onSuccess }: { project: Project | undefined, onClose: () => void, onSuccess: (project: Project) => void }) {
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            ...project
        },
        resolver: zodResolver(projectSchema)
    });

    return <AlertDialog open={project !== undefined} onOpenChange={onClose}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit Project</AlertDialogTitle>
            </AlertDialogHeader>
            <div>
                <form className="flex flex-col gap-4 max-h-96 overflow-y-auto p-2">
                    <div className="flex flex-col text-sm gap-2">
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.title?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} {...register("title")} />
                    </div>
                    <div className="flex flex-col text-sm gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className={clsx("border rounded-md resize-none p-2 transition-all  focus:outline-offset-4 focus:outline-2", errors.description?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} rows={5} {...register("description")}></textarea>
                    </div>
                    <div className="flex flex-col text-sm gap-2">
                        <label htmlFor="github">Github</label>
                        <input id="github" className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.github?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} type="url" {...register("github")} />
                    </div>
                    <div className="flex flex-col text-sm gap-2">
                        <label htmlFor="live">Live</label>
                        <input id="live" className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.live?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} type="url" {...register("live")} />
                    </div>
                    <div className="flex flex-col text-sm gap-2">
                        <label htmlFor="preview">Preview</label>
                        <FileInput setPreview={(preview: string[]) => setValue("preview", preview)} />
                    </div>
                </form>
            </div>
            <AlertDialogFooter className="flex gap-4">
                <AlertDialogCancel className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</AlertDialogCancel>
                <AlertDialogAction className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-purple-600 text-fuchsia-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:bg-destructive/90 h-9 min-w-24 px-4 py-2" onClick={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setLoading(false);
                }}>{
                        loading ? <LoadingIcon size={20} /> : "Save"
                    }</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}