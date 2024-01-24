import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function FilePreview({ file, onDelete }: { file: Promise<{ url: string, name: string }>, onDelete: (id: string) => void }) {
    const [preview, setPreview] = useState<{ url: string, name: string }>();
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        file.then(preview => setPreview(preview))
    }, [file])

    if (preview) {
        return <div className={clsx("relative transition-opacity shadow-md", isDeleting && "opacity-50")}>
            <button className={clsx("flex justify-center items-center absolute -top-2 -right-1 bg-gray-300 p-1 rounded-full", isDeleting && "cursor-not-allowed")} onClick={isDeleting ? (e) => e.preventDefault() : async (e) => {
                e.preventDefault();
                setIsDeleting(true);
                const res = await fetch(`http://localhost:3000/api/files/${preview.name}`, { method: "DELETE" });
                if (res.ok) {
                    onDelete(preview.name)
                    setIsDeleting(false);
                }
            }}><XMarkIcon height={13} width={13} color="black" /></button>
            <img src={preview.url} height={100} width={200} alt="" />
        </div>
    }

    return <div className="h-[100px] w-[200px] bg-gray-400 rounded-md animate-pulse  flex justify-center items-center">
        <PhotoIcon className="h-10 w-5 text-fuchsia-50" />
    </div>;
}