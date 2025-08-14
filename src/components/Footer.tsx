'use client'

import api from '@/config/axios';
import { API_URLS } from '@/config/urls';
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import NavigationLink from "@/components/NavigationLink";

const Footer = () => {
    const t = useTranslations();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await api.post(API_URLS.subscribe, { email }); // ⬅️ այլևս չես destructure անում `data`
            setStatus("success");
            setEmail("");
        } catch { // ⬅️ առանց պարամետրերի catch
            setStatus("error");
        }
    };


    return (
        <footer className="py-10 px-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3">
                {/* Contact */}
                <div>
                    <h4 className="font-bold mb-3">{t("footer.contact")}</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            Email:{" "}
                            <NavigationLink href="mailto:info@syntaxacade.my" className="hover:text-purple-500 transition-colors">
                                info@syntaxacade.my
                            </NavigationLink>
                        </li>
                        <li>
                            Phone:{" "}
                            <NavigationLink href="tel:+37499452777" className="hover:text-purple-500 transition-colors">
                                +374 99 452777
                            </NavigationLink>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold mb-3">{t("footer.newsletter")}</h4>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 rounded text-black outline-none border border-gray-300 focus:border-purple-500"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
                        >
                            {status === "loading"
                                ? t("footer.subscribing")
                                : t("footer.subscribe")}
                        </button>
                        {status === "success" && (
                            <p className="text-green-500 text-sm mt-1">{t("footer.success")}</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-sm mt-1">{t("footer.error")}</p>
                        )}
                    </form>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-bold mb-3">{t("footer.follow")}</h4>
                    <div className="flex gap-4 text-xl">
                        <NavigationLink
                            href="https://www.facebook.com/profile.php?id=61577630638242"
                            target="_blank"
                            className="hover:text-blue-500 hover:scale-125 transition-transform"
                        >
                            <FaFacebook />
                        </NavigationLink>
                        <NavigationLink
                            href="https://www.instagram.com/_syntax_academy_/"
                            target="_blank"
                            className="hover:text-pink-500 hover:scale-125 transition-transform"
                        >
                            <FaInstagram />
                        </NavigationLink>
                        <NavigationLink
                            href="https://wa.me/37499452777"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-500 hover:scale-125 transition-transform"
                        >
                            <FaWhatsapp />
                        </NavigationLink>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                <p>
                    Developed with ❤️ by{" "}
                    <NavigationLink
                        href="https://davidmeloyan.syntaxacade.my/"
                        target="_blank"
                        className="text-blue-600 hover:underline"
                    >
                        David Meloyan
                    </NavigationLink>
                </p>
                <p className="mt-2">{t("footer.rights")}</p>
            </div>
        </footer>
    );
};

export default Footer;