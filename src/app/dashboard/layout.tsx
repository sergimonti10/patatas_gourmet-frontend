import React from "react";
import Head from "next/head";
import SideNav from "../components/dashboardComponents/sidenav";
import { fontClasses } from "../components/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>My App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
                <div className="col-span-1 md:col-span-1 lg:col-span-1 text-white">
                    <SideNav />
                </div>
                <div className={`flex w-full justify-center col-span-3 lg:col-span-5 p-6 md:overflow-y-auto md:p-12 text-amber-950 ${fontClasses["font-unna"]}`}>
                    {children}
                </div>
            </div>
        </>
    );
}
