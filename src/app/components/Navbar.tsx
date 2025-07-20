import { Button } from "react-day-picker";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { handleWhatsAppClick } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-[#a8b5a0]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets//HDC-2-mda-logo-05.png"
              alt="Hablemos de Cáncer Logo"
              width={32}
              height={32}
              className="rounded-full sm:w-10 sm:h-10"
            />
            <span className="text-[#a8b5a0] font-semibold text-base sm:text-lg">
              Hablemos de Cáncer
            </span>
          </div>
          <Button
            onClick={handleWhatsAppClick}
            className="bg-[#a8b5a0] hover:bg-[#6b7c63] text-white px-3 py-2 text-sm flex items-center gap-2 sm:hidden rounded-none"
          >
            <FaWhatsapp className="w-4 h-4" />
            <span>Contactar</span>
          </Button>
          <div className="hidden sm:flex space-x-6 lg:space-x-8">
            <Link
              href="/#header"
              className="text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base"
            >
              Inicio
            </Link>
            <Link
              href="/#about"
              className="text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base"
            >
              Sobre mí
            </Link>
            <Link
              href="/services"
              className="text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base"
            >
              Servicios
            </Link>
            <Link
              href="/#contact"
              className="text-[#6b7c63] hover:text-[#a8b5a0] transition-colors text-sm lg:text-base"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
