"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMessage } from "@/app/lib/actions"
import { messageSchema } from "@/app/lib/schema";
import SubmitButton from "@/app/ui/SubmitButton";

type FormStatus = "IDLE" | "SUCCESS" | "ERROR";

export default function Page() {
    const [formStatus, setFormStatus] = useState<FormStatus>("IDLE");
    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
        resolver: zodResolver(messageSchema)
    });
    const router = useRouter();

    useEffect(() => {
        if (formStatus === "SUCCESS") {
            router.push("/message/success");
        }
    }, [router, formStatus]);

    return <main className="p-20 mt-4 sm:mt-0">
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-bold">Contact</h1>
            <form className="flex flex-col gap-8 md:w-[600px]" onSubmit={handleSubmit(async (data) => {
                const formData = new FormData();
                for (const [key, value] of Object.entries(data)) {
                    formData.set(key, value);
                }
                const result = await createMessage(null, formData);
                if (result.success) {
                    setFormStatus("SUCCESS");
                }
                else if (result.errors) {
                    setFormStatus("ERROR");
                }
            })}>
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input  {...register("name", { required: "This is required" })} className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.name?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} id="name" name="name" type="text" required />
                    <span className="text-xs mt-2 text-red-600">{errors.name?.message}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input  {...register("email", { required: "This is required" })} className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.email?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600 ")} id="email" name="email" required />
                    <span className="text-xs mt-2 text-red-600">{errors.email?.message}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea  {...register("message", { required: "This is required" })} className={clsx("border rounded-md resize-none p-2 transition-all  focus:outline-offset-4 focus:outline-2", errors.message?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} rows={5} id="message" name="message" minLength={10} required></textarea>
                    <span className="text-xs mt-2 text-red-600">{errors.message?.message}</span>
                </div>
                <SubmitButton isLoading={isSubmitting} />
            </form>
        </div>
    </main>
}