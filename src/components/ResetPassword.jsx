"use client";

import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const schema = yup.object({
    token: yup.string().required("Reset token is required"),
    newPassword: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

export default function ResetPasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const urlToken = searchParams.get("token") || "";

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (urlToken) {
            setValue("token", urlToken);
        }
    }, [urlToken, setValue]);

    const onSubmit = async (form) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
        const payload = { email, token: form.token, newPassword: form.newPassword };
        const { data } = await api.post(API_URLS.resetPassword, payload);
        setMessage(t("auth.redirecting"))
        setTimeout(()=>router.push('/login'),[2000])

    } catch (err) {
        const data = err?.response?.data;
        setError(data?.message || "Reset failed");
    } finally {
        setLoading(false);
    }
};

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
                <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-mono">
                    {t("auth.setNewPassword", { defaultValue: "Set New Password" })}
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("email")} value={email} />

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">Reset Token</label>
                        <input
                            type="text"
                            {...register("token")}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="Enter reset token"
                        />
                        {errors.token && <p className="text-red-400 text-sm mt-1">{errors.token.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">New Password</label>
                        <input
                            type="password"
                            {...register("newPassword")}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="••••••••"
                        />
                        {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>}
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {message && <p className="text-green-400 text-sm">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-mono font-bold disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </main>
    );
}