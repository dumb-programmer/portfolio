"use client";

import { useFormState } from "react-dom"
import { createMessage } from "../../lib/actions"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { messageSchema } from "../../lib/schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SubmitButton from "../../ui/SubmitButton";

export default function Page() {
    const [state, action] = useFormState(createMessage, null);
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
        if (state?.sucess) {
            router.push("/message/success");
        }
    }, [router, state?.sucess]);

    return <main className="p-20">
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-3xl font-bold">Contact</h1>
            <form className="flex flex-col gap-8 w-[600px]" onSubmit={handleSubmit(async (data) => {
                const formData = new FormData();
                for (const [key, value] of Object.entries(data)) {
                    formData.set(key, value);
                }
                action(formData);
            })}>
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input  {...register("name", { required: "This is required" })} className={clsx("border rounded-md p-2 focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.name?.message || state?.errors?.name ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} id="name" name="name" type="text" required />
                    <span className="text-xs mt-2 text-red-600">{errors.name?.message || state?.errors?.name}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input  {...register("email", { required: "This is required" })} className={clsx("border rounded-md p-2 focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.email?.message || state?.errors?.email ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600 ")} id="email" name="email" required />
                    <span className="text-xs mt-2 text-red-600">{errors.email?.message || state?.errors?.email}</span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea  {...register("message", { required: "This is required" })} className={clsx("border rounded-md resize-none p-2  focus:outline-offset-4 focus:outline-2", errors.message?.message || state?.errors?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} rows={5} id="message" name="message" minLength={10} required></textarea>
                    <span className="text-xs mt-2 text-red-600">{errors.message?.message || state?.errors?.message}</span>
                </div>
                <SubmitButton isLoading={isSubmitting} />
            </form>
        </div>
    </main>
}