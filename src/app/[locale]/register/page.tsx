"use client";

import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import { useTranslations } from "next-intl";
import NavigationLink from "../../../components/NavigationLink";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useState} from 'react';
import { useRouter } from "next/navigation";
import DateOfBirthPicker from '@/components/DateOfBirthPicker';

const calcAgeFromISO = (iso: string) => {
    const b = new Date(iso);
    const t = new Date();
    let age = t.getFullYear() - b.getFullYear();
    const m = t.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
    return age;
};

// ---------- validation ----------
const schema = (t: any) => yup.object({
    name: yup.string().required(t("validation.nameRequired")),
    dob: yup.string()
      .required(t("validation.ageRequired"))
      .test("valid-date", t("validation.ageNumber"), (v) => !!v && !Number.isNaN(new Date(v).getTime()))
      .test("age-range", t("validation.ageMin"), (v) => v ? calcAgeFromISO(v) >= 1 : false)
      .test("age-max", t("validation.ageMax"), (v) => v ? calcAgeFromISO(v) <= 120 : false),
    email: yup.string().email(t("validation.emailFormat")).required(t("validation.emailRequired")),
    password: yup.string()
      .min(8, t("validation.passwordMin"))
      .matches(/[A-Z]/, t("validation.passwordUppercase"))
      .matches(/[0-9]/, t("validation.passwordNumber"))
      .matches(/[!@#$%^&*]/, t("validation.passwordSpecial"))
      .required(t("validation.passwordRequired")),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], t("validation.confirmPasswordMatch"))
      .required(t("validation.confirmPasswordRequired")),
});
// ---------- pretty DOB picker ----------
export default function RegisterPage() {
    const t = useTranslations();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema(t)),
        defaultValues: { dob: "" }
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        setServerError("");

        try {
            const age = calcAgeFromISO(data.dob); // 계산해둔 나이

            // ⬇️ ԱՅՍՏԵՂ ԱՎԵԼԱՑՐՈՒ DOB-Ը
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
                dob: data.dob,      // 'YYYY-MM-DD' -> պահի՛ սերվերում որպես Date
                age                  // (ըստ ցանկության) թող մնար, եթե backend-ը դեռ սպասում է age-ին
            };

            const { data: result } = await api.post(API_URLS.register, payload);

            if (result?.status === "success") {
                router.push(`/verify?email=${encodeURIComponent(data.email)}`);
            } else {
                if (result?.errors && Array.isArray(result.errors)) {
                    setServerError(result.errors.map((e: any) => e.msg).join(", "));
                } else {
                    setServerError(result?.message || "Registration failed");
                }
            }
        } catch (err: any) {
            const result = err?.response?.data;
            if (result?.errors && Array.isArray(result.errors)) {
                setServerError(result.errors.map((e: any) => e.msg).join(", "));
            } else {
                setServerError(result?.message || "Registration failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 border-gray-500 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-900/80 dark:backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-500/40">
              <h1 className="text-2xl font-bold mb-6 text-center text-purple-400 font-mono">
                  {t("auth.registerTitle", { defaultValue: "Create Your SyntaxAcademy Account" })}
              </h1>

              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <div>
                      <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                          {t("auth.name", { defaultValue: "Full Name" })}
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{String(errors.name.message)}</p>}
                  </div>

                  {/* DOB (beautiful Month/Day/Year) */}
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DateOfBirthPicker
                        value={field.value}
                        onChange={field.onChange}
                        label={t("auth.age", { defaultValue: "Birth date" })}
                      />
                    )}
                  />
                  {errors.dob && <p className="text-red-400 text-sm mt-1">{String(errors.dob.message)}</p>}

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
                      {errors.email && <p className="text-red-400 text-sm mt-1">{String(errors.email.message)}</p>}
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
                      {errors.password && <p className="text-red-400 text-sm mt-1">{String(errors.password.message)}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                      <label className="block mb-1 text-sm text-gray-500 dark:text-gray-300 font-mono">
                          {t("auth.confirmPassword", { defaultValue: "Confirm Password" })}
                      </label>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-black/50 border border-cyan-400/50 rounded-lg focus:outline-none focus:border-cyan-300 text-gray-900 dark:text-gray-100 font-mono"
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{String(errors.confirmPassword.message)}</p>}
                  </div>

                  {/* Server error */}
                  {serverError && <p className="text-red-400 text-sm">{serverError}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-600 hover:opacity-90 transition text-white font-mono font-bold disabled:opacity-50"
                  >
                      {loading ? "Loading..." : t("auth.register", { defaultValue: "Register" })}
                  </button>
              </form>

              <p className="mt-6 text-sm text-gray-400 text-center font-mono">
                  {t("auth.haveAccount", { defaultValue: "Already have an account?" })}{" "}
                  <NavigationLink href={`/login`} className="text-purple-400 hover:underline">
                      {t("auth.login", { defaultValue: "Login here" })}
                  </NavigationLink>
              </p>
          </div>
      </main>
    );
}
