import React from 'react';
import {useTranslations} from "next-intl";
import {FaFacebook, FaInstagram, FaWhatsapp} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    const t = useTranslations();

    return (
        <footer id="contact" className="py-10 px-4 text-black dark:text-white">
            <div className="max-w-6xl mx-auto grid justify-center gap-8 sm:grid-cols-3">
                <div>
                    <h4 className="font-bold mb-2">{t('footer.contact')}</h4>

                    <div className={'flex flex-col gap-2'}>
                        <span> Email:<Link href={'mailto:info@syntaxacade.my'}
                                           className={'hover:text-purple-500 duration-500'}> info@syntaxacade.my</Link></span>
                        <span> Phone:<Link href={'tel:+37499452777'}
                                           className={'hover:text-purple-500 duration-500'}> +374 99 452777</Link></span>
                    </div>

                </div>
                <div>
                    <h4 className="font-bold mb-2">{t('footer.newsletter')}</h4>
                    <form className="flex flex-col gap-2">
                        <input type="email" placeholder="Your email" className="p-2 rounded text-black"/>
                        <button
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded duration-500">{t('footer.newsletter')}</button>
                    </form>
                </div>
                <div>
                    <h4 className="font-bold mb-2">{t('footer.follow')}</h4>
                    <div className="flex gap-4 text-xl">
                        <Link href="https://www.facebook.com/profile.php?id=61577630638242" target={"_blank"}
                              className="hover:text-blue-500 hover:scale-125 duration-500"><FaFacebook/></Link>
                        <Link href="https://www.instagram.com/_syntax_academy_/" target={"_blank"}
                              className="hover:text-orange-600 hover:scale-125 duration-500"><FaInstagram/></Link>
                        <Link
                            href="https://wa.me/37499452777"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 hover:scale-125 duration-500"
                        >
                            <FaWhatsapp/>
                        </Link>
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-base text-gray-600">
                Developed with ❤️ by{" "}
                <Link
                    href="https://davidmeloyan.syntaxacade.my/"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    David Meloyan
                </Link>
            </p>
            <p className="text-center text-sm mt-4">{t('footer.rights')}</p>
        </footer>
    );
};

export default Footer;