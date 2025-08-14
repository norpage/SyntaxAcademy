"use client";

import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        setStatus("loading");
        setMessage("");
        try {
            const { data: res } = await api.post(API_URLS.verify, { email, code: data.code });
            setStatus("success");
            setMessage(res?.message || "Verified");
            setTimeout(() => router.push("/login"), 1200);
        } catch (err) {
            setStatus("error");
            const res = err?.response?.data;
            setMessage(res?.message || "Verification failed");
        }
    };

    const handleResendCode = async () => {
        setStatus("loading");
        setMessage("");
        try {
            const { data: res } = await api.post(API_URLS.resendVerification, { email });
            setStatus("success");
            setMessage(res?.message || "Code resent");
        } catch (err) {
            setStatus("error");
            const res = err?.response?.data;
            setMessage(res?.message || "Resend failed");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
                <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-mono">
                    Verify Your Email
                </h1>

                {status === "success" ? (
                    <p className="text-green-500 text-center font-mono">{message}</p>
                ) : (
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <p className="text-gray-500 dark:text-gray-300 text-sm text-center font-mono">
                            We have sent a 6-digit verification code to <br />
                            <span className="font-bold text-purple-400">{email}</span>
                        </p>

                        <input
                            type="text"
                            {...register("code")}
                            maxLength={6}
                            className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-center tracking-widest text-lg text-gray-900 dark:text-gray-100 font-mono"
                            placeholder="123456"
                        />

                        {message && (
                            <p
                                className={`text-sm text-center ${
                                    status === "error" ? "text-red-400" : "text-green-400"
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-mono font-bold disabled:opacity-50"
                        >
                            {status === "loading" ? "Verifying..." : "Verify"}
                        </button>

                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={status === "loading"}
                            className="w-full py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:opacity-90 transition text-gray-900 dark:text-gray-100 font-mono font-bold disabled:opacity-50"
                        >
                            {status === "loading" ? "Resending..." : "Resend Code"}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}