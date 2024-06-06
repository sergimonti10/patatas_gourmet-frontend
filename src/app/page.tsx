import Image from "next/image";
import { fontClasses } from "./components/fonts";
import CardHome from "./components/homeComponents/cardHome";
import { FaUser } from 'react-icons/fa';
import { FaShopSlash, FaShop } from 'react-icons/fa6';


export default function Home() {
  return (
    <div className="bg-cover bg-center flex h-screen flex-col md:flex-row">
      <Image src="/images/home.png" alt="Background Image" fill className="z-0 object-cover" />
      <div className="absolute inset-0 z-10 flex flex-col items-center w-full h-full">
        <div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-white to-transparent z-10"></div>
        <header className="flex items-center py-4 w-full z-20">
          <div className="flex-grow flex justify-center">
            <h1 className={`${fontClasses["font-pinyon"]} antialiased z-10 text-5xl md:text-7xl lg:text-9xl font-bold text-center text-amber-950`}>
              Patatas Gourmet
            </h1>
          </div>
        </header>

        <div className="flex-grow flex flex-col w-full overflow-hidden z-10 h-full items-center">
          <div className="flex-shrink-0 h-16"></div>
          <div className="overflow-auto w-full h-full">
            <section className="bg-gradient-radial from-amber-500 to-transparent p-6 w-full items-stretch min-w-min flex flex-col lg:flex-row justify-center gap-4">
              <article className="flex flex-grow">
                <CardHome href="/dashboard" Icon={FaShopSlash} title="¡Visítanos!" title1="Tienda" description="Explora una amplia variedad de opciones para productos de alta calidad. Somos expertos en la patata al vacio." />
              </article>
              <article className="flex flex-grow">
                <CardHome href="/login" Icon={FaShop} title="¡Inicia sesión!" title1="Login" description="Accede a tu cuenta para disfrutar de una experiencia de compra personalizada y aprovechar nuestros servicios." />
              </article>
              <article className="flex flex-grow">
                <CardHome href="/register" Icon={FaUser} title="¡Regístrate!" title1="Registro" description="Únete a nuestra comunidad y disfruta de servicios exclusivos y muchas más ventajas como miembro registrado." />
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
