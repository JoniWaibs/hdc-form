"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaWhatsapp } from "react-icons/fa";
import { handleWhatsAppClick } from "@/lib/utils";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Psicooncología individual",
      description:
        "Un espacio personalizado, cálido y confidencial para explorar tus emociones y necesidades durante el proceso oncológico, brindándote herramientas para tu bienestar. Sesiones de terapia virtual desde la comodidad de tu hogar.",
      alt: "Psicóloga en sesión de terapia individual con paciente",
      buttonText: "Agendar Sesión",
    },
    {
      title: "Talleres grupales psicoeducativos",
      description:
        "Encuentros temáticos estructurados que combinan información útil y  herramientas emocionales. El grupo ofrece un espacio de contención, intercambio y aprendizaje compartido, resultando enriquecedor y fortalecedor de la red de apoyo.",
      alt: "Grupo de personas en un taller de apoyo",
      buttonText: "Solicitar información",
    },
    {
      title: "Psicoterapia en duelo",
      description:
        "Acompañamiento especializado frente al fallecimiento de un ser querido por cáncer. Ofrece un espacio donde transitar al duelo como un proceso único y profundamente humano, validando sus emociones y ayudándote a gestionarlas.",
      alt: "Persona en un momento de reflexión y duelo",
      buttonText: "Agendar Sesión",
    },
    {
      title: "Asesoramiento institucional en duelo",
      description:
        "Capacitación de grupos/líderes de grupo en herramientas para contener, comunicar y acompañar a sus integrantes en el afrontamiento de una pérdida, actual o potencial. Abarca situaciones de crisis, comunicación de malas noticias, primeros auxilios psicológicos y protocolos de duelo.",
      alt: "Profesionales en una reunión de asesoramiento institucional",
      buttonText: "Solicitar información",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#6b7c63] font-sans">
      <Navbar />
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-beige text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-brand-sage-dark leading-tight">
            <span className="text-brand-sage-dark">¿Cómo puedo ayudarte?</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-text leading-relaxed">
            Cada proceso es único, y también lo es la manera de transitarlo. A
            través de distintos espacios terapéuticos, brindo acompañamiento
            emocional para los momentos en que lo necesites.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden shadow-lg rounded-none bg-card"
              >
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-medium text-brand-sage-dark">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-muted-foreground mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 flex-grow flex items-end">
                  <Button
                    onClick={handleWhatsAppClick}
                    className="cursor-pointer bg-[#a8b5a0] hover:bg-[#6b7c63] text-white px-6 py-3 text-base rounded-none shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 w-full"
                  >
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    {service.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
