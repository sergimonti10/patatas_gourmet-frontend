// Layout.jsx
import React from "react";
import SideNav from "../components/dashboardComponents/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-1 md:col-span-1 lg:col-span-1 text-white">
                <SideNav />
            </div>
            <div className="col-span-3 lg:col-span-5 p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}
