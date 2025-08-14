"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import NavigationLink from "../../../components/NavigationLink";

const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
});

export default function ResetRequestPage() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/request-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (!res.ok) setError(result.message || "Failed to send reset code");
            else setMessage("Reset code sent to your email");
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-900/80 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-mono">
                    {t("auth.resetTitle", { defaultValue: "Reset Your Password" })}
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                            {t("auth.email", { defaultValue: "Email" })}
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border rounded-lg focus:outline-none text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {message && <p className="text-green-400 text-sm">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold disabled:opacity-50"
                    >
                        {loading ? "Loading..." : t("auth.sendResetCode", { defaultValue: "Send Reset Code" })}
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400 text-center font-mono">
                    {t("auth.backToLogin", { defaultValue: "Remember your password?" })}{" "}
                    <NavigationLink href={`/login`} className="text-purple-400 hover:underline">
                        {t("auth.login", { defaultValue: "Login here" })}
                    </NavigationLink>
                </p>
            </div>
        </main>
    );
}
