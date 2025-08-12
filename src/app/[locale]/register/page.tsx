"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const t = useTranslations();

    return (
        <main
            className="min-h-screen flex items-center justify-center
    bg-gray-200
    dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900
    border-gray-500 transition-colors duration-300"
        >

            <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
                <h1 className="text-2xl font-bold mb-6 text-center text-purple-400 font-mono">
                    {t("auth.registerTitle", { defaultValue: "Create Your SyntaxAcademy Account" })}
                    </h1>

                    <form className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm text-gray-300 font-mono">{t("auth.email", { defaultValue: "Email" })}</label>
                            <input
                                type="email"
className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-gray-300 font-mono">{t("auth.password", { defaultValue: "Password" })}</label>
                            <input
                                type="password"
className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-gray-300 font-mono">{t("auth.confirmPassword", { defaultValue: "Confirm Password" })}</label>
                            <input
                                type="password"
className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-600 hover:opacity-90 transition text-white font-mono font-bold"
                        >
                            {t("auth.register", { defaultValue: "Register" })}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-400 text-center font-mono">
                        {t("auth.haveAccount", { defaultValue: "Already have an account?" })}{" "}
                        <Link href={`/login`} className="text-purple-400 hover:underline">
                            {t("auth.login", { defaultValue: "Login here" })}
                        </Link>
                    </p>
                </div>
            </main>
    );
}
