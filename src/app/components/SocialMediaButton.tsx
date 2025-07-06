"use client";

import { FaInstagram } from "react-icons/fa";

export default function SocialMediaButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:scale-105 transition-transform shadow-md"
    >
      <FaInstagram size={20} />
      Seguinos en Instagram
    </a>
  );
}
