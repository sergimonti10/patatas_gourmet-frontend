'use client'

import { useRouter } from "next/navigation";
import { FaArrowLeft } from 'react-icons/fa'
import Image from "next/image";
import { fontClasses } from "../components/fonts";
import Register from "../components/registerComponents/register";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    return (
        <div className="bg-cover bg-center flex h-screen flex-col md:flex-row">
            <Image src="/images/home.png" alt="Background Image" fill className="z-0 object-cover" />
            <div className="absolute inset-0 z-10 flex flex-col items-center w-full h-full">
                <div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-white to-transparent z-10"></div>
                <header className="flex items-center py-4 w-full z-20">
                    <div className="flex items-center justify-start">
                        <Link href="/" className="flex items-center justify-center z-20 mx-4">
                            <FaArrowLeft className="w-8 h-8 text-amber-950 transition-all active:scale-95 hover:filter hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                        </Link>
                    </div>
                    <div className="flex-grow flex justify-center">
                        <h1 className={`${fontClasses["font-pinyon"]} hidden sm:block z-10 text-5xl md:text-7xl font-bold text-center text-amber-950`}>
                            Patatas Gourmet
                        </h1>
                    </div>
                </header>
                <div className="flex-grow flex flex-col w-full overflow-hidden z-10">
                    <div className="flex-shrink-0 h-16"></div>
                    <section className="overflow-auto w-full h-full">
                        <div className="p-6 w-full min-w-min">
                            <Register router={router} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
