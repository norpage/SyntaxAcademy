'use client';

import { useTranslations } from "next-intl";
import NavigationLink from "@/components/NavigationLink";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Validation schema
const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function LoginPage() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password
        });

        if (res?.error) {
            setServerError(res.error);
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
                <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-mono">
                    {t("auth.loginTitle", { defaultValue: "Sign In to SyntaxAcademy" })}
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                            {t("auth.email", { defaultValue: "Email" })}
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                            {t("auth.password", { defaultValue: "Password" })}
                        </label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Server error */}
                    {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-mono font-bold disabled:opacity-50"
                    >
                        {loading ? "Loading..." : t("auth.login", { defaultValue: "Login" })}
                    </button>

                    {/* Forgot Password */}
                    <p
                        className="mt-2 text-sm text-right text-purple-400 hover:underline cursor-pointer font-mono"
                        onClick={() => router.push("/reset-request")}
                    >
                        {t("auth.forgotPassword", { defaultValue: "Forgot Password?" })}
                    </p>
                </form>

                <p className="mt-6 text-sm text-gray-400 text-center font-mono">
                    {t("auth.noAccount", { defaultValue: "Don't have an account?" })}{" "}
                    <NavigationLink href={`/register`} className="text-purple-400 hover:underline">
                        {t("auth.register", { defaultValue: "Register here" })}
                    </NavigationLink>
                </p>
            </div>
        </main>
    );
}
