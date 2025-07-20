import { SocialMedia } from "@/lib/enums/socialMedia";
import { getMediaLink } from "@/lib/utils";
import { FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#6b7c63] text-[#f5f1eb] py-12 px-6 text-center space-y-6">
      <p className="text-sm">
        © 2025 Hablemos de Cáncer. Todos los derechos reservados.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
        <a
          data-testid="youtube-link"
          href="https://www.youtube.com/embed/m1w9gnFD9X0?si=qL38CmxO-2ED8LwB"
          target="_blank"
          className="hover:underline text-white text-2xl"
        >
          <FaYoutube className="w-5 h-5" />
        </a>
        <a
          data-testid="instagram-link"
          href={getMediaLink(SocialMedia.IG)}
          target="_blank"
          className="hover:underline text-white text-2xl"
        >
          <FaInstagram className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
