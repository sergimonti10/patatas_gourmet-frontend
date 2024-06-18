'use client'

import { Accordion, AccordionItem, Card, CardHeader, Image } from "@nextui-org/react";
import { useInView } from 'react-intersection-observer';
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import useUserStore from "../../../store/authStore";


export default function DashboardPage() {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true });
    const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true });
    const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true });
    const { ref: ref6, inView: inView6 } = useInView({ triggerOnce: true });
    const { ref: ref7, inView: inView7 } = useInView({ triggerOnce: true });

    return (
        <>
            <section className="flex justify-center items-center w-full">
                <div className="max-w-[1500px] w-full">
                    <Card className="relative">
                        <div className="absolute w-full h-1/5 bg-gradient-to-b from-black to-transparent z-10"></div>
                        <div className="absolute h-full w-1/3 bg-gradient-to-r from-black to-transparent z-10"></div>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start max-w-[33%]">
                            <p className="md:text-2xl lg:text-3xl xl:text-4xl text-white/60 font-bold">Patatas Gourmet<span className="hidden sm:block">vuestra tienda de patatas online</span></p>
                            <h4 className="text-white hidden md:text-2xl sm:block font-medium text-large">Las mejores patatas cortadas y envasadas al vacío</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Patatas Gourmet"
                            className="z-0 w-full h-full object-cover"
                            src="images/dashboard.jpg"
                            loading="lazy"
                        />
                    </Card>
                </div>
            </section>

            <section className="flex justify-center items-center w-full my-10">
                <div className="max-w-[1500px] w-full">
                    <Accordion variant="splitted">
                        <AccordionItem key="1" aria-label="Instalaciones" title="Instalaciones" className="hover:scale-105 transition-all">
                            <div ref={ref1} className={`flex flex-col sm:flex-row items-center transition-opacity duration-1000 ${inView1 ? 'opacity-100' : 'opacity-0'}`}>
                                <Image
                                    removeWrapper
                                    alt="Instalaciones"
                                    src="images/instalaciones.jpg"
                                    className="max-w-[150px] sm:max-w-[300px] h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="w-full sm:w-1/2 p-4">
                                    <p className="text-xl font-bold lg:text-3xl">Instalaciones</p>
                                    <p className="text-tiny  lg:text-base sm:hidden">Instalaciones modernas para asegurar la calidad y frescura de nuestras patatas. Equipadas con tecnología de punta para un procesamiento higiénico y seguro.</p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">Contamos con instalaciones de última generación para asegurar la mejor calidad en nuestros productos. Nuestro centro de producción está equipado con tecnología de punta que permite una manipulación higiénica y segura de las patatas. Desde el almacenamiento hasta el empaquetado, cada paso del proceso está diseñado para mantener la frescura y calidad de nuestros productos. Con áreas especializadas para cada tipo de corte – tradicional, gajo, brava y rodaja – garantizamos un procesamiento óptimo y eficiente. Además, nuestras instalaciones están certificadas por las más altas normas de calidad y seguridad alimentaria.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="2" aria-label="Maquinaria" title="Maquinaria" className="hover:scale-105 transition-all">
                            <div ref={ref2} className={`flex flex-col sm:flex-row items-center transition-opacity duration-1000 ${inView2 ? 'opacity-100' : 'opacity-0'}`}>
                                <Image
                                    removeWrapper
                                    alt="Maquinaria"
                                    src="images/maquinaria.jpg"
                                    className="max-w-[150px] sm:max-w-[300px] h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="w-1/2 p-4">
                                    <p className="text-2xl font-bold lg:text-3xl">Maquinaria</p>
                                    <p className="text-tiny  lg:text-base sm:hidden">Nuestra maquinaria de última tecnología asegura un corte preciso y mantiene la frescura de las patatas, reduciendo el contacto manual y el riesgo de contaminación.</p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">Nuestra maquinaria está diseñada para procesar las patatas de manera eficiente y mantener su frescura. Utilizamos equipos de última tecnología que permiten un corte preciso y uniforme en todas nuestras variedades: tradicional, gajo, brava y rodaja. La maquinaria automatizada reduce el contacto manual, minimizando el riesgo de contaminación y asegurando que cada patata sea procesada en las mejores condiciones posibles. Nuestro compromiso con la innovación nos lleva a actualizar constantemente nuestro equipo para mejorar la eficiencia y la calidad del producto final. Esto nos permite ofrecer patatas perfectamente cortadas y listas para cocinar.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="3" aria-label="Limpieza" title="Limpieza" className="hover:scale-105 transition-all">
                            <div ref={ref3} className={`flex flex-col sm:flex-row items-center transition-opacity duration-1000 ${inView3 ? 'opacity-100' : 'opacity-0'}`}>
                                <Image
                                    removeWrapper
                                    alt="Limpieza"
                                    src="images/limpieza.jpg"
                                    className="max-w-[150px] sm:max-w-[300px] h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="w-1/2 p-4">
                                    <p className="text-2xl font-bold lg:text-3xl">Limpieza</p>
                                    <p className="text-tiny  lg:text-base sm:hidden">Mantenemos altos estándares de limpieza con desinfección regular y estrictos protocolos de higiene para asegurar un ambiente libre de contaminantes.</p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">Mantenemos los más altos estándares de limpieza en todas nuestras áreas de producción. Cada sección de nuestras instalaciones es limpiada y desinfectada regularmente para asegurar un ambiente libre de contaminantes. Nuestro personal está capacitado en prácticas de higiene y sigue estrictos protocolos para evitar cualquier tipo de contaminación cruzada. Utilizamos productos de limpieza de grado alimenticio y equipos de desinfección avanzados para mantener nuestros espacios en las mejores condiciones posibles. La limpieza es una prioridad en nuestra operación diaria, asegurando que nuestras patatas lleguen a su mesa en condiciones óptimas.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="4" aria-label="Personal Cualificado" title="Personal Cualificado" className="hover:scale-105 transition-all">
                            <div ref={ref4} className={`flex flex-col sm:flex-row items-center transition-opacity duration-1000 ${inView4 ? 'opacity-100' : 'opacity-0'}`}>
                                <Image
                                    removeWrapper
                                    alt="Personal Profesional"
                                    src="images/personal.jpg"
                                    className="max-w-[150px] sm:max-w-[300px] h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="w-1/2 p-4">
                                    <p className="text-2xl font-bold lg:text-3xl">Personal Cualificado</p>
                                    <p className="text-tiny  lg:text-base sm:hidden">Nuestro equipo capacitado y comprometido asegura la calidad en cada etapa del proceso, trabajando diligentemente para cumplir con nuestros altos estándares.</p>
                                    <p className="hidden sm:block text-tiny lg:text-base">Contamos con un equipo de profesionales altamente capacitados y comprometidos con la calidad. Nuestro personal recibe formación continua en técnicas de manipulación de alimentos, seguridad y control de calidad. Cada miembro de nuestro equipo entiende la importancia de su papel en el proceso de producción y trabaja diligentemente para asegurar que cada lote de patatas cumpla con nuestros altos estándares. Desde nuestros técnicos de maquinaria hasta nuestro personal de limpieza, todos están dedicados a mantener la excelencia en cada etapa del proceso. Su experiencia y dedicación son fundamentales para el éxito de nuestra empresa.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="5" aria-label="Años de Experiencia" title="Años de Experiencia" className="hover:scale-105 transition-all">
                            <div ref={ref5} className={`flex flex-col sm:flex-row items-center transition-opacity duration-1000 ${inView5 ? 'opacity-100' : 'opacity-0'}`}>
                                <Image
                                    removeWrapper
                                    alt="Años de Experiencia"
                                    src="images/tiempo.jpg"
                                    className="max-w-[150px] sm:max-w-[300px] h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="w-1/2 p-4">
                                    <p className="text-2xl font-bold lg:text-3xl">Años de Experiencia</p>
                                    <p className="text-tiny  lg:text-base sm:hidden">Con más de 20 años en la industria, garantizamos productos de alta calidad, innovando y adaptándonos a las demandas del mercado.</p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">Tenemos más de 20 años de experiencia en la industria de las patatas, garantizando productos de la mejor calidad. A lo largo de las décadas, hemos perfeccionado nuestros métodos de producción y establecido relaciones sólidas con proveedores y clientes. Esta experiencia nos ha permitido innovar y adaptarnos a las cambiantes demandas del mercado, siempre manteniendo un firme compromiso con la calidad. Nuestra trayectoria es un testimonio de nuestra dedicación y capacidad para entregar productos que superan las expectativas. Con cada patata que procesamos, traemos a la mesa años de conocimiento y pasión por lo que hacemos.</p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="6" aria-label="Sobre Nosotros" title="Sobre Nosotros" className="hover:scale-105 transition-all">
                            <div ref={ref6} className={`transition-opacity duration-1000 ${inView6 ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="p-4">
                                    <p className="text-2xl font-bold lg:text-3xl mb-4">Sobre Nosotros</p>
                                    <p className="text-tiny lg:text-base sm:hidden">Patatas Gourmet ofrece productos de alta calidad, enfocados en la innovación y la satisfacción del cliente. Líderes en el mercado con más de 20 años de experiencia.</p>
                                    <p className="hidden sm:block text-tiny lg:text-base">
                                        Patatas Gourmet es una empresa dedicada a ofrecer los mejores productos de patata en el mercado. Nuestro compromiso es con la calidad y la satisfacción de nuestros clientes. Nuestra filosofía de empresa se centra en la innovación constante, la mejora continua y la atención al detalle. Nuestra misión es proporcionar productos de alta calidad que enriquezcan la experiencia culinaria de nuestros clientes. Nuestra visión es ser líderes en el mercado de patatas gourmet, reconocidos por nuestra calidad y servicio excepcional. Nuestra oferta incluye patatas cortadas en cuatro variedades: tradicional, gajo, brava y rodaja, todas envasadas al vacío para garantizar su frescura.
                                    </p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">
                                        Nuestra historia comienza hace más de dos décadas, cuando nuestro fundador, Juan Pérez, decidió llevar su pasión por las patatas a un nuevo nivel. Con un equipo pequeño pero dedicado, empezamos a ganar reconocimiento por la calidad de nuestros productos. Hoy en día, seguimos siendo una empresa familiar con un enfoque en la calidad y la innovación.
                                    </p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">
                                        Nuestro equipo está compuesto por profesionales dedicados como María Gómez, nuestra jefa de producción, y Pedro Sánchez, nuestro experto en calidad. Cada miembro del equipo juega un papel crucial en nuestro éxito y comparte nuestro compromiso con la excelencia.
                                    </p>
                                    <p className="hidden sm:block text-tiny  lg:text-base">
                                        Razones para confiar en nosotros incluyen nuestra larga trayectoria, nuestro compromiso con la calidad, y nuestras instalaciones y maquinaria de última generación. Estamos dedicados a proporcionar productos que no solo cumplen, sino que superan las expectativas de nuestros clientes. La satisfacción del cliente es nuestra máxima prioridad, y trabajamos incansablemente para asegurar que cada pedido sea perfecto.
                                    </p>
                                </div>
                            </div>
                        </AccordionItem>

                        <AccordionItem key="7" aria-label="Contacto" title="Contacto" className="hover:scale-105 transition-all">
                            <div ref={ref7} className={`transition-opacity duration-1000 ${inView7 ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="p-4">
                                    <p className="text-2xl font-bold lg:text-3xl">Contacto</p>
                                    <p className="text-tiny  lg:text-base"><span className="text-lg">Teléfono</span>: 123456789</p>
                                    <p className="text-tiny  lg:text-base"><span className="text-lg">Email</span>: info@patatasgourmet.com</p>
                                    <p className="text-tiny  lg:text-base"><span className="text-lg">Dirección</span>: Calle del Comercio, 12, Benamejí, Córdoba, 14900</p>
                                    <p className="text-tiny  lg:text-base">Síguenos en nuestras <span className="text-lg">redes sociales</span>:
                                        <a href="https://facebook.com/patatasgourmet"><FaFacebook /></a>
                                        <a href="https://twitter.com/patatasgourmet"><FaXTwitter /></a>
                                        <a href="https://instagram.com/patatasgourmet"><FaInstagram /></a>
                                    </p>
                                </div>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </>
    );
}
