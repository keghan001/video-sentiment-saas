"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff} from "lucide-react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "~/schemas/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignupPage(){
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState(false)

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(data: LoginSchema) {
        try {
            setLoading(true);

            //Login 
            const signInResult = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if(!signInResult?.error){
                router.push("/");
            } else {
                setError(signInResult.error === "CredentialsSignin" 
                    ? "Invalid email or password": "Something went wrong")
            }

        } catch(error){
            setError("Unable to signup: ");
        } finally {
            setLoading(false);
        }
    }
    
    return( <div className="min-h-screen bg-linear-to-l from-[#bbcdeb] to-[#f0f4fb] bg-white">
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
                    <h2 className="text-2xl font-extrabold">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Jump back into your Sentiment Analyzer account
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

                    </div>

                    <button type="submit" disabled={loading} className="text-sm flex w-full justify-center rounded-md bg-gray-800 text-white px-4 py-2 font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2, disabled:opacity-50">
                        {loading ? "Signing into account...": "Sign In"}
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Don&#39;t have an account?{" "} 
                    <Link 
                    className="font-medium text-gray-800 hover:text-gray-500"
                    href="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </main>
    </div>);

}