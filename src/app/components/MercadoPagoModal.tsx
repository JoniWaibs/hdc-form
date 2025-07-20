import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Currency } from "@/lib/enums/currency";

interface MercadoPagoModalProps {
  amount: number;
  title: string;
  alwaysVisible?: boolean;
}

export default function MercadoPagoModal({
  amount,
  title,
  alwaysVisible = false,
}: MercadoPagoModalProps) {
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
              <span className="font-bold">
                {formatPrice(amount, Currency.ARS)}
              </span>
            </p>

            <h2
              className="text-base text-xs sm:text-lg font-bold leading-tight mb-2"
              style={{ color: "#2D3277" }}
            >
              PAGO SEGURO CON MERCADO PAGO
            </h2>
          </div>

          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/mercado-pago.png"
                alt="Mercado Pago"
                width={100}
                height={100}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

          <button
            onClick={handleClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors z-20 shadow-lg"
          >
            <X className="w-6 h-6" style={{ color: "#2D3277" }} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-[90%] max-w-2xl mx-auto rounded-lg p-6 border border-yellow-300 z-10"
            style={{ backgroundColor: "#FFE600" }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1 md:w-2/3">
                <p
                  className="text-lg mb-6 leading-tight"
                  style={{ color: "#2D3277" }}
                >
                  Inscribite al taller{" "}
                  <span className="font-bold">{title}</span> y no te pierdas
                  esta oportunidad!
                </p>

                <p
                  className="text-md md:text-base font-medium opacity-80 mb-6"
                  style={{ color: "#2D3277" }}
                >
                  Costo de la inscripción:{" "}
                  <span className="font-bold leading-tight">
                    {formatPrice(amount, Currency.ARS)}
                  </span>
                </p>
              </div>

              <div className="flex-shrink-0 md:w-1/3 flex items-center justify-center">
                <Image
                  src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//mercado-pago.png"
                  alt="Mercado Pago"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-b-lg"
              style={{ backgroundColor: "#2D3277" }}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
