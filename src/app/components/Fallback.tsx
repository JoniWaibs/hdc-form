"use client";

import Link from "next/link";
import { Frown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import wave from "@/app/assets/svg/wave-bg-gray.svg";

interface FallbackProps {
  source?: string;
}

export default function Fallback({ source }: FallbackProps) {
  console.log(
    `Resource not found or error occurred. Source: ${source || "Not provided"}`,
  );

  const errorAnimation = {
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
      className="h-screen flex flex-col items-center justify-between bg-gradient-to-br from-gray-50 to-slate-50 text-center"
    >
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <motion.div
            animate={errorAnimation}
            className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center"
          >
            <Frown className="h-16 w-16 sm:h-48 sm:w-48 text-gray-600" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md text-center"
        >
          <h1 className="mb-4 text-2xl sm:text-3xl font-semibold text-gray-900">
            Te pedimos disculpas
          </h1>
          <p className="mb-8 text-sm sm:text-base text-gray-600">
            Alguno de los recursos no fue encontrado.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Ir al inicio
          </Link>
        </motion.div>
      </div>

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
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100/30 to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
