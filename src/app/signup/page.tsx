"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff} from "lucide-react";
import { useForm } from "react-hook-form";
import { singnupSchema, type SingnupSchema } from "~/schemas/auth";



export default function SignupPage(){
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState(false)
    const [cshow, setShowC] = useState(false)

    const form = useForm<SingnupSchema>({
        resolver: zodResolver(singnupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    async function onSubmit(data: SingnupSchema) {
        ""
    }
    
    return( <div className="min-h-screen bg-white">
        <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
                    VA
                </div>
                <span className="text-lg font-semibold">Sentiment Analyzer</span>
            </div>
        </nav>
        <main className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-8 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign up to get Started with the Sentiment Analyzer
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    {error && (
                        <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Full name
                            </label>
                            <input {...form.register("name")}
                            type="text" 
                            placeholder="John Doe"
                            className="text-sm mt-1 block w-full border rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none hover:border-blue-400"
                            />
                            {
                                form.formState.errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {form.formState.errors.name.message}
                                    </p>
                                )
                            }
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input {...form.register("email")}
                            type="email" 
                            placeholder="johndoe@gmail.com"
                            className="text-sm mt-1 block w-full border rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none hover:border-blue-300"
                            />
                            {
                                form.formState.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {form.formState.errors.email.message}
                                    </p>
                                )
                            }
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input {...form.register("password")}
                            type={show ? "text" : "password"} 
                            placeholder="********"
                            className="text-sm mt-1 w-full border rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none hover:border-blue-300 "
                            />
                            <button type="button" 
                            onClick={() => setShow(!show)}
                            className="absolute flex right-0 top-1/2 translate-y-1/4 items-center px-2 cursor-pointer">
                                {show ? (
                                    <EyeOff className="w-5 h-5 text-gray-500"/>
                                ): (
                                    <Eye className="w-5 h-5 text-gray-500"/>
                                )}
                            </button>
                        </div>
                        {
                            form.formState.errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.password.message}
                                </p>
                            )
                        }

                        <div className="relative">
                            <label className="text-sm font-medium text-gray-700">
                                Confirm password
                            </label>
                            <input {...form.register("confirmPassword")}
                            type={cshow ? "text" : "password"} 
                            placeholder="********"
                            className="text-sm mt-1 w-full border rounded-md border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none hover:border-blue-300 "
                            />
                            <button type="button" 
                            onClick={() => setShowC(!cshow)}
                            className="absolute flex right-0 top-1/2 translate-y-1/4 items-center px-2 cursor-pointer">
                                {cshow ? (
                                    <EyeOff className="w-5 h-5 text-gray-500"/>
                                ): (
                                    <Eye className="w-5 h-5 text-gray-500"/>
                                )}
                            </button>
                        </div>
                        {
                            form.formState.errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">
                                    {form.formState.errors.confirmPassword.message}
                                </p>
                            )
                        }

                    </div>

                    <button type="submit" disabled={loading} className="text-sm flex w-full justify-center rounded-md bg-gray-800 text-white px-4 py-2 font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2, disabled:opacity-50">
                        {loading ? "Creating account...": "Create account"}
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "} 
                    <Link 
                    className="font-medium text-gray-800 hover:text-gray-500"
                    href="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </main>
    </div>);

}