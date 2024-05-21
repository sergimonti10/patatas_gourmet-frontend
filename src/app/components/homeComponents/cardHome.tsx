import React from 'react';
import { fontClasses } from '../fonts';
import Link from "next/link";

interface CardHomeProps {
    title: string;
    title1: string;
    description: string;
    Icon: React.ElementType;
    href: string;
}

export default function CardHome({ title, title1, description, Icon, href }: CardHomeProps) {
    return (
        <Link href={href} className="transition-all active:scale-95 hover:shadow-[0_4px_30px_rgba(255,255,255,0.9)] hover:shadow-amber-500 bg-radial-gradient flex flex-col justify-center items-center text-center p-2 lg:p-6 rounded-full border border-amber-950 w-full lg:w-5/6 flex-grow">
            <h2 className={`${fontClasses['font-unna']} text-amber-950 hidden sm:flex items-center text-2xl sm:text-3xl font-bold mb-4`}>
                {title}
                <Icon className="w-8 h-8 ml-4 text-amber-950" />
            </h2>
            <h2 className={`${fontClasses['font-unna']} text-amber-950 block sm:hidden text-xl font-bold mb-4`}>{title1}</h2>
            <p className={`${fontClasses['font-roboto']} text-amber-950 hidden sm:block text-sm sm:text-base`}>{description}</p>
            <Icon className="w-8 h-8 block sm:hidden mt-2 text-amber-950" />
        </Link>
    );
}
