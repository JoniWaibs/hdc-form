"use client";

import { motion } from "framer-motion";
import successCheck from "@/app/assets/lottie/success-check.json";
import wave from "@/app/assets/svg/wave-bg-green.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getUrls } from "@/lib/utils";
import dynamic from "next/dynamic";
import RRSSButton from "@/app/components/RRSSButton";
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
        className="flex flex-col gap-3 max-w-lg px-6 sm:px-2 flex-1 justify-center"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 pb-2">
          ¡Inscripción confirmada!
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg leading-tight">
          Ya estás inscripto en el curso <strong>{resourceName}</strong>.<br />
          En breve vas a recibir un correo electrónico con más información y
          detalles de pago.
        </p>
        <p className="text-gray-500 text-base font-medium pt-1">
          No olvides revisar tu carpeta de spam o correo no deseado.
        </p>
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
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
