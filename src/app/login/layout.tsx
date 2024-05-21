import React from "react";
import { fontClasses } from "../components/fonts";


export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <html lang="en">
            <body className={`${fontClasses["font-unna"]} antialiased text-amber-950`}>
                {children}
            </body>
        </html>

    )
}