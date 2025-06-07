"use client";

import { motion } from "framer-motion";
import wave from "@/app/assets/svg/wave-bg-red.svg";
import Image from "next/image";
import { getUrls } from "@/lib/utils";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RRSSButton from "@/app/components/RRSSButton";
export function PaymentFailureScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  const handleRetry = () => {
    router.back();
  };

  const errorAnimation = {
    scale: [1, 1.1, 1],
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-screen flex flex-col items-center justify-between bg-gradient-to-br from-red-50 to-orange-50 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-16 h-16 mt-4 flex-shrink-0"
      >
        <motion.div
          animate={errorAnimation}
          className="w-full h-full bg-red-100 rounded-full flex items-center justify-center"
        >
          <XCircle className="w-10 h-10 text-red-800" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col gap-3 max-w-lg px-6 sm:px-2 flex-1 justify-center"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-red-800 pb-1">
          Pago Rechazado
        </h1>

        <p className="text-gray-700 text-sm sm:text-lg leading-tight">
          No pudimos procesar tu pago. Esto puede deberse a diferentes motivos,
          pero no te preocupes, <strong>podés intentarlo nuevamente</strong>.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-red-50 border border-red-200 rounded-lg p-2 text-left"
        >
          <p className="text-xs text-red-800 font-medium mb-1">
            Posibles causas:
          </p>
          <ul className="text-xs text-red-700 space-y-0">
            <li>• Fondos insuficientes</li>
            <li>• Datos incorretos de tarjeta</li>
            <li>• Límites de compra excedidos</li>
            <li>• Problema temporal del sistema</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-2 pt-1"
        >
          <Button
            onClick={handleRetry}
            className="w-full bg-red-700 hover:bg-red-800 text-white py-2 text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-2" />
            Intentar Nuevamente
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full border-red-200 text-red-800 hover:bg-red-50 py-2 text-xs"
          >
            <ArrowLeft className="w-3 h-3 mr-2" />
            Volver al Inicio
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="pt-1 border-t border-red-200"
        >
          <p className="text-xs text-gray-600">
            Si el problema persiste, contáctanos a{" "}
            <a
              href="mailto:soporte@hablemosdecancer.com"
              className="text-red-800 hover:underline font-medium"
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
        <RRSSButton url={getUrls("instagram")!} />
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
            className="w-full h-full object-cover object-top"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-red-100/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
