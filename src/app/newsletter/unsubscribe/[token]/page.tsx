"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SocialMediaButton from "@/app/components/SocialMediaButton";
import { SocialMedia } from "@/lib/enums/socialMedia";
import { getMediaLink } from "@/lib/utils";

export default function UnsubscribePage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleUnsubscribe = async () => {
    if (!token) return setStatus("error");
    setStatus("loading");
    try {
      const res = await fetch(
        `/api/suscription/newsletter/unsubscribe?unsubscribe_token=${token}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-[#6b7c63] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16 sm:py-20">
        <Card className="max-w-md w-full shadow-md border-none rounded-none bg-white">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-brand-sage-dark">
              Darte de baja
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Si ya no querés recibir nuestros correos, podés darte de baja con
              un click.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center">
                <p className="text-green-700">
                  Tu suscripción ha sido cancelada correctamente. 💌
                </p>
                <SocialMediaButton url={getMediaLink(SocialMedia.IG)!} />
              </div>
            ) : status === "error" ? (
              <p className="text-red-600">
                Hubo un error al procesar tu solicitud. Probá nuevamente o
                escribinos a{" "}
                <a
                  href="mailto:contacto@hablemosdecancer.com.ar"
                  className="text-blue-500"
                >
                  contacto@hablemosdecancer.com.ar
                </a>
              </p>
            ) : (
              <Button
                onClick={handleUnsubscribe}
                disabled={status === "loading"}
                className="bg-[#a8b5a0] hover:bg-[#6b7c63] text-white w-full rounded-none text-base"
              >
                {status === "loading" ? "Procesando..." : "Darme de baja"}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
