import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FilePreview from "./FilePreview";

export default function FileInput() {
    const [files, setFiles] = useState<File[]>();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles);
        }
    });

    if (!files) {
        return <div className="border border-gray-400 p-6 rounded-md flex flex-col justify-center items-center text-xs text-gray-600" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Upload File</p>
            <p>Or</p>
            <p>Drag and Drop file</p>
        </div>
    }

    return <div className="flex flex-wrap gap-8">{files.map(file => <FilePreview key={file.name} file={file} />)}</div>
}