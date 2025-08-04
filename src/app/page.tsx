"use client";

import { Heart, Users, HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { handleWhatsAppClick } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { NewsletterSubscriptionSchema } from "@/app/schema/newsletter";
import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function HomePage() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleSubmitNewsletter = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setEmailError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;

      const validatedData = NewsletterSubscriptionSchema.parse({ email });
      const response = await fetch("/api/suscription/newsletter/susbcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validatedData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage(
          "¡Gracias por suscribirte! Revisa tu correo para confirmar.",
        );
      } else {
        setModalMessage(
          data.error || "Hubo un error al suscribirte. Inténtalo de nuevo.",
        );
      }
      setShowModal(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      setModalMessage("Hubo un error al suscribirte. Inténtalo de nuevo.");
    } finally {
      (e.target as HTMLFormElement).reset();
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#6b7c63] font-sans">
      <Navbar />

      <div
        id="header"
        className="relative h-screen w-full overflow-hidden bg-[#f5f1eb] flex items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#a8b5a0]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c4a484]/20 rounded-full blur-[100px]" />
        <h1 className="z-10 text-4xl sm:text-6xl md:text-7xl font-light leading-tight text-center px-6">
          Acompañamiento emocional
          <br />
          <span className="text-[#c4a484] font-semibold">
            {" "}
            especializado en oncología
          </span>
        </h1>
      </div>

      <section
        id="inspirational"
        className="relative h-screen w-full overflow-hidden flex items-center justify-center py-12 sm:py-16 lg:py-20 bg-white "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-[#6b7c63]">
                Un espacio seguro para sanar
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center space-y-4 p-4 lg:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#a8b5a0]/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#a8b5a0]" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#6b7c63]">
                  Terapia especializada
                </h3>
                <p className="text-sm sm:text-base text-[#8b7355]">
                  Para personas que hayan vivido o estén atravesando un proceso
                  oncológico
                </p>
              </div>

              <div className="text-center space-y-4 p-4 lg:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#c4a484]/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#c4a484]" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#6b7c63]">
                  Soporte familiar
                </h3>
                <p className="text-sm sm:text-base text-[#8b7355]">
                  Para cuidadores y entorno cercano a la persona diagnosticada
                </p>
              </div>

              <div className="text-center space-y-4 p-4 lg:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#a8b5a0]/10 rounded-full flex items-center justify-center mx-auto">
                  <HeartCrack className="w-6 h-6 sm:w-8 sm:h-8 text-[#a8b5a0]" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-[#6b7c63]">
                  Apoyo en duelo
                </h3>
                <p className="text-sm sm:text-base text-[#8b7355]">
                  Para quienes se encuentren afrontando duelos por fallecimiento
                  por cáncer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f1eb]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-light">
              Hola, soy <strong>Florencia</strong>
            </h2>
            <p className="text-base sm:text-lg text-[#8b7355] text-justify">
              Psicóloga con formación de posgrado y trayectoria profesional en
              el ámbito de la Oncología. Durante años especialicé mi formación
              hacia la Psicooncología, Cuidados Paliativos y el Duelo.
            </p>
            <p className="text-base sm:text-lg text-[#8b7355] text-justify">
              Me dedico al acompañamiento de personas atravesadas por la
              vivencia de una enfermedad oncológica.
            </p>
            <p className="text-base sm:text-lg text-[#8b7355] text-justify">
              Creo profundamente en el valor de la palabra, su capacidad de ser
              refugio y espacio de transformación cuando la vida nos desafía.
            </p>
          </div>
          <div className="w-full h-full">
            <Image
              src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//header-photo.jpeg"
              alt="Foto profesional"
              width={600}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      <section
        id="tedx-talk"
        className="py-20 bg-white px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-light">
            Te invito a escuchar mi TEDx
          </h2>
          <p className="text-[#8b7355] text-base sm:text-lg">
            Una mirada sencilla y profunda acerca de algo tan vital como
            inevitable: el dolor. Desmitificando creencias, ésta charla propone
            herramientas prácticas para acompañar a otros y una visión
            transformadora para transitar las propias pérdidas.
          </p>

          <div className="aspect-video overflow-hidden shadow bg-[#f5f1eb]">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/m1w9gnFD9X0?si=qL38CmxO-2ED8LwB"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 sm:py-20 bg-[#f5f1eb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-[#6b7c63]">
                Estoy aquí para acompañarte
              </h2>
              <p className="text-base sm:text-lg text-[#8b7355] max-w-2xl mx-auto">
                Tu historia merece un espacio donde ser escuchada y abrazada.
                <br />
                En <strong>Hablemos de Cáncer</strong> la palabra es refugio.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <Button
                onClick={handleWhatsAppClick}
                className="bg-[#a8b5a0] hover:bg-[#6b7c63] text-white px-8 py-4 text-lg shadow-none rounded-none"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" /> Agenda una sesión
              </Button>
              <p className="text-sm sm:text-base text-[#a8b5a0] mt-8">
                Para Latinoamérica y países de habla hispana
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="newsletter"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center"
      >
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-light">
            ¿Querés recibir novedades?
          </h3>
          <p className="text-[#8b7355] text-base sm:text-lg">
            Suscribite a mi newsletter para recibir herramientas y reflexiones
            para acompañarte en tu proceso.
          </p>
          <form
            onSubmit={handleSubmitNewsletter}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <div className="flex flex-col w-full sm:w-72">
              <input
                name="email"
                type="email"
                placeholder="Tu correo electrónico"
                className={`px-4 py-3 border ${
                  emailError ? "border-red-500" : "border-[#a8b5a0]"
                } focus:outline-none w-full rounded-none h-[50px]`}
                disabled={isLoading}
              />
              {emailError && (
                <span className="text-red-500 text-xs mt-1 text-left">
                  {emailError}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="bg-[#c4a484] hover:bg-[#a88b64] text-white px-6 h-[50px] rounded-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Suscribiendo...
                </>
              ) : (
                "Suscribirme"
              )}
            </Button>
          </form>
        </div>
      </section>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-semibold  ${
                modalMessage.includes("¡Gracias")
                  ? "text-[#6b7c63]"
                  : "text-[#c4a484]"
              }`}
            >
              {modalMessage.includes("¡Gracias")
                ? "¡Suscripción Exitosa!"
                : "¡Algo salió mal!"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-[#c4a484] hover:bg-[#a88b64] text-white px-6 h-[50px] rounded-none"
              >
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
