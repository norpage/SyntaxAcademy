"use client";

import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import NavigationLink from "../../../components/NavigationLink";

const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
});

type FormValues = {
    email: string;
};

export default function ResetRequestPage() {
    const t = useTranslations();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ email }: FormValues) => {
        setLoading(true);
        setError(null);

        try {
            await api.post(API_URLS.requestReset, { email });
            setSuccess(true);
        } catch (err: any) {
            const fallbackMsg = t("auth.genericError", {
                defaultValue: "Something went wrong. Please try again.",
            });
            const apiMsg = err?.response?.data?.message ?? err?.message;
            setError(apiMsg || fallbackMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
              <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400 font-mono">
                  {t("auth.resetTitle", { defaultValue: "Reset Your Password" })}
              </h1>

              {success ? (
                <div className="space-y-4 text-center">
                    <p className="text-green-400 font-mono">
                        {t("auth.requestSent", {
                            defaultValue:
                              "If that email exists in our system, we\'ve sent a reset code/instructions.",
                        })}
                    </p>
                    <NavigationLink
                      href={`/login`}
                      className="inline-block text-purple-400 hover:underline font-mono"
                    >
                        {t("auth.backToLogin", { defaultValue: "Back to login" })}
                    </NavigationLink>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div>
                        <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                            {t("auth.email", { defaultValue: "Email" })}
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          aria-invalid={Boolean(errors.email) || undefined}
                          className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                          placeholder="you@example.com"
                          disabled={loading}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1" role="alert">
                              {errors.email.message}
                          </p>
                        )}
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm" role="alert">
                          {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition text-white font-mono font-bold disabled:opacity-50"
                    >
                        {loading
                          ? t("Loader.loading", { defaultValue: "Loading..." })
                          : t("auth.sendResetCode", { defaultValue: "Send Reset Code" })}
                    </button>
                </form>
              )}

              <p className="mt-6 text-sm text-gray-400 text-center font-mono">
                  {t("auth.rememberPassword", { defaultValue: "Remember your password?" })}{" "}
                  <NavigationLink href={`/login`} className="text-purple-400 hover:underline">
                      {t("auth.login", { defaultValue: "Login here" })}
                  </NavigationLink>
              </p>
          </div>
      </main>
    );
}
