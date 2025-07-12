"use client";

import { motion } from "framer-motion";
import successCheck from "@/app/assets/lottie/success-check.json";
import wave from "@/app/assets/svg/wave-bg-green.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMediaLink } from "@/lib/utils";
import dynamic from "next/dynamic";
import SocialMediaButton from "@/app/components/SocialMediaButton";
import { SocialMedia } from "@/lib/enums/socialMedia";
const Player = dynamic(() => import("lottie-react"), { ssr: false });

export function PaymentSuccessScreen({
  resourceName,
}: {
  resourceName: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LottiePlayer, setLottiePlayer] = useState<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    import("canvas-confetti").then((module) => {
      const confetti = module.default;
      const myConfetti = confetti.create(canvasRef.current!, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    });

    import("lottie-react").then((mod) => {
      setLottiePlayer(() => mod.default);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-screen flex flex-col items-center justify-between bg-[#f8fafc] text-center"
    >
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />

      {LottiePlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 sm:w-48 sm:h-48 mt-4 flex-shrink-0"
        >
          <Player autoplay loop animationData={successCheck} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col gap-4 max-w-lg px-6 sm:px-2 flex-1 justify-center"
      >
        <div className="pb-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 pb-3">
            ¡Inscripción confirmada!
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg leading-tight">
            <strong>Recibimos tu pago</strong> y confirmamos que tu inscripción
            al taller <strong>{resourceName}</strong> está completa.
          </p>
        </div>

        <p className="text-gray-500 text-sm font-medium">
          Te enviamos un correo con todos los detalles de la inscripción. No
          olvides revisar tu carpeta de spam o correo no deseado.
        </p>

        <p className="text-gray-500 text-sm font-medium">
          Si no recibiste el correo, por favor contactanos a{" "}
          <a
            href="mailto:contacto@hablemosdecancer.com.ar"
            className="text-blue-500"
          >
            contacto@hablemosdecancer.com.ar
          </a>
        </p>

        <p className="text-gray-500 text-base font-medium">
          ¡Nos vemos pronto!
        </p>
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
            className="w-full h-full object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
