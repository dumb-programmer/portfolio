import { useEffect, useState } from "react";
import LoadingIcon from "./LoadingIcon";
import Image from "next/image";

export default function FilePreview({ file }: { file: File }) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        let ignore = false;
        const abortController = new AbortController();
        const data = new FormData();
        data.set("file", file);
        fetch("http://localhost:3000/api/upload", { method: "POST", body: data, signal: abortController.signal }).then(res => {
            res.json().then(data => {
                if (!ignore) {
                    setPreview(data.url)
                }
            })
        })
        return () => {
            ignore = true
            abortController.abort()
        }
    }, [file]);

    if (preview) {
        return <Image src={preview} height={100} width={200} alt="" />
    }

    return <div className="border border-black p-8 rounded-md"><LoadingIcon size={20} stroke="#000" /></div>;
}