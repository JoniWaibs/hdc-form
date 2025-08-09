"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialMedia } from "@/lib/enums/socialMedia";
import { getMediaLink } from "@/lib/utils";
import wave from "@/app/assets/svg/wave-bg-yellow.svg";
import SocialMediaButton from "@/app/components/SocialMediaButton";

export function PaymentPendingScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  const handleRefresh = () => {
    router.refresh();
  };

  const pendingAnimation = {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-screen flex flex-col items-center justify-between bg-gradient-to-br from-yellow-50 to-orange-50 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-16 h-16 mt-4 flex-shrink-0"
      >
        <motion.div
          animate={pendingAnimation}
          className="w-full h-full bg-yellow-100 rounded-full flex items-center justify-center"
        >
          <Clock className="w-10 h-10 text-yellow-600" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col gap-3 max-w-lg px-6 flex-1 justify-center"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-yellow-600 pb-1">
          Pago Pendiente
        </h1>

        <p className="text-gray-700 text-xs sm:text-sm leading-tight">
          Tu pago está siendo procesado. Dependiendo del medio de pago
          seleccionado,
          <strong> esto puede tomar unos minutos</strong>.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-left"
        >
          <p className="text-xs text-yellow-800 font-medium mb-1">
            ¿Qué significa esto?
          </p>
          <ul className="text-xs text-yellow-700 space-y-0">
            <li>• Tu pago está en proceso de verificación</li>
            <li>
              •{" "}
              <strong>
                Vas a recibir una confirmación por correo electrónico cuando se
                complete
              </strong>
            </li>
            <li>• No es necesario realizar el pago nuevamente</li>
            <li>• El procesamiento puede tomar entre 1-3 días hábiles</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-2 pt-1"
        >
          <Button
            onClick={handleRefresh}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-2" />
            Actualizar Estado
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full border-yellow-200 text-yellow-600 hover:bg-yellow-50 py-2 text-xs"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Volver al Inicio
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="pt-1 border-t border-yellow-200"
        >
          <p className="text-xs text-gray-600">
            Si tenés dudas sobre tu pago, contáctanos a{" "}
            <a
              href="mailto:soporte@hablemosdecancer.com"
              className="text-yellow-600 hover:underline font-medium"
            >
              soporte@hablemosdecancer.com
            </a>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-2 mb-2 flex-shrink-0"
      >
        <SocialMediaButton url={getMediaLink(SocialMedia.IG)!} />
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="w-full relative flex-shrink-0"
      >
        <div className="relative h-40 sm:h-48">
          <Image
            src={wave}
            alt="wave background"
            className="w-full h-full object-cover object-top opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
