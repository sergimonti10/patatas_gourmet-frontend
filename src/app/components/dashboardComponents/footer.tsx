import { Divider, Image, Link } from "@nextui-org/react";
import { fontClasses } from "../fonts";

export default function Footer() {
    return (
        <footer className="bg-amber-950 rounded-t-md sm:rounded-t-full flex justify-between items-center text-white text-sm font-medium py-3 px-4" style={{
            height: 'auto'
        }}>
            <div className="flex items-start">
                <Image src="/images/logo.png" alt="Logo Patatas Gourmet" className="h-10 mr-2" />
            </div>
            <div>
                <p className="text-amber-100 text-lg"><span className={`${fontClasses["font-pinyon"]} text-2xl`}>Patatas Gourmet </span> © 2024. Todos los derechos reservados.</p>
            </div>
            <div className="flex flex-col sm:flex-row text-amber-100 text-lg ml-4">
                <Link href="/dashboard/envios" className="mx-2 hover:underline">·Envíos</Link>
                <Link href="/dashboard/aviso" className="mx-2 hover:underline">·Aviso legal</Link>
                <Link href="/dashboard/privacidad" className="mx-2 hover:underline">·Política de privacidad</Link>
                <Link href="/dashboard/cookies" className="mx-2 hover:underline">·Política de cookies</Link>
            </div>
        </footer >
    );
}
