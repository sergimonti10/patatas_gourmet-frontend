import React from "react";
import { fontClasses } from "../components/fonts";


export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className={`${fontClasses["font-unna"]} antialiased text-amber-950`}>
            {children}
        </div>
    )
}