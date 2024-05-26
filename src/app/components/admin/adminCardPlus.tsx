import React from "react";
import { Card, CardFooter, CardHeader, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export default function AdminCardPlus({ src, href1, href2, title }: { src: string, href1: string, href2: string, title: string }) {
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
        <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Link href={`${href2}`} legacyBehavior>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              <CiCirclePlus className="w-5 h-5" />
              Nuevo
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Link>
  );
}
