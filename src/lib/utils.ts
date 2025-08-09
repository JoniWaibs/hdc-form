import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { twMerge } from "tailwind-merge";
import { Currency } from "@/lib/enums/currency";
import { SocialMedia } from "@/lib/enums/socialMedia";
import { Resource } from "@/app/schema";

export interface PaymentLink {
  name: string;
  owner: string;
  cvu?: string;
  account?: string;
  alias?: string;
  link?: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getWhatsAppUrl = (text?: string) => {
  const whatsappNumber = "+5493425134461";
  const whatsappMessage =
    text || "Hola, me gustaría agendar una sesión con Florencia";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
};

export const handleInputType = (field: string) => {
  const availableTextAreas = ["how_did_you_hear", "why_you_are_interested"];
  if (availableTextAreas.includes(field)) {
    return true;
  }
  return false;
};

export const capitalizeFirstLetter = (string: string) => {
  const capitalizedWords = string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return capitalizedWords.join(" ");
};

export const getMediaLink = (socialMedia: SocialMedia) =>
  new Map<string, string>([
    [SocialMedia.IG, "https://www.instagram.com/hablemos.de.cancer/"],
  ]).get(socialMedia);

export const getTimeByCountry = (country: string) => {
  const timeMap = new Map<string, string>([
    ["argentina", "10:00"],
    ["chile", "09:00"],
    ["colombia", "07:00"],
    ["uruguay", "10:00"],
    ["españa", "15:00"],
  ]);
  return timeMap.get(country) || "consultar horario";
};

export const formatLongDate = (dateString: string): string => {
  const formatted = format(
    new Date(dateString + "T00:00:00-03:00"),
    "d 'de' MMMM 'de' yyyy",
    { locale: es },
  );

  return formatted
    .split(" ")
    .map((word: string, index: number): string => {
      const isThirdWord = index === 2;
      if (!isThirdWord) return word;

      const firstChar = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return `${firstChar}${restOfWord}`;
    })
    .join(" ");
};

export const formatPrice = (
  price: number,
  currency: Currency = Currency.ARS,
): string => {
  const currencyMap: Record<Currency, string> = {
    [Currency.ARS]: "es-AR",
    [Currency.USD]: "en-US",
  };

  return price.toLocaleString(currencyMap[currency] || "es-AR", {
    style: "currency",
    currency: currency.toString(),
    ...(currency === Currency.USD && { currencyDisplay: "code" }),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const getPaymentLinkByCountry = (site: string) => {
  const mercadopago: PaymentLink = {
    name: "Mercado Pago",
    owner: "Maria Florencia Martinez",
    cvu: "0000003100027698476876",
    alias: "maflorencia.m.mp",
  };

  const global66: PaymentLink = {
    name: "Global66",
    owner: "Jonatan Ariel Waibsnaider",
    account: "8331003380",
    alias: "@JONWAI1",
  };

  const prex: PaymentLink = {
    name: "Prex",
    owner: "Jonatan Ariel Waibsnaider",
    account: "1767995",
  };

  const paypal: PaymentLink = {
    name: "Paypal",
    owner: "Maria Florencia Martinez",
    link: "https://www.paypal.me/maflorenciamartinez",
  };

  const paymentLinks = new Map<string, PaymentLink[]>([
    ["argentina", [mercadopago]],
    ["chile", [global66]],
    ["colombia", [paypal]],
    ["uruguay", [prex]],
    ["españa", [paypal]],
  ]);
  return paymentLinks.get(site) || [paypal];
};

export function toLocalDateString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().split("T")[0];
}

export const getResourceStatus = (
  resource: Resource,
): {
  text: string;
  variant: "default" | "destructive" | "outline" | "secondary";
} => {
  const isFinished = new Date(resource.end_date) <= new Date();
  const isPending = new Date(resource.start_date) > new Date();

  const resourceStatusMap = {
    finished: {
      text: "Finalizado",
      variant: "outline" as const,
    },
    active: {
      text: "Activo",
      variant: "default" as const,
    },
    pending: {
      text: "Pendiente",
      variant: "default" as const,
    },
  };

  return resourceStatusMap[
    isFinished ? "finished" : isPending ? "pending" : "active"
  ];
};
