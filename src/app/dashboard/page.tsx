'use client'

import { Card, Image, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

    const handleScroll = () => {
        const sections = document.querySelectorAll(".scroll-section");
        const visibleSectionsSet = new Set<number>();

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                visibleSectionsSet.add(index);
            }
        });

        setVisibleSections(visibleSectionsSet);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const sections = [
        {
            title: "Bienvenido a Nuestra Tienda de Patatas",
            text: "Ofrecemos patatas cortadas y envasadas al vacío de la mejor calidad. Disfruta de nuestras variedades: tradicional, gajo, brava y rodaja.",
            image: "/images/storefront.jpg"
        },
        {
            title: "Nuestros Productos",
            text: "Cada corte de patata tiene su propio encanto y es perfecto para diferentes ocasiones. Ya sea una cena familiar o una fiesta con amigos, nuestras patatas son la elección ideal.",
            image: "/images/products.jpg"
        },
        {
            title: "Calidad y Sanidad",
            text: "Nos tomamos muy en serio la calidad y la sanidad de nuestros productos. Todas nuestras patatas son cuidadosamente seleccionadas y procesadas para garantizar que recibas solo lo mejor.",
            image: "/images/quality.jpg"
        },
        {
            title: "Transporte Seguro",
            text: "Nos aseguramos de que tus pedidos lleguen a tiempo y en perfectas condiciones. Utilizamos métodos de transporte seguro y empaques que preservan la frescura.",
            image: "/images/transport.jpg"
        },
        {
            title: "Nuestro Equipo",
            text: "Nuestro equipo está formado por profesionales dedicados que trabajan incansablemente para ofrecerte el mejor servicio y producto posible.",
            image: "/images/team.jpg"
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="text-center my-8">
                <h1 className="text-4xl text-gray-800">Tienda de Patatas Online</h1>
                <p className="text-gray-600">Cortadas y Envasadas al Vacío</p>
            </div>

            <div className="carousel-container my-8">
                <div className="carousel">
                    {sections.map((section, index) => (
                        <div key={index} className="carousel-item">
                            <Image src={section.image} alt={section.title} />
                        </div>
                    ))}
                </div>
            </div>

            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`scroll-section transition-opacity duration-500 ${visibleSections.has(index) ? "opacity-100" : "opacity-0"
                        } my-8`}
                >
                    <Card className="flex flex-col md:flex-row items-center">
                        <Image src={section.image} alt={section.title} className="w-full md:w-1/2" />
                        <div className="p-4 md:w-1/2">
                            <h2 className="text-2xl text-gray-800">{section.title}</h2>
                            <p className="text-gray-600">{section.text}</p>
                        </div>
                    </Card>
                </div>
            ))}

            <div className="text-center my-8">
                <h2 className="text-3xl text-gray-800">Únete a Nuestro Equipo</h2>
                <p className="text-gray-600">Estamos en constante búsqueda de talento. Si te apasionan las patatas y quieres formar parte de nuestro equipo, contáctanos.</p>
                <Button color="primary" className="mt-4">Contáctanos</Button>
            </div>

            <div className="text-center my-8">
                <h2 className="text-3xl text-gray-800">Comentarios de Nuestros Clientes</h2>
                <div className="carousel-container my-8">
                    <div className="carousel">
                        <div className="carousel-item">
                            <Card className="p-4">
                                <p className="text-gray-600">"Las mejores patatas que he probado. ¡Siempre frescas y deliciosas!" - Juan Pérez</p>
                            </Card>
                        </div>
                        <div className="carousel-item">
                            <Card className="p-4">
                                <p className="text-gray-600">"El servicio es excelente y la calidad es inigualable." - María López</p>
                            </Card>
                        </div>
                        <div className="carousel-item">
                            <Card className="p-4">
                                <p className="text-gray-600">"Me encanta la variedad de cortes que ofrecen. Perfecto para cualquier ocasión." - Carlos Sánchez</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
