import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilePreview from "./FilePreview";
import clsx from "clsx";

export default function FileInput({ error, setPreview }: { error: string | undefined, setPreview: (file: string[]) => void }) {
    const [files, setFiles] = useState<Promise<{ url: string, name: string }>[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map(async (file) => {
                const data = new FormData();
                data.set("file", file);
                const response = await fetch("http://localhost:3000/api/upload", { method: "POST", body: data });
                const result: { url: string, name: string } = await response.json();
                return result;
            }));
        }
    });

    useEffect(() => {
        (async () => {
            if (files) {
                setPreview((await Promise.all(files)).map(file => file.url))
            }
        })()
    }, [files, setPreview]);

    if (files?.length === 0) {
        return <div className={clsx("border border-gray-400 p-6 rounded-md flex flex-col justify-center items-center text-xs font-extralight text-gray-600", error && "border-red-600 focus:outline-red-600")} {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Upload File</p>
            <p>Or</p>
            <p>Drag and Drop file</p>
        </div>
    }

    return <div className="flex flex-wrap gap-8">{files.map((file, index) => <FilePreview key={index} file={file} onDelete={async (name) => {
        const resolvedFiles = await Promise.all(files);
        const updated = resolvedFiles.filter(file => file.name !== name);
        const promises = updated.map(file => Promise.resolve(file));
        setFiles(promises);
    }} />)}</div>

}