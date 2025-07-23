'use client'
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 dark:from-black dark:via-gray-900 dark:to-gray-950 text-white px-6 text-center">


            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-mono font-bold mb-4">
                404 – Page Not Found
            </h1>
            <p className="text-lg md:text-xl font-mono text-gray-200 mb-8">
                Looks like you’ve hit an <span className="text-pink-400">undefined</span> route.
            </p>

            {/* Code Snippet */}
            <div className="bg-black/50 rounded-xl shadow-lg p-6 text-left w-full max-w-lg mb-8 font-mono border border-white/10">
        <pre className="text-green-400">
          <code>
            {`> const route = "/unknown";\n> throw new Error("404: Not Found");`}
          </code>
          <span className="animate-pulse text-yellow-300">|</span>
        </pre>
            </div>

            {/* CTA Button */}
            <Link
                href="/"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-xl font-semibold shadow-lg transition"
            >
                Go Back Home
            </Link>

            {/* Illustration */}
            <div className="mt-12 w-64  animate-bounce">
                <Image src={'/xsh.gif'} width={1000} height={800} className={'w-full'} alt={'no Image'}></Image>
            </div>
        </div>
    );
}
