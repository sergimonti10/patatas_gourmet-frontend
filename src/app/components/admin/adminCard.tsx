import React from "react";
import { Card, CardFooter, CardHeader, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export default function AdminCardPlus({ src, href1, title }: { src: string, href1: string, title: string }) {
    return (
        <Link href={`${href1}`}>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none cursor-pointer transform transition duration-300 hover:shadow-lg hover:scale-105 bg-amber-50"
            >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{title}</h4>
                </CardHeader>
                <Image
                    alt=""
                    className="object-cover"
                    height={200}
                    src={`${src}`}
                    width={200}
                />
            </Card>
        </Link>
    );
}
