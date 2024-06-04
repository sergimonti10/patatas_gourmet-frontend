import React from "react";
import Head from "next/head";
import NavBar from "../components/dashboardComponents/navbar";
import { fontClasses } from "../components/fonts";
import Footer from "../components/dashboardComponents/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Patatas Gourmet</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="flex flex-col h-screen w-screen overflow-x-hidden relative">
                <div className={`w-full fixed top-0 z-10 ${fontClasses["font-pinyon"]} rounded-b-lg`}>
                    <NavBar />
                </div>
                <div className={`flex-grow p-6 text-amber-950 ${fontClasses["font-unna"]} mt-20 relative z-0`}>
                    {children}
                </div>
                <div className={`w-full bottom-0 ${fontClasses["font-unna"]}`}>
                    <Footer />
                </div>
            </div>
        </>
    );
}
