import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MercadoPagoBannerProps {
  amount: number;
  title: string;
  alwaysVisible?: boolean;
}

export default function MercadoPagoBanner({
  amount,
  title,
  alwaysVisible = false,
}: MercadoPagoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (alwaysVisible) {
    return (
      <div
        className="shadow-sm overflow-hidden rounded-lg p-3 border border-yellow-300"
        style={{ backgroundColor: "#FFE600" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <p
              className="text-xs sm:text-sm font-medium opacity-80 mb-1"
              style={{ color: "#2D3277" }}
            >
              Costo de la inscripción:{" "}
              <span className="font-bold">{formatAmount(amount)}</span>
            </p>

            <h2
              className="text-base sm:text-lg font-bold leading-tight mb-2"
              style={{ color: "#2D3277" }}
            >
              PAGO SEGURO CON MERCADO PAGO
            </h2>

            <p className="text-xs opacity-75" style={{ color: "#2D3277" }}>
              ¡Inscríbete al curso <span className="font-bold">{title}</span> y
              no te pierdas esta oportunidad!
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//mercado-pago.png"
                alt="Mercado Pago"
                width={120}
                height={120}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-80 md:right-80 z-50"
        >
          <div
            className="relative shadow-xl overflow-hidden rounded-lg p-3 border border-yellow-300"
            style={{ backgroundColor: "#FFE600" }}
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors z-10"
            >
              <X className="w-4 h-4" style={{ color: "#2D3277" }} />
            </button>

            <div className="flex items-center justify-between pr-8">
              <div className="flex-1 pr-4">
                <p
                  className="text-xs sm:text-sm font-medium opacity-80 mb-1"
                  style={{ color: "#2D3277" }}
                >
                  Costo de la inscripción:{" "}
                  <span className="font-bold">{formatAmount(amount)}</span>
                </p>

                <h2
                  className="text-base sm:text-lg font-bold leading-tight mb-2"
                  style={{ color: "#2D3277" }}
                >
                  PAGO SEGURO CON MERCADO PAGO
                </h2>

                <p className="text-xs opacity-75" style={{ color: "#2D3277" }}>
                  ¡Inscríbete al curso{" "}
                  <span className="font-bold">{title}</span> y no te pierdas
                  esta oportunidad!
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//mercado-pago.png"
                    alt="Mercado Pago"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-1"
              style={{ backgroundColor: "#2D3277" }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
