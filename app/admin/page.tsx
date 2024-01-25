"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { authenticate } from "../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/schema";
import LoadingIcon from "../ui/LoadingIcon";
import { useState } from "react";

export default function Page() {
    const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    });
    const [formErrors, setFormErrors] = useState<string>();

    return <main className="flex justify-center items-center min-h-screen">
        <Card>
            <CardHeader>
                <CardTitle>
                    Admin
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form id="login" onSubmit={handleSubmit(async (data) => {
                    const formData = new FormData();
                    for (const [key, value] of Object.entries(data)) {
                        formData.set(key, value);
                    }
                    const result = await authenticate(formData);
                    if (result?.error) {
                        setFormErrors(result.error);
                    }
                })}>
                    <div className="flex flex-col text-xs gap-2">
                        <label htmlFor="username">Username</label>
                        <input id="username" className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.username?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} type="text" {...register("username")} required />
                        <span className="text-xs mt-2 text-red-600">{errors.username?.message}</span>
                    </div>
                    <div className="flex flex-col text-xs gap-2">
                        <label htmlFor="live">Password</label>
                        <input id="live" className={clsx("border rounded-md p-2 transition-all focus:outline-purple-600 focus:outline-offset-4 focus:outline-2", errors.password?.message ? "border-red-600 focus:outline-red-600" : "border-gray-400 focus:outline-purple-600")} type="password" {...register("password")} required />
                        <span className="text-xs mt-2 text-red-600">{errors.password?.message}</span>
                    </div>
                    <span className="text-xs text-red-600">{formErrors}</span>
                </form>
            </CardContent>
            <CardFooter className="flex">
                <button form="login" type="submit" className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all bg-purple-600 text-fuchsia-50 focus:outline-purple-600 focus:outline-offset-2 focus:outline-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm cursor-pointer hover:bg-purple-500 h-9 min-w-24 px-4 py-2" disabled={isSubmitting}>
                    {
                        isSubmitting ? <LoadingIcon size={20} /> : "Login"
                    }
                </button>
            </CardFooter>
        </Card>
    </main>
}