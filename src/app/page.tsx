"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 text-center max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
          Página en construcción
          <span className="inline-block w-8 sm:w-12 text-gray-500">{dots}</span>
        </h1>

        <div className="mt-4 flex items-center justify-center space-x-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-600 delay-75"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-gray-800 delay-150"></div>
        </div>

        <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-600">
          Estamos trabajando en algo increíble. Por favor, volvé en unos días.
        </p>

        <div className="mt-6 sm:mt-8 h-1 w-16 sm:w-24 animate-pulse rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
