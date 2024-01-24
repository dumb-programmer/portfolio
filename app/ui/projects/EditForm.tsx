import clsx from "clsx";
import FileInput from "../FileInput";
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Project } from "@/app/lib/types";

export default function EditForm({ errors, register, setValue, getValues }: { errors: FieldErrors<Project>, register: UseFormRegister<Project>, setValue: UseFormSetValue<Project>, getValues: UseFormGetValues<Project> }) {
    return <div>
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
                <FileInput previews={getValues("preview").map(preview => Promise.resolve(preview))} error={errors.preview?.message} setPreview={(preview: string[]) => { setValue("preview", preview) }} />
            </div>
        </form>
    </div>;
}